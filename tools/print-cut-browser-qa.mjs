import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import {createRequire} from 'node:module';
const {chromium}=createRequire(path.join(process.env.PPL_QA_MODULES,'ppl-qa.cjs'))('playwright-core');
const live=process.argv.includes('--live'),root=process.cwd(),output=await fs.mkdtemp(path.join(os.tmpdir(),'ppl-print-cut-qa-'));
const examples=[
  ['print-cut-registration-checker','Outside entered limit','0.4472 mm','limit','0.5','Within entered limit','0'],
  ['print-cut-laminate-planner','Rectangle fits','210 × 247 mm','y','21','No clear rectangle','-1'],
  ['kiss-cut-sticker-clearance-checker','Review clearances','0.8 mm conservative gap','dx','0.25','Entered clearances met','-1'],
  ['vinyl-cutter-test-coupon-generator','18 closed outlines','128 × 56 mm','repeat','1','9 closed outlines','5'],
];
const routes=['/tools/print-cut-production.html',...examples.map(([name])=>'/tools/'+name+'.html'),'/guides/print-cut-production-qa.html'];
const server=live?null:http.createServer(async(req,res)=>{
  try {
    const route=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=path.resolve(root,'.'+route);
    if(file!==root&&!file.startsWith(root+path.sep))throw Error('Outside root');
    if(route.endsWith('/'))file=path.join(file,'index.html');
    const data=await fs.readFile(file);
    res.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml'}[path.extname(file)]||'application/octet-stream'});
    res.end(data);
  } catch {res.writeHead(404);res.end();}
});
if(server)await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=live?'https://printproductionlab.com':`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:process.env.PPL_QA_BROWSER,headless:true});
const errors=[],renders=[],actions=[];
try {
  const context=await browser.newContext({permissions:['clipboard-read','clipboard-write'],acceptDownloads:true});
  await context.route('**/*',r=>r.request().url().startsWith(base+'/')?r.continue():r.abort());
  const page=await context.newPage();page.setDefaultTimeout(8000);
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&!/net::ERR_FAILED|net::ERR_BLOCKED_BY_CLIENT/.test(m.text()))errors.push(m.text());});
  page.on('response',r=>{if(r.url().startsWith(base+'/')&&r.status()>=400)errors.push(r.status()+' '+r.url());});
  const run=()=>page.locator('#pc-run').click();
  const copy=async(expected,absent)=>{
    await page.locator('.result [data-copy]').click();
    const payload=await page.evaluate(()=>navigator.clipboard.readText());
    assert.ok(payload.includes(expected),payload);
    if(absent)assert.ok(!payload.includes(absent),payload);
  };
  for(const width of [1440,1280,1024,900,768,390]){
    await page.setViewportSize({width,height:1000});
    for(const route of routes){
      assert.equal((await page.goto(base+route)).status(),200);
      const active=await page.locator('[data-print-cut]').count();
      assert.equal(await page.locator('[data-copy]').count(),0);
      if(active){await run();await page.locator('.result [data-copy]').waitFor();assert.equal(await page.locator('#pc-detail').isVisible(),true);}
      const data=await page.evaluate(()=>{
        const rect=e=>{const r=e.getBoundingClientRect();return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};};
        const rows=new Map();
        for(const e of document.querySelectorAll('.pc-fields label')){
          const key=Math.round(rect(e).top);if(!rows.has(key))rows.set(key,[]);rows.get(key).push(rect(e.querySelector('input')));
        }
        return {overflow:document.documentElement.scrollWidth-innerWidth,rows:[...rows.values()],header:rect(document.querySelector('header')),h1:rect(document.querySelector('h1')),footer:!!document.querySelector('footer'),canonical:document.querySelector('link[rel=canonical]').href,
          offscreen:[...document.querySelectorAll('main input,main textarea,main button,.pc-detail svg,.pc-table')].filter(e=>{const r=rect(e);return r.width&&(r.left<-.5||r.right>innerWidth+.5)}).map(e=>e.id||e.tagName)};
      });
      assert.equal(data.overflow,0,route+' '+width);assert.deepEqual(data.offscreen,[],route+' '+width);
      assert.ok(data.h1.top>=data.header.bottom-.5);assert.ok(data.footer);
      assert.equal(data.canonical,'https://printproductionlab.com'+route);
      for(const row of data.rows)if(row.length>1)for(const a of row)for(const b of row){assert.ok(Math.abs(a.top-b.top)<.6,route+' input tops');assert.ok(Math.abs(a.bottom-b.bottom)<.6,route+' input bottoms');}
      const name=route.split('/').at(-1).replace('.html','');
      await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(output,name+'-'+width+'.png')});
      if(active&&[1440,390].includes(width))await page.locator('#pc-detail').screenshot({path:path.join(output,name+'-detail-'+width+'.png')});
      renders.push({route,width,...data});
    }
  }
  for(const [name,headline,summary,id,value,second,invalid] of examples){
    await page.goto(base+'/tools/'+name+'.html');const prompt=await page.locator('#pc-result').innerHTML();
    await run();assert.equal(await page.locator('#pc-result strong').innerText(),headline);
    assert.ok((await page.locator('#pc-result').innerText()).includes(summary));await copy(summary);
    await page.locator('#pc-'+id).fill(value);
    assert.equal(await page.locator('#pc-detail').isVisible(),false);assert.equal(await page.locator('[data-copy]').count(),0);
    await run();assert.equal(await page.locator('#pc-result strong').innerText(),second);await copy(second,headline);
    await page.locator('#pc-'+id).fill(invalid);await run();
    assert.equal(await page.locator('#pc-result .error').count(),1);assert.equal(await page.locator('[data-copy]').count(),0);
    assert.equal(await page.locator('#pc-detail').isVisible(),false);
    await page.locator('[data-reset]').click();assert.equal(await page.locator('#pc-result').innerHTML(),prompt);assert.equal(await page.locator('#pc-detail').isVisible(),false);
    await run();assert.equal(await page.locator('#pc-result strong').innerText(),headline);
    if(name.includes('coupon')){
      const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#pc-save').click()]);
      assert.equal(download.suggestedFilename(),'print-cut-test-coupons.svg');
      const svg=await fs.readFile(await download.path(),'utf8');
      assert.ok(svg.includes('width="210mm" height="297mm" viewBox="0 0 210 297"'));
      assert.equal((svg.match(/<(rect|circle|polygon) /g)||[]).length,18);
      const measured=await page.evaluate(text=>{
        const doc=new DOMParser().parseFromString(text,'image/svg+xml');
        const square=doc.querySelector('rect'),circle=doc.querySelector('circle'),triangle=doc.querySelector('polygon');
        return [Number(square.getAttribute('width')),2*Number(circle.getAttribute('r')),Number(triangle.getAttribute('points').split(' ')[1].split(',')[0])-Number(triangle.getAttribute('points').split(' ')[0].split(',')[0])];
      },svg);
      assert.deepEqual(measured,[8,8,8]);
      await page.locator('#pc-repeat').fill('2');assert.equal(await page.locator('#pc-save').count(),0);
    }
    actions.push({name,calculate:'PASS',alternate:'PASS',copy:'PASS',stale:'PASS',error:'PASS',reset:'PASS',rerun:'PASS',download:name.includes('coupon')?'PASS':'not applicable'});
  }
  await page.goto(base+routes[0]);const menu=page.locator('header button');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'false');
  assert.deepEqual(errors,[]);
  await fs.writeFile(path.join(output,'report.json'),JSON.stringify({live,renders,actions,errors,analyticsBlocked:true},null,2));
  console.log(JSON.stringify({live,renders:renders.length,actions,errors,output}));
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
