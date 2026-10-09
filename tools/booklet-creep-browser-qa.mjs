import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

// Use existing dependencies and installed Chrome; do not install packages/browsers.
const { chromium } = createRequire(path.join(process.env.PPL_QA_MODULES, 'ppl-qa.cjs'))('playwright-core');
const live = process.argv.includes('--live');
const reproduce = process.argv.includes('--reproduce');
const baselineRef = process.argv.find(x=>x.startsWith('--baseline='))?.slice(11) || 'HEAD';
const root = process.cwd();
const target = '/tools/booklet-creep-calculator.html';
const baseline = execFileSync('git',['show',baselineRef+':'+target.slice(1)],{encoding:'utf8'});
const output = await fs.mkdtemp(path.join(os.tmpdir(),'ppl-creep-qa-'));
const server = live ? null : http.createServer(async(req,res)=>{
  try {
    const route = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file = path.resolve(root,'.'+route);
    if (!file.startsWith(root+path.sep)) throw new Error('Outside root');
    if (route.endsWith('/')) file=path.join(file,'index.html');
    const body = route==='/tools/__creep-baseline.html' ? baseline : await fs.readFile(file);
    res.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml'}[path.extname(file)]||'application/octet-stream'});res.end(body);
  } catch {res.writeHead(404);res.end();}
});
if(server) await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=live?'https://printproductionlab.com':`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:process.env.PPL_QA_BROWSER,headless:true});
const errors=[],renders=[],fixtures=[],knownIssues=[];
try {
  const context=await browser.newContext({viewport:{width:1280,height:900},permissions:['clipboard-read','clipboard-write']});
  // Never record automated QA as GA4 traffic; leave owner-managed badges untouched.
  await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  const page=await context.newPage();page.setDefaultTimeout(7000);
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&!/net::ERR_FAILED|net::ERR_BLOCKED_BY_CLIENT/.test(m.text()))errors.push(m.text());});
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  const calculate=()=>page.locator("button[onclick=\"run('creep')\"]").click();
  async function measure(route,width){
    await page.setViewportSize({width,height:900});
    const response=await page.goto(base+route,{waitUntil:'load'});assert.equal(response.status(),200);
    const boxes=await page.evaluate(()=>{
      const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};};
      return {overflow:document.documentElement.scrollWidth-innerWidth,
        inputs:[...document.querySelectorAll('.calculator input')].map(box),
        labels:[...document.querySelectorAll('.calculator label')].map(e=>({text:e.textContent,...box(e)})),
        buttons:[...document.querySelectorAll('.calculator button')].map(e=>({text:e.textContent,...box(e)})),
        result:document.querySelector('.result')&&box(document.querySelector('.result')),
        offscreen:[...document.querySelectorAll('main input,main button')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.left<0||r.right>innerWidth+1);}).length,
        outsideFooter:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+1&&!e.closest('footer');}).length};
    });return {route,width,...boxes};
  }
  const before=live?null:await measure('/tools/__creep-baseline.html',900);
  if(reproduce){
    await page.goto(base+target);const observations=[];
    for(const value of ['1','','0','-10','10000']){
      await page.locator('#c').fill(value);await calculate();observations.push({reference:value,result:await page.locator('#result strong').innerText()});
    }
    await page.screenshot({path:path.join(output,'before-1280.png')});
    console.log(JSON.stringify({output,before,observations}));
  }else{
    for(const width of [1440,1280,1024,900,768,390]){
      const render=await measure(target,width);assert.equal(render.inputs.length,2);
      assert.equal(render.offscreen,0);assert.equal(render.outsideFooter,0);
      if(width>768)assert.ok(Math.abs(render.inputs[0].top-render.inputs[1].top)<1);
      if(render.overflow>1){
        assert.equal(width,900);assert.equal(render.overflow,4);
        if(before)assert.equal(before.overflow,4);
        knownIssues.push({width,issue:'Pre-existing footer overflow',pixels:4});
      }
      await calculate();assert.equal(await page.locator('#result strong').innerText(),'1.50 mm');
      await page.locator('#result [data-copy]').waitFor({state:'visible'});
      await page.screenshot({path:path.join(output,`creep-${width}.png`)});
      if(width===1440||width===390)await page.screenshot({path:path.join(output,`creep-full-${width}.png`),fullPage:true});
      renders.push(render);
    }
    for(const [pages,caliper,expected] of [['64','.1','1.50 mm'],['64','.085','1.28 mm'],['32','.12','0.84 mm'],['4','.1','0.00 mm'],['100000','1','24999.00 mm']]){
      await page.locator('#a').fill(pages);await page.locator('#b').fill(caliper);await calculate();
      assert.equal(await page.locator('#result strong').innerText(),expected);fixtures.push({pages,caliper,expected});
    }
    await page.locator('#result [data-copy]').click();
    await page.getByRole('button',{name:'Copy calculation result'}).filter({hasText:'Copied'}).waitFor();
    const copied=await page.evaluate(()=>navigator.clipboard.readText());assert.ok(copied.includes('24999.00 mm')&&!/Copy result|Enter values/i.test(copied));
    for(const [a,b] of [['','.1'],['0','.1'],['-4','.1'],['10','.1'],['16.5','.1'],['64',''],['64','0'],['64','-.1'],['1e309','.1']]){
      await page.locator('#a').fill(a);await page.locator('#b').fill(b);await calculate();
      assert.equal(await page.locator('#result .error').count(),1);assert.equal(await page.locator('[data-copy]').count(),0);fixtures.push({a,b,error:true});
    }
    await page.locator('[data-reset]').click();assert.equal(await page.locator('#a').inputValue(),'64');assert.equal(await page.locator('#b').inputValue(),'0.1');
    assert.equal(await page.locator('#result').innerText(),'Enter values, then calculate.');assert.equal(await page.locator('[data-copy]').count(),0);
    await calculate();assert.equal(await page.locator('#result strong').innerText(),'1.50 mm');
    const menu=page.locator('header button');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'false');
    for(const route of ['/tools/roll-diameter.html','/tools/book-spine-width-calculator.html','/tools/booklet-page-order-calculator.html','/guides/booklet-creep.html']){
      for(const width of [1440,390]){
        const render=await measure(route,width);assert.ok(render.overflow<=1);assert.equal(render.offscreen,0);renders.push(render);
      }
      if(route.startsWith('/tools/')){
        const initial=await page.locator('.result').innerHTML();
        await page.locator('.calculator button:not([data-copy]):not([data-reset])').first().click();
        await page.locator('.result [data-copy]').waitFor({state:'visible'});
        assert.ok(!/NaN|Infinity|undefined/.test(await page.locator('.result').innerText()));
        await page.locator('.result [data-copy]').click();
        await page.getByRole('button',{name:'Copy calculation result'}).filter({hasText:'Copied'}).waitFor();
        await page.locator('[data-reset]').click();assert.equal(await page.locator('.result').innerHTML(),initial);
      }
    }
    assert.deepEqual(errors,[]);
    const report={mode:live?'live':'local',renders,fixtures,errors,knownIssues,before,clipboard:copied,reset:'PASS',menu:'PASS',output};
    await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));
    console.log(JSON.stringify({mode:report.mode,renders:renders.length,fixtures:fixtures.length,errors,knownIssues,output}));
  }
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
