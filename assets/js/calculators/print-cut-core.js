(() => {
  const num = (raw, label, min = 0, max = 10000) => {
    const s = String(raw ?? '').trim(), n = Number(s);
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(s) || !Number.isFinite(n) || n < min || n > max) throw Error(label + ': enter a number from ' + min + ' to ' + max + '.');
    return n;
  };
  const dim = (raw, label) => num(raw, label, .01);
  const rows = (raw, min, max, label) => {
    if (String(raw).length > 10000) throw Error(label + ': input is too long.');
    const list = String(raw).trim().split(/\r?\n/).filter(s => s.trim());
    if (list.length < min || list.length > max) throw Error(label + ': enter ' + min + ' to ' + max + ' rows.');
    return list.map((line, i) => {
      const fields = line.split(',');
      if (fields.length !== 4) throw Error(label + ', row ' + (i + 1) + ': use four comma-separated numbers.');
      return fields;
    });
  };
  const rect = (values, label) => {
    const [x,y,w,h] = [num(values[0],label+' x'),num(values[1],label+' y'),dim(values[2],label+' width'),dim(values[3],label+' height')];
    return { x,y,w,h,r:x+w,b:y+h };
  };
  // Tolerance for floating-point arithmetic only, not a production allowance.
  const eps=1e-8;
  const overlap = (a,b) => a.x < b.r-eps && a.r > b.x+eps && a.y < b.b-eps && a.b > b.y+eps;
  const gap = (a,b) => Math.hypot(Math.max(0,a.x-b.r,b.x-a.r),Math.max(0,a.y-b.b,b.y-a.b));
  const inflate = (a,x,y) => ({x:a.x-x,y:a.y-y,r:a.r+x,b:a.b+y,w:a.w+2*x,h:a.h+2*y});
  const inside = (a,w,h) => a.x >= -eps && a.y >= -eps && a.r <= w+eps && a.b <= h+eps;
  const avg = values => values.reduce((sum,v)=>sum+v,0)/values.length;

  const register = (raw,limit) => {
    const tolerance = num(limit,'Error limit',.001);
    const pts = rows(raw,4,30,'Measurements').map((v,i)=>v.map((x,j)=>num(x,'Row '+(i+1)+' '+['x','y','dx','dy'][j],j<2?0:-1000,j<2?10000:1000)));
    if (new Set(pts.map(([x,y])=>x+','+y)).size !== pts.length) throw Error('Use one measured vector per distinct position; take repeat readings separately.');
    const [cx,cy,dx,dy] = [0,1,2,3].map(i=>avg(pts.map(p=>p[i])));
    const sx = Math.max(...pts.map(p=>Math.abs(p[0]-cx))), sy = Math.max(...pts.map(p=>Math.abs(p[1]-cy)));
    if (sx < .005 || sy < .005) throw Error('Measurements are too close on at least one axis for a stable fit. Use widely spaced points.');
    const norm = pts.map(([x,y,u,v])=>[(x-cx)/sx,(y-cy)/sy,u-dx,v-dy]);
    const sum = fn => norm.reduce((s,p)=>s+fn(p),0);
    const xx=sum(([x])=>x*x), yy=sum(([,y])=>y*y), xy=sum(([x,y])=>x*y), det=xx*yy-xy*xy;
    if (det <= xx*yy*1e-9) throw Error('Positions are collinear or almost collinear. Measure a widely spaced rectangle.');
    const fit = col => {
      const ex=sum(p=>p[0]*p[col]), ey=sum(p=>p[1]*p[col]);
      return [(ex*yy-ey*xy)/det/sx,(ey*xx-ex*xy)/det/sy];
    };
    const ax=fit(2), ay=fit(3);
    const samples=pts.map(([x,y,u,v])=>({x,y,dx:u,dy:v,error:Math.hypot(u,v),shiftResidual:Math.hypot(u-dx,v-dy),fitResidual:Math.hypot(u-dx-ax[0]*(x-cx)-ax[1]*(y-cy),v-dy-ay[0]*(x-cx)-ay[1]*(y-cy))}));
    return {samples,dx,dy,ax,ay,tolerance,max:Math.max(...samples.map(p=>p.error)),shiftRms:Math.sqrt(avg(samples.map(p=>p.shiftResidual**2))),fitRms:Math.sqrt(avg(samples.map(p=>p.fitResidual**2)))};
  };

  const laminate = (width,height,artValues,raw,clearance) => {
    const w=dim(width,'Sheet width'),h=dim(height,'Sheet height'),c=num(clearance,'Keep-out clearance');
    const art=rect(artValues,'Required artwork');
    if(!inside(art,w,h)) throw Error('The required artwork box must be inside the sheet.');
    const marks=rows(raw,1,8,'Keep-outs').map((v,i)=>rect(v,'Keep-out '+(i+1)));
    if(marks.some(r=>!inside(r,w,h))) throw Error('Each keep-out must be inside the sheet before adding clearance.');
    const zones=marks.map(r=>inflate(r,c,c));
    const blocked=zones.map((r,i)=>overlap(r,art)?i+1:0).filter(Boolean);
    if(blocked.length) return {w,h,art,marks,zones,blocked,cover:null};
    const left=[0,...zones.map(r=>r.r).filter(x=>x>0&&x<=art.x)], right=[w,...zones.map(r=>r.x).filter(x=>x>=art.r&&x<w)];
    const top=[0,...zones.map(r=>r.b).filter(y=>y>0&&y<=art.y)], bottom=[h,...zones.map(r=>r.y).filter(y=>y>=art.b&&y<h)];
    let cover=null,area=-1;
    for(const x of left) for(const r of right) for(const y of top) for(const b of bottom){
      const candidate={x,y,r,b,w:r-x,h:b-y};
      const score=candidate.w*candidate.h;
      if(score>area&&!zones.some(z=>overlap(z,candidate))) {cover=candidate;area=score;}
    }
    return {w,h,art,marks,zones,blocked,cover};
  };

  const stickers = (width,height,raw,driftX,driftY,minGap) => {
    const w=dim(width,'Sheet width'),h=dim(height,'Sheet height'),dx=num(driftX,'X drift'),dy=num(driftY,'Y drift'),required=num(minGap,'Required clear gap',.001);
    const items=rows(raw,2,30,'Sticker boxes').map((v,i)=>rect(v,'Sticker '+(i+1)));
    if(items.some(a=>!inside(a,w,h))) throw Error('Nominal sticker boxes must fit the sheet. Correct the entered placement first.');
    const envelopes=items.map(r=>inflate(r,dx,dy)),pairs=[],edges=[];
    envelopes.forEach((a,i)=>{
      if(!inside(a,w,h)) edges.push(i+1);
      for(let j=i+1;j<envelopes.length;j++){
        const b=envelopes[j], nominal=gap(items[i],items[j]), worst=gap(a,b);
        pairs.push({a:i+1,b:j+1,nominal,worst,fail:worst+eps<required});
      }
    });
    pairs.sort((a,b)=>a.worst-b.worst||a.nominal-b.nominal||a.a-b.a||a.b-b.b);
    return {w,h,items,envelopes,pairs,edges,required,issues:pairs.filter(p=>p.fail)};
  };

  const coupons = (width,height,sizes,repeats,spacing,margin) => {
    const w=dim(width,'Sheet width'),h=dim(height,'Sheet height'),g=num(spacing,'Spacing',.01),m=num(margin,'Outer margin');
    const repeat=num(repeats,'Repeats',1,4);
    if(!Number.isInteger(repeat)) throw Error('Repeats must be a whole number.');
    const values=String(sizes).split(',');
    if(String(sizes).length>160||values.length>6) throw Error('Use at most six comma-separated sizes.');
    const ss=values.map((s,i)=>num(s,'Size '+(i+1),.5,100));
    if(new Set(ss).size!==ss.length) throw Error('Use distinct test sizes; the repeat control makes copies.');
    const max=Math.max(...ss), needW=2*m+repeat*3*max+(repeat*3-1)*g, needH=2*m+ss.reduce((a,b)=>a+b,0)+(ss.length-1)*g;
    if(needW>w+1e-9||needH>h+1e-9) throw Error('The coupon set needs '+needW.toFixed(2)+' × '+needH.toFixed(2)+' mm. Use a larger sheet or fewer/smaller shapes.');
    let y=m;
    const shapes=[];
    ss.forEach(s=>{
      for(let i=0;i<repeat*3;i++) shapes.push({type:['square','circle','triangle'][i%3],x:m+i*(s+g),y,s});
      y+=s+g;
    });
    return {w,h,shapes,needW,needH,ss,repeat};
  };
  const couponSvg = ({w,h,shapes}) => {
    const path=shapes.map(({type,x,y,s})=>{
      if(type==='square') return '<rect x="'+x+'" y="'+y+'" width="'+s+'" height="'+s+'"/>';
      if(type==='circle') return '<circle cx="'+(x+s/2)+'" cy="'+(y+s/2)+'" r="'+s/2+'"/>';
      return '<polygon points="'+x+','+(y+s*Math.sqrt(3)/2)+' '+(x+s)+','+(y+s*Math.sqrt(3)/2)+' '+(x+s/2)+','+y+'"/>';
    }).join('');
    return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'mm" height="'+h+'mm" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Closed test coupon outlines"><g fill="none" stroke="#111827" stroke-width=".12">'+path+'</g></svg>';
  };
  globalThis.PPLPrintCut={register,laminate,stickers,coupons,couponSvg};
})();
