import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import {createRequire} from 'node:module';
const {chromium}=createRequire(path.join(process.env.PPL_QA_MODULES,'ppl-qa.cjs'))('playwright-core');
const root=process.cwd(),live=process.argv.includes('--live');
const output=await fs.mkdtemp(path.join(os.tmpdir(),'ppl-reset-select-qa-'));
const server=live?null:http.createServer(async(req,res)=>{try{
  let file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(!file.startsWith(root+path.sep))throw Error('Outside root');
  if(file.endsWith(path.sep))file=path.join(file,'index.html');
  const body=await fs.readFile(file);res.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml'}[path.extname(file)]||'application/octet-stream'});res.end(body);
}catch{res.writeHead(404);res.end();}});
if(server)await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=live?'https://printproductionlab.com':`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:process.env.PPL_QA_BROWSER,headless:true}),renders=[],errors=[];
try{
  const context=await browser.newContext({permissions:['clipboard-read','clipboard-write']});
  await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&m.location().url.startsWith(base))errors.push(m.text());});
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  for(const [slug,expected]of [['drawing-scale-converter','4.2 m real length'],['plot-sheet-fit-planner','A2 landscape'],['web-tension-force-calculator','200 N total web tension']])for(const width of [1440,1280,1024,900,768,390]){
    await page.setViewportSize({width,height:1000});await page.goto(`${base}/tools/${slug}.html`);
    const fields=()=>page.locator('.calculator input,.calculator select').evaluateAll(es=>es.map(e=>({id:e.id,value:e.value})));
    const defaults=await fields(),initial=await page.locator('.result').innerHTML();
    const run=()=>page.locator('.calculator button:not([data-copy]):not([data-reset])').first().click();
    await run();assert.equal(await page.locator('.result strong').first().innerText(),expected);
    await page.locator('.result [data-copy]').waitFor({state:'visible'});
    const original=await page.locator('.result [data-copy]').getAttribute('data-copy-value');
    await page.locator('.calculator select').evaluateAll(es=>es.forEach(e=>{e.selectedIndex=(e.selectedIndex+1)%e.options.length;e.dispatchEvent(new Event('change',{bubbles:true}));}));
    await page.locator('[data-reset]').click();assert.deepEqual(await fields(),defaults);assert.equal(await page.locator('.result').innerHTML(),initial);assert.equal(await page.locator('[data-copy]').count(),0);
    await run();assert.equal(await page.locator('.result strong').first().innerText(),expected);
    await page.locator('.result [data-copy]').click();assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r/g,''),original.replace(/\r/g,''));
    const geometry=await page.evaluate(()=>{const rect=e=>{const b=e.getBoundingClientRect();return {x:b.x,y:b.y,right:b.right,bottom:b.bottom,height:b.height};};return {overflow:document.documentElement.scrollWidth-innerWidth,controls:[...document.querySelectorAll('.calculator input,.calculator select,.calculator button')].map(rect),rows:[...document.querySelectorAll('.calculator label')].map(e=>({label:rect(e),control:rect(e.querySelector('input,select'))}))};});
    assert.equal(geometry.overflow,0);assert.ok(geometry.controls.every(r=>r.x>=-.5&&r.right<=width+.5));
    if(width>768)for(const a of geometry.rows)for(const b of geometry.rows)if(Math.abs(a.label.y-b.label.y)<.5){assert.ok(Math.abs(a.control.y-b.control.y)<.6);assert.ok(Math.abs(a.control.bottom-b.control.bottom)<.6);}
    await page.locator('.calculator').screenshot({path:path.join(output,`${slug}-${width}.png`)});
    await page.locator('.calculator input').first().fill('0');await run();assert.equal(await page.locator('.result .error').count(),1);assert.equal(await page.locator('[data-copy]').count(),0);
    await page.locator('[data-reset]').click();await run();assert.equal(await page.locator('.result strong').first().innerText(),expected);
    if(width===390){await page.locator('header button').click();assert.equal(await page.locator('header button').getAttribute('aria-expanded'),'true');await page.locator('header button').click();}
    renders.push({slug,width,expected,defaults,geometry,resetRerun:'PASS',errorRerun:'PASS',clipboard:'PASS'});
  }
  assert.deepEqual(errors,[]);await fs.writeFile(path.join(output,'report.json'),JSON.stringify({live,renders,errors,analyticsBlocked:true},null,2));
  console.log(JSON.stringify({mode:live?'live':'local',renders:renders.length,errors,output}));
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
