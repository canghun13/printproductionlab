import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

// Use the existing browser/dependency bundle; never install a browser or package.
const modules = process.env.PPL_QA_MODULES;
const executablePath = process.env.PPL_QA_BROWSER;
if (!modules || !executablePath) throw new Error('Set PPL_QA_MODULES and PPL_QA_BROWSER to existing runtime paths.');
const { chromium } = createRequire(path.join(modules, 'ppl-qa.cjs'))('playwright-core');
const root = process.cwd();
const live = process.argv.includes('--live');
const widths = [1440,1280,1024,900,768,390];
const output = await fs.mkdtemp(path.join(os.tmpdir(), 'ppl-roll-qa-'));
const failures = [];
const knownIssues = [];
const baselineRef = process.argv.find(x=>x.startsWith('--baseline='))?.slice(11) || 'HEAD';
const baseline = execFileSync('git',['show',`${baselineRef}:tools/roll-diameter.html`],{encoding:'utf8'});
const renders = [];
const functions = [];
const server = live ? null : http.createServer(async (req,res) => {
  try {
    const route = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file = path.resolve(root, '.' + route);
    if (!file.startsWith(root + path.sep) && file !== root) throw new Error('Outside root');
    if (route.endsWith('/')) file = path.join(file,'index.html');
    const bytes = route === '/tools/__roll-baseline.html' ? baseline : await fs.readFile(file);
    const type = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.xml':'application/xml'}[path.extname(file)] || 'application/octet-stream';
    res.writeHead(200,{'Content-Type':type});res.end(bytes);
  } catch { res.writeHead(404);res.end(); }
});
if (server) await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base = live ? 'https://printproductionlab.com' : `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({executablePath,headless:true});
try {
  const context = await browser.newContext({viewport:{width:1280,height:900},permissions:['clipboard-read','clipboard-write']});
  // Avoid contaminating GA4 with this regression run. Owner-managed remote badges are not modified.
  await context.route('**/*',r=>r.request().url().startsWith(base) ? r.continue() : r.abort());
  const page = await context.newPage();
  page.setDefaultTimeout(5000);
  page.on('pageerror',e=>failures.push('pageerror: '+e.message));
  page.on('requestfailed',r=>{if(r.url().startsWith(base)) failures.push('requestfailed: '+r.url());});
  page.on('console',m=>{if(m.type()==='error' && !/net::ERR_FAILED|net::ERR_BLOCKED_BY_CLIENT/.test(m.text())) failures.push('console: '+m.text());});
  page.on('response',r=>{if(r.url().startsWith(base) && r.status()>=400) failures.push(r.status()+': '+r.url());});
  // Verify the already-existing 900 px footer defect rather than masking it or
  // expanding a calculator-unit repair into a site-wide footer redesign.
  let baselineOverflow = null;
  if (!live) {
    await page.setViewportSize({width:900,height:900});await page.goto(base+'/tools/__roll-baseline.html');
    baselineOverflow=await page.evaluate(()=>({
      page:document.documentElement.scrollWidth-innerWidth,
      outsideFooter:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width && r.right>innerWidth+1 && !e.closest('footer');}).length
    }));
  }
  const calculate = () => page.locator('.calculator button:not([data-copy]):not([data-reset])').first().click();
  async function measure(route,width) {
    await page.setViewportSize({width,height:900});
    const response=await page.goto(base+route,{waitUntil:'load'});
    assert.equal(response.status(),200,route);
    const detail=await page.evaluate(()=>{
      const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};};
      return {overflow:document.documentElement.scrollWidth-innerWidth,h1:document.querySelectorAll('h1').length,
        fields:[...document.querySelectorAll('.calculator input,.calculator select')].map(box),
        result:document.querySelector('.result') && box(document.querySelector('.result')),
        offscreen:[...document.querySelectorAll('main input,main button,main table')].filter(e=>{const r=e.getBoundingClientRect();return r.width && (r.left < -1 || r.right > innerWidth+1);}).length,
        header:!!document.querySelector('header'),footer:!!document.querySelector('footer'),
        overflowElements:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width && r.right>innerWidth+1;}).map(e=>({tag:e.tagName,class:e.className,right:e.getBoundingClientRect().right,inFooter:!!e.closest('footer')})).slice(0,8)};
    });
    assert.equal(detail.h1,1);assert.ok(detail.header&&detail.footer);
    if (detail.overflow>1 || detail.offscreen) {
      await page.screenshot({path:path.join(output,`failure-${width}.png`),fullPage:true});
      console.log(JSON.stringify({output,route,width,...detail}));
    }
    const existingFooter = width===900 && detail.overflow===4 && detail.offscreen===0 && detail.overflowElements.every(e=>e.inFooter)
      && (live || baselineOverflow?.page===4 && baselineOverflow.outsideFooter===0);
    if (existingFooter) knownIssues.push({route,width,issue:'Pre-existing shared footer overflow',pixels:4,baselineRef});
    assert.ok((detail.overflow<=1 || existingFooter) && detail.offscreen===0,JSON.stringify({route,width,...detail}));
    if(route==='/tools/roll-diameter.html') {
      await calculate();
      assert.ok((await page.locator('#result').innerText()).includes('136.05 mm'));
      await page.locator('#result [data-copy]').waitFor({state:'visible'});
      await page.screenshot({path:path.join(output,`roll-${width}.png`),fullPage:true});
      await page.screenshot({path:path.join(output,`roll-viewport-${width}.png`)});
    }
    renders.push({route,width,...detail});
  }
  for(const width of widths) await measure('/tools/roll-diameter.html',width);
  // Target state, clipboard, invalid input and changed-value calculations.
  await page.reload();assert.equal(await page.locator('[data-copy]').count(),0);
  await calculate();await page.locator('#result [data-copy]').click();
  await page.getByRole('button',{name:'Copy calculation result'}).filter({hasText:'Copied'}).waitFor();
  const copied=await page.evaluate(()=>navigator.clipboard.readText());
  assert.ok(copied.includes('136.05 mm')&&copied.includes('100 m')&&!/COPY RESULT|Enter values/i.test(copied));
  for(const [id,value] of [['a','500'],['b','.08'],['c','152.4']]) await page.locator('#'+id).fill(value);
  await calculate();assert.ok((await page.locator('#result').innerText()).includes('272.31 mm'));
  for(const value of ['','0','-1','1e308']) {
    await page.locator('#a').fill(value);await calculate();
    assert.equal(await page.locator('#result [data-copy]').count(),0);
    assert.equal(await page.locator('#result .error').count(),1);
  }
  await page.locator('[data-reset]').click();
  assert.equal(await page.locator('#a').inputValue(),'100');assert.equal(await page.locator('#b').inputValue(),'0.10');assert.equal(await page.locator('#c').inputValue(),'76');
  assert.equal(await page.locator('[data-copy]').count(),0);await calculate();
  assert.ok((await page.locator('#result').innerText()).includes('136.05 mm'));
  const menu=page.locator('header button');await menu.click();
  assert.equal(await menu.getAttribute('aria-expanded'),'true');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'false');
  functions.push({target:'Roll Diameter',states:'initial, Calculate, actual clipboard, changed values, blank/zero/negative/extreme, Reset/defaults, rerun, mobile menu'});
  const controls=live ? ['paper-thickness.html','print-run-time.html','book-spine-width-calculator.html'] : [];
  if (!live) for(const file of await fs.readdir(path.join(root,'tools'))) {
    if(file.endsWith('.html') && /class="[^"]*\bcalculator\b[^"]*"/.test(await fs.readFile(path.join(root,'tools',file),'utf8'))) controls.push(file);
  }
  for(const file of controls) {
    await page.setViewportSize({width:390,height:900});await page.goto(base+'/tools/'+file);
    const initial=await page.locator('.result').innerHTML();
    await calculate();await page.locator('.result [data-copy]').waitFor({state:'visible'});
    const text=await page.locator('.result').innerText();assert.ok(text && !/NaN|Infinity|undefined/.test(text),file);
    await page.locator('.result [data-copy]').click();
    await page.getByRole('button',{name:'Copy calculation result'}).filter({hasText:'Copied'}).waitFor();
    await page.locator('[data-reset]').click();assert.equal(await page.locator('[data-copy]').count(),0);
    assert.equal(await page.locator('.result').innerHTML(),initial);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),file);
    functions.push({route:'/tools/'+file,Calculate:'PASS',Copy:'PASS',Reset:'PASS',width:390});
  }
  for(const route of ['/tools/paper-thickness.html','/tools/print-run-time.html','/tools/book-spine-width-calculator.html'])
    for(const width of [1440,390]) await measure(route,width);
  await measure('/guides/wide-format-material.html',390);
  assert.deepEqual(failures,[]);
  const report={mode:live?'live':'local',base,renders,functions,failures,knownIssues,baselineOverflow,screenshots:output};
  await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({mode:report.mode,renders:renders.length,functions:functions.length,failures,knownIssues,baselineOverflow,output}));
} finally { await browser.close();if(server)await new Promise(r=>server.close(r)); }
