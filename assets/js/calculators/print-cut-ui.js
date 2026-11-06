(() => {
  const tool=document.querySelector('[data-print-cut]');
  if(!tool) return;
  const by=id=>document.getElementById(id);
  const result=by('pc-result'),detail=by('pc-detail'),body=by('pc-body'),initial=result.innerHTML;
  const val=id=>by('pc-'+id).value;
  const f=n=>Number(n.toFixed(4)).toLocaleString('en-US',{maximumFractionDigits:4});
  const core=globalThis.PPLPrintCut;
  let downloadable='';
  const r=(q,kind)=>'<rect class="'+kind+'" x="'+q.x+'" y="'+q.y+'" width="'+q.w+'" height="'+q.h+'"/>';
  const diagram=(q,shapes,label)=>'<svg class="pc-diagram" viewBox="0 0 '+q.w+' '+q.h+'" role="img" aria-label="'+label+'"><rect width="'+q.w+'" height="'+q.h+'" class="pc-sheet"/>'+shapes+'</svg>';
  const list=(title,items)=>'<h3>'+title+'</h3><ul>'+items.map(x=>'<li>'+x+'</li>').join('')+'</ul>';
  const table=(heads,values)=>'<p class="pc-scroll-note">Scroll the numeric report horizontally if needed.</p><div class="pc-table" tabindex="0" role="region" aria-label="Detailed numeric report"><table><thead><tr>'+heads.map(x=>'<th scope="col">'+x+'</th>').join('')+'</tr></thead><tbody>'+values.map(v=>'<tr>'+v.map(x=>'<td>'+x+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
  const state=(headline,summary,markup)=>{
    result.innerHTML='<strong>'+headline+'</strong><p>'+summary+'</p>';
    body.innerHTML=markup;
    detail.hidden=false;
  };
  const clear=()=>{
    downloadable='';
    body.replaceChildren();
    detail.hidden=true;
  };
  tool.addEventListener('input',()=>{clear();result.innerHTML=initial;});
  tool.addEventListener('click',event=>{if(event.target.closest('[data-reset]')) clear();});
  detail.addEventListener('click',event=>{
    if(!event.target.closest('#pc-save')||!downloadable) return;
    const url=URL.createObjectURL(new Blob([downloadable],{type:'image/svg+xml;charset=utf-8'}));
    const link=document.createElement('a');
    link.href=url;link.download='print-cut-test-coupons.svg';
    document.body.append(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  by('pc-run').addEventListener('click',()=>{
    clear();
    try {
      const type=tool.dataset.printCut;
      if(type==='register'){
        const q=core.register(val('rows'),val('limit'));
        state(q.max<=q.tolerance?'Within entered limit':'Outside entered limit',
          'Largest observed vector '+f(q.max)+' mm; limit '+f(q.tolerance)+' mm. Mean shift: X '+f(q.dx)+' mm, Y '+f(q.dy)+' mm. Shift-only RMS '+f(q.shiftRms)+' mm; affine fit RMS '+f(q.fitRms)+' mm.',
          list('Measured direction trends per 100 mm',[
            'Across X: ΔX '+f(q.ax[0]*100)+' mm; ΔY '+f(q.ay[0]*100)+' mm.',
            'Down Y: ΔX '+f(q.ax[1]*100)+' mm; ΔY '+f(q.ay[1]*100)+' mm.',
            'A smaller affine residual describes these samples, not a verified cause or cutter setting.'
          ])+table(['Point','X / Y (mm)','ΔX / ΔY (mm)','Vector (mm)','Shift residual (mm)','Fit residual (mm)'],
            q.samples.map((p,i)=>[i+1,f(p.x)+' / '+f(p.y),f(p.dx)+' / '+f(p.dy),f(p.error),f(p.shiftResidual),f(p.fitResidual)])));
      } else if(type==='laminate'){
        const q=core.laminate(val('w'),val('h'),['x','y','aw','ah'].map(val),val('rows'),val('clearance'));
        const c=q.cover;
        state(c?'Rectangle fits':'No clear rectangle',
          c?'Cut size '+f(c.w)+' × '+f(c.h)+' mm, top-left X '+f(c.x)+' mm / Y '+f(c.y)+' mm. Area '+f(c.w*c.h)+' mm². Geometry only; prove mark reading on the actual sheet.':
          'Required artwork intersects expanded keep-out '+q.blocked.join(', ')+'. Change the artwork requirement or replan the job; do not move or redraw machine marks.',
          diagram(q,q.zones.map(z=>r(z,'pc-zone')).join('')+(c?r(c,'pc-cover'):'')+r(q.art,'pc-art'),'Sheet, expanded keep-outs, required artwork and proposed laminate')+
          list('Diagram key',['Red: expanded keep-outs; blue outline: required artwork.','Green: proposed laminate, when feasible. Positions start at the top-left of the measured sheet.']));
      } else if(type==='stickers'){
        const q=core.stickers(val('w'),val('h'),val('rows'),val('dx'),val('dy'),val('gap'));
        const p=q.pairs[0],selected=(q.issues.length?q.issues:q.pairs).slice(0,15);
        state(q.issues.length||q.edges.length?'Review clearances':'Entered clearances met',
          q.issues.length+' pair(s) below '+f(q.required)+' mm; '+q.edges.length+' envelope(s) cross a sheet edge. Tightest pair '+p.a+'–'+p.b+': '+f(p.worst)+' mm conservative gap, '+f(p.nominal)+' mm nominal.',
          diagram(q,q.envelopes.map(z=>r(z,'pc-zone')).join('')+q.items.map(z=>r(z,'pc-art')).join(''),'Sticker boxes with local movement envelopes')+
          list('Read the screening report',['Red: swept boxes; blue: nominal cut bounding boxes. Check exact artwork for flagged irregular shapes.',
            q.edges.length?'Edge rows: '+q.edges.join(', ')+'.':'No entered envelope crosses a sheet edge.','Showing '+selected.length+' closest '+(q.issues.length?'flagged pairs.':'pairs.')+' Numbers are input row order.'])+
          table(['Pair','Nominal (mm)','Conservative (mm)','Screen'],selected.map(a=>[a.a+'–'+a.b,f(a.nominal),f(a.worst),a.fail?'Below gap':'Meets gap'])));
      } else if(type==='coupons'){
        const q=core.coupons(val('w'),val('h'),val('sizes'),val('repeat'),val('spacing'),val('margin'));
        downloadable=core.couponSvg(q);
        state(q.shapes.length+' closed outlines',
          q.repeat+' set(s) per size; '+q.ss.map(f).join(', ')+' mm. Required envelope '+f(q.needW)+' × '+f(q.needH)+' mm including margins. Verify scale after import.',
          '<p>Preview zooms to the used envelope. The download retains the full sheet.</p><div class="pc-coupon">'+core.couponSvg({...q,w:q.needW,h:q.needH})+'</div><button type="button" id="pc-save">Download outline SVG</button>'+
          list('Inspect one variable at a time',['Each row is a size in the order entered. Within a row the sequence is square, circle, triangle, repeated left to right.',
            'Record actual blade, material and device preset separately. The SVG has no blade, speed, pressure or compensation commands.']));
      }
    } catch(error) {
      const p=document.createElement('p');p.className='error';p.textContent=error.message;
      result.replaceChildren(p);
    }
  });
})();
