import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import {createRequire} from 'node:module';

// Existing installed Chrome + bundled Playwright only. QA never records GA4 hits.
const {chromium}=createRequire(path.join(process.env.PPL_QA_MODULES,'ppl-qa.cjs'))('playwright-core');
const live=process.argv.includes('--live'), root=process.cwd(), output=await fs.mkdtemp(path.join(os.tmpdir(),'ppl-reference-qa-'));
const target='/reference/binding-page-count.html',hub='/reference/';
const server=live?null:http.createServer(async(req,res)=>{
  try{
    const route=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=path.resolve(root,'.'+route);if(file!==root&&!file.startsWith(root+path.sep))throw Error('Outside root');
    if(route.endsWith('/'))file=path.join(file,'index.html');
    const body=await fs.readFile(file);res.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.ico':'image/x-icon'}[path.extname(file)]||'application/octet-stream'});res.end(body);
  }catch{res.writeHead(404);res.end();}
});
if(server)await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=live?'https://printproductionlab.com':`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:process.env.PPL_QA_BROWSER,headless:true});
const errors=[],renders=[],interactions=[];
try{
  const context=await browser.newContext({viewport:{width:1280,height:900},permissions:['clipboard-read','clipboard-write']});
  await context.route('**/*',r=>r.request().url().startsWith(base+'/')?r.continue():r.abort());
  const page=await context.newPage();page.setDefaultTimeout(7000);
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&!/net::ERR_FAILED|net::ERR_BLOCKED_BY_CLIENT/.test(m.text()))errors.push(m.text());});
  page.on('response',r=>{if(r.url().startsWith(base+'/')&&r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  async function render(route,width){
    await page.setViewportSize({width,height:900});const response=await page.goto(base+route,{waitUntil:'load'});assert.equal(response.status(),200);
    const data=await page.evaluate(()=>{
      const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height};};
      const cards=[...document.querySelectorAll('main .panel.tool')].map(e=>({text:e.innerText,box:box(e)}));
      return {overflow:document.documentElement.scrollWidth-innerWidth,header:box(document.querySelector('header')),h1:box(document.querySelector('h1')),cards,footer:!!document.querySelector('footer'),offscreen:[...document.querySelectorAll('main input,main select,main button,main .panel.tool')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.left<-.5||r.right>innerWidth+.5);}).length,canonical:document.querySelector('link[rel="canonical"]').href};
    });
    assert.equal(data.overflow,0,`${route}/${width}: overflow`);assert.equal(data.offscreen,0);assert.ok(data.footer);assert.ok(data.h1.y>=data.header.bottom-.5);
    assert.equal(data.canonical,'https://printproductionlab.com'+route);
    if(route===hub){assert.equal(data.cards.length,8);for(const c of data.cards)assert.ok(c.box.height>0&&c.box.width>0);}
    renders.push({route,width,...data});return data;
  }
  for(const width of [1440,1280,1024,900,768,390]){
    await render(hub,width);const card=page.locator(`main a[href="${target}"]`);assert.equal(await card.count(),1);
    await card.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(output,`hub-card-${width}.png`)});
    await card.click();await page.waitForURL(base+target);assert.equal(await page.locator('h1').innerText(),'Binding Method and Page Count Reference');
    await render(target,width);await page.screenshot({path:path.join(output,`reference-top-${width}.png`)});
    if(width===1440||width===390)await page.screenshot({path:path.join(output,`reference-full-${width}.png`),fullPage:true});
    await page.getByRole('link',{name:'Signature Count Calculator',exact:true}).scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(output,`reference-links-${width}.png`)});
    for(const [name,href]of [['Signature Count Calculator','/tools/signature-count.html'],['How Signatures Work in Book Printing','/guides/signatures.html']]){
      await page.getByRole('link',{name,exact:true}).click();await page.waitForURL(base+href);assert.equal((await page.locator('h1').count()),1);await page.goBack({waitUntil:'load'});
    }
    interactions.push({width,card:'PASS',calculatorLink:'PASS',guideLink:'PASS'});
  }
  await page.goto(base+hub);await page.locator(`main a[href="${target}"]`).focus();await page.keyboard.press('Enter');await page.waitForURL(base+target);
  const menu=page.locator('header button');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'false');
  for(const route of ['/tools/signature-count.html','/tools/book-spine-width-calculator.html','/tools/booklet-creep-calculator.html']){
    for(const width of [1440,390])await render(route,width);
    const result=page.locator('.result'),initial=await result.innerHTML();assert.equal(await page.locator('[data-copy]').count(),0);
    const defaults=await page.locator('.calculator input,.calculator select').evaluateAll(nodes=>nodes.map(e=>e.value));
    if(route.includes('signature-count')){await page.locator('#a').fill('192');await page.locator('#b').fill('16');}
    const calculate=()=>page.locator('.calculator button:not([data-copy]):not([data-reset])').first().click();
    await calculate();await result.locator('[data-copy]').waitFor({state:'visible'});assert.ok(!/NaN|Infinity|undefined/.test(await result.innerText()));
    if(route.includes('signature-count'))assert.match(await result.locator('strong').innerText(),/^12(?:\.00)?$/);
    await result.locator('[data-copy]').click();await page.getByRole('button',{name:'Copy calculation result'}).filter({hasText:'Copied'}).waitFor();
    const copied=await page.evaluate(()=>navigator.clipboard.readText());assert.ok(copied.includes(await result.locator('strong').innerText()));assert.ok(!/Enter values|Copy result/i.test(copied));
    await page.locator('[data-reset]').click();assert.equal(await result.innerHTML(),initial);assert.equal(await page.locator('[data-copy]').count(),0);
    assert.deepEqual(await page.locator('.calculator input,.calculator select').evaluateAll(nodes=>nodes.map(e=>e.value)),defaults);
    await page.locator('#a').fill('0');await calculate();assert.equal(await result.locator('.error').count(),1);assert.equal(await page.locator('[data-copy]').count(),0);
    await page.locator('[data-reset]').click();await calculate();await result.locator('[data-copy]').waitFor({state:'visible'});
    interactions.push({route,calculate:'PASS',copy:'PASS',reset:'PASS',invalid:'PASS',rerun:'PASS'});
  }
  assert.deepEqual(errors,[]);
  await fs.writeFile(path.join(output,'report.json'),JSON.stringify({mode:live?'live':'local',renders,interactions,errors,keyboard:'PASS',menu:'PASS',output},null,2));
  console.log(JSON.stringify({mode:live?'live':'local',renders:renders.length,interactions:interactions.length,errors,keyboard:'PASS',menu:'PASS',output}));
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
