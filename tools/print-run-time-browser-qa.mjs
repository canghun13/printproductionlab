import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import {createRequire} from 'node:module';
const {chromium}=createRequire(path.join(process.env.PPL_QA_MODULES,'ppl-qa.cjs'))('playwright-core');
const live=process.argv.includes('--live'),reproduce=process.argv.includes('--reproduce'),root=process.cwd();
const output=await fs.mkdtemp(path.join(os.tmpdir(),'ppl-runtime-qa-')),target='/tools/print-run-time.html';
const server=live?null:http.createServer(async(req,res)=>{try{const route=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=path.resolve(root,'.'+route);if(file!==root&&!file.startsWith(root+path.sep))throw Error('Outside root');if(route.endsWith('/'))file=path.join(file,'index.html');const body=await fs.readFile(file);res.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml'}[path.extname(file)]||'application/octet-stream'});res.end(body);}catch{res.writeHead(404);res.end();}});
if(server)await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=live?'https://printproductionlab.com':`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:process.env.PPL_QA_BROWSER,headless:true}),errors=[],renders=[],fixtures=[];
try{
 const context=await browser.newContext({viewport:{width:1280,height:900},permissions:['clipboard-read','clipboard-write']});
 await context.route('**/*',r=>r.request().url().startsWith(base+'/')?r.continue():r.abort());
 const page=await context.newPage();page.setDefaultTimeout(8000);page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/net::ERR_FAILED|net::ERR_BLOCKED_BY_CLIENT/.test(m.text()))errors.push(m.text());});page.on('response',r=>{if(r.url().startsWith(base+'/')&&r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
 const run=()=>page.locator("button[onclick=\"run2('runtime')\"]").click();
 async function inputs(a,b,c){for(const[id,v]of Object.entries({a,b,c}))await page.locator('#'+id).fill(String(v));await run();}
 async function state(route,width,name){
  const box=await page.evaluate(()=>{const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};};const rows=new Map();for(const label of document.querySelectorAll('.calculator label')){const control=label.querySelector('input,select');if(!control)continue;const key=Math.round(label.getBoundingClientRect().top);if(!rows.has(key))rows.set(key,[]);rows.get(key).push(rect(control));}return {overflow:document.documentElement.scrollWidth-innerWidth,header:rect(document.querySelector('header')),h1:rect(document.querySelector('h1')),result:rect(document.querySelector('.result')),controlRows:[...rows.values()],offscreen:[...document.querySelectorAll('main input,main select,main button,main .result')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.left<-.5||r.right>innerWidth+.5);}).length,copyInside:document.querySelectorAll('.result [data-copy]').length,copyOutside:document.querySelectorAll('[data-copy]').length-document.querySelectorAll('.result [data-copy]').length};});
  assert.equal(box.overflow,0);assert.equal(box.offscreen,0);assert.equal(box.copyOutside,0);assert.ok(box.h1.top>=box.header.bottom-.5);if(!reproduce&&route===target&&width>768)for(const row of box.controlRows)if(row.length>1){assert.ok(Math.max(...row.map(r=>r.top))-Math.min(...row.map(r=>r.top))<.6,'Runtime desktop input top alignment');assert.ok(Math.max(...row.map(r=>r.bottom))-Math.min(...row.map(r=>r.bottom))<.6,'Runtime desktop input bottom alignment');}await page.locator('.calculator').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(output,`${name}-${width}.png`)});renders.push({route,width,name,...box});
 }
 await page.goto(base+target,{waitUntil:'load'});
 if(reproduce){for(const input of [[1,6000,1],[12,6000,1],[1e308,1e308,2],[1e-300,1e300,1],[12000,6000,4]]){await inputs(...input);fixtures.push({input,result:await page.locator('.result').innerText()});}await state(target,1280,'before-default');await inputs(1,6000,1);await page.screenshot({path:path.join(output,'before-short-run.png'),fullPage:true});assert.match(fixtures[0].result,/0\.00 press hours/);assert.match(fixtures[2].result,/∞|Infinity/);}
 else{
  for(const width of [1440,1280,1024,900,768,390]){
   await page.setViewportSize({width,height:900});await page.goto(base+target,{waitUntil:'load'});const initial=await page.locator('.result').innerHTML();assert.equal(await page.locator('[data-copy]').count(),0);
   await run();assert.equal(await page.locator('.result strong').innerText(),'8.00 press hours');await state(target,width,'default');
   await inputs(1,6000,1);assert.equal(await page.locator('.result strong').innerText(),'0.60 press seconds');await state(target,width,'short');await page.locator('.result [data-copy]').click();await page.getByRole('button',{name:'Copy calculation result'}).filter({hasText:'Copied'}).waitFor();const copied=await page.evaluate(()=>navigator.clipboard.readText());assert.ok(copied.includes('0.60 press seconds')&&!copied.includes('8.00 press hours')&&!copied.includes('Enter impressions'));
   await inputs(12,6000,1);assert.equal(await page.locator('.result strong').innerText(),'7.20 press seconds');
   await inputs(0.000001,6000,1);assert.equal(await page.locator('.result strong').innerText(),'less than 0.01 press seconds');await state(target,width,'below-resolution');
   await inputs('1e308','1e308',2);assert.equal(await page.locator('.result .error').count(),1);assert.equal(await page.locator('[data-copy]').count(),0);await state(target,width,'range-error');
   await page.locator('[data-reset]').click();assert.equal(await page.locator('.result').innerHTML(),initial);assert.equal(await page.locator('[data-copy]').count(),0);assert.deepEqual(await page.locator('.calculator input').evaluateAll(es=>es.map(e=>e.value)),['12000','6000','4']);await run();assert.equal(await page.locator('.result strong').innerText(),'8.00 press hours');
  }
  for(const [input,expected]of [[[2.5,4000,1],'2.25 press seconds'],[[0.000001,6000,1],'less than 0.01 press seconds'],[[30,6000,1],'0.01 press hours'],[[1,6000,10000],'1.67 press hours'],[[1e308,1e308,1],'1.00 press hours']]){await inputs(...input);assert.equal(await page.locator('.result strong').innerText(),expected);assert.ok(!/NaN|Infinity|undefined|∞/.test(await page.locator('.result').innerText()));fixtures.push({input,expected,actual:await page.locator('.result').innerText()});}
  assert.match(fixtures.at(-1).actual,/1\.00e\+308 total press impressions/);
  for(const input of [[0,6000,1],[-1,6000,1],['',6000,1],[12000,'',1],[12000,0,1],[12000,6000,1.5],[12000,6000,-1],['1e-300','1e300',1],['1e308',1,2]]){await inputs(...input);assert.equal(await page.locator('.result .error').count(),1);assert.equal(await page.locator('[data-copy]').count(),0);assert.ok(!/NaN|Infinity|undefined|∞/.test(await page.locator('.result').innerText()));fixtures.push({input,error:'PASS'});}
  for(const route of ['/tools/book-spine-width-calculator.html','/tools/booklet-creep-calculator.html','/tools/roll-diameter.html'])for(const width of [1440,390]){await page.setViewportSize({width,height:900});await page.goto(base+route);const result=page.locator('.result'),initial=await result.innerHTML();await page.locator('.calculator button:not([data-copy]):not([data-reset])').first().click();await result.locator('[data-copy]').waitFor({state:'visible'});await state(route,width,route.split('/').at(-1).replace('.html',''));await result.locator('[data-copy]').click();await page.getByRole('button',{name:'Copy calculation result'}).filter({hasText:'Copied'}).waitFor();await page.locator('[data-reset]').click();assert.equal(await result.innerHTML(),initial);}
  await page.goto(base+target);const menu=page.locator('header button');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'false');
 }
 assert.deepEqual(errors,[]);const report={mode:live?'live':'local',reproduce,renders,fixtures,errors,analyticsBlocked:true,output};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({...report,renders:renders.length}));
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
