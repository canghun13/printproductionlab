import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';

// Reuse installed Chrome and bundled Playwright; never install or send QA to GA4.
const {chromium}=createRequire(path.join(process.env.PPL_QA_MODULES,'ppl-qa.cjs'))('playwright-core');
const root=process.cwd(), live=process.argv.includes('--live'), reproduce=process.argv.includes('--reproduce');
const baselineRef=process.argv.find(x=>x.startsWith('--baseline='))?.slice(11)||'39a130a';
const stylesheet='assets/css/layout-refinement.css';
const originalCSS=execFileSync('git',['show',`${baselineRef}:${stylesheet}`],{encoding:'utf8'});
const walk=async dir=>(await Promise.all((await fs.readdir(dir,{withFileTypes:true})).filter(e=>!['.git','.agents','.codex'].includes(e.name)).map(async e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]))).flat();
const files=(await walk(root)).filter(f=>f.endsWith('.html')).sort();
const routes=files.map(f=>'/'+path.relative(root,f).replaceAll('\\','/').replace(/index\.html$/,''));
const boundaryOnly=process.argv.includes('--boundaries');
const widths=boundaryOnly?[769,800,931,932,935,936]:[1440,1280,1024,900,768,390];
const output=await fs.mkdtemp(path.join(os.tmpdir(),'ppl-footer-qa-'));
const server=live?null:http.createServer(async(req,res)=>{
  try{
    const route=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=path.resolve(root,'.'+route);
    if(file!==root&&!file.startsWith(root+path.sep))throw Error('Outside root');
    if(route.endsWith('/'))file=path.join(file,'index.html');
    const body=await fs.readFile(file);
    res.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.ico':'image/x-icon'}[path.extname(file)]||'application/octet-stream'});res.end(body);
  }catch{res.writeHead(404);res.end();}
});
if(server)await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=live?'https://printproductionlab.com':`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:process.env.PPL_QA_BROWSER,headless:true});
let baselineMode=false;
const errors=[],renders=[],functions=[],baseline=[],unchanged=[],visuals=[];
try{
  const context=await browser.newContext({viewport:{width:900,height:900},permissions:['clipboard-read','clipboard-write']});
  await context.route('**/*',r=>{
    const url=r.request().url();
    if(!url.startsWith(base+'/'))return r.abort();
    if(baselineMode&&new URL(url).pathname==='/'+stylesheet)return r.fulfill({contentType:'text/css',body:originalCSS});
    return r.continue();
  });
  const page=await context.newPage();page.setDefaultTimeout(7000);
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&!/net::ERR_FAILED|net::ERR_BLOCKED_BY_CLIENT|404 \(Not Found\)/.test(m.text()))errors.push(m.text());});
  page.on('response',r=>{if(r.url().startsWith(base+'/')&&r.status()>=400&&!r.url().endsWith('/404.html'))errors.push(`${r.status()} ${r.url()}`);});
  // Independent browser-native form.reset() oracle for delegated field reset.
  await page.setContent(`<section class="calculator"><form>
    <select id="implicit"><option>A</option><option>B</option></select>
    <select id="explicit"><option>A</option><option selected>B</option></select>
    <select id="disabled"><option disabled>A</option><optgroup disabled><option>B</option></optgroup><option>C</option></select>
    <select id="empty"></select>
    <select id="multi" multiple><option selected>A</option><option>B</option><option selected>C</option></select>
    <select id="multi-empty" multiple><option>A</option><option>B</option></select>
    <select id="listbox" size="3"><option>A</option><option>B</option></select>
    <select id="last"><option selected>A</option><option selected>B</option></select>
    <input id="input" value="12"><textarea id="text">original</textarea>
    <button type="button" data-reset>Reset</button></form><div class="result">Initial</div></section><script>${await fs.readFile(path.join(root,'assets/js/main.js'),'utf8')}</script>`);
  const resetOracle=await page.evaluate(()=>{
    const fields=[...document.querySelectorAll('select,input,textarea')];
    const state=()=>fields.map(e=>({id:e.id,value:e.value,selected:e.tagName==='SELECT'?[...e.options].map(o=>o.selected):null}));
    const mutate=()=>fields.forEach(e=>{if(e.tagName==='SELECT'){for(const o of e.options)o.selected=false;if(e.options.length)e.options[e.options.length-1].selected=true;}else e.value='changed';});
    mutate();document.querySelector('form').reset();const expected=state();
    mutate();document.querySelector('[data-reset]').click();return{expected,actual:state()};
  });
  assert.deepEqual(resetOracle.actual,resetOracle.expected,'Reset must match native form.reset selectedness/defaults');
  async function measure(route,width){
    await page.setViewportSize({width,height:900});
    const response=await page.goto(base+route,{waitUntil:'load'});
    // The explicit /404.html file is a normal 200 page; unknown routes return 404.
    assert.equal(response.status(),200,route);
    const measurement=await page.evaluate(()=>{
      const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
      const footer=document.querySelector('footer'),inner=footer.querySelector('.footer-inner');
      const outside=[...footer.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.left<-.5||r.right>innerWidth+.5);});
      const links=[...footer.querySelectorAll('a')].map(e=>({text:e.innerText,...box(e)}));
      const controls=[...document.querySelectorAll('main input,main select,main button')].map(box);
      return {overflow:document.documentElement.scrollWidth-innerWidth,footerOverflow:outside.map(e=>({tag:e.tagName,text:e.textContent.slice(0,80),...box(e)})),footer:box(footer),columns:getComputedStyle(inner).gridTemplateColumns,links,controls,header:box(document.querySelector('header')),h1:box(document.querySelector('h1')),main:box(document.querySelector('main')),tail:footer.outerHTML+(footer.nextElementSibling?.outerHTML||'')};
    });return {route,width,...measurement};
  }
  baselineMode=true;
  for(const width of [769,800,900,931,932,935,936,1024,768,390]){
    const b=await measure('/tools/booklet-creep-calculator.html',width);baseline.push(b);
    if([769,900].includes(width)){await page.locator('footer').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(output,`before-${width}.png`)});}
  }
  assert.equal(baseline.find(r=>r.width===900).overflow,4,'Reproduction must expose original 4px overflow');
  if(!reproduce){
    baselineMode=false;
    for(const b of baseline){
      const a=await measure(b.route,b.width);
      assert.equal(a.overflow,0,`Target overflow ${b.width}`);assert.equal(a.footerOverflow.length,0,`Footer overflow ${b.width}`);
      assert.equal(a.tail,b.tail,'Footer and owner-managed following markup must be unchanged');
      for(const key of ['header','h1','main','controls'])assert.deepEqual(a[key],b[key],`No unrelated layout shift ${key}/${b.width}`);
      if(b.width<=768||b.width>=936){assert.deepEqual(a.footer,b.footer,`Preserve unaffected footer ${b.width}`);assert.equal(a.columns,b.columns);unchanged.push(b.width);}
    }
    for(const width of widths){
      for(const route of routes){
        const a=await measure(route,width);
        assert.equal(a.overflow,0,`${route}/${width}: page overflow`);
        assert.equal(a.footerOverflow.length,0,`${route}/${width}: footer clipping`);
        assert.ok(a.h1.y>=a.header.bottom-.5,`${route}/${width}: header/H1 overlap`);
        for(const control of a.controls)if(control.width)assert.ok(control.x>=-.5&&control.right<=width+.5,`${route}/${width}: offscreen control`);
        for(const link of a.links)assert.ok(link.height>0&&link.width>0,`${route}: footer link hidden`);
        const {tail,...record}=a;renders.push(record);
      }
      // Capture actual footer and page-top views, not just document scrollWidth.
      for(const route of ['/','/tools/booklet-creep-calculator.html','/tools/smart-label-production.html']){
        await measure(route,width);const name=route==='/'?'home':route.split('/').at(-1).replace('.html','');
        await page.screenshot({path:path.join(output,`${name}-top-${width}.png`)});
        await page.locator('footer').scrollIntoViewIfNeeded();
        const screenshot=path.join(output,`${name}-footer-${width}.png`);await page.screenshot({path:screenshot});visuals.push(screenshot);
      }
      console.log(JSON.stringify({progress:'renders',width,completed:renders.length}));
    }
    const paperMass=[];
    if(!boundaryOnly)for(const [slug,mass,count,defaultMass] of [['m-weight','42.00 kg','1,000','0.01 kg'],['ream-weight','21.00 kg','500','0.005 kg']])for(const width of widths){
      const route=`/tools/${slug}.html`;
      await measure(route,width);
      const result=page.locator('.result'),initial=await result.innerHTML();
      const run=()=>page.locator('.calculator button:not([data-reset]):not([data-copy])').first().click();
      assert.equal(await page.locator('[data-copy]').count(),0);
      for(const [id,value] of [['a','700'],['b','500'],['c','120']])await page.locator('#'+id).fill(value);
      await run();
      assert.equal(await result.locator('strong').innerText(),mass);
      assert.ok((await result.innerText()).includes(`for ${count} sheets`));
      await result.locator('[data-copy]').click();
      await page.getByRole('button',{name:'Copy calculation result'}).filter({hasText:'Copied'}).waitFor();
      const copied=await page.evaluate(()=>navigator.clipboard.readText());
      assert.ok(copied.includes(mass)&&copied.includes(`for ${count} sheets`));
      assert.ok(!copied.includes('42000')&&!copied.includes('Copied'));
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0);
      const screenshot=path.join(output,`${slug}-mass-${width}.png`);
      await page.locator('.calculator').screenshot({path:screenshot});visuals.push(screenshot);
      await page.locator('#a').fill('0');await run();
      assert.equal(await result.locator('.error').count(),1);
      assert.equal(await page.locator('[data-copy]').count(),0);
      await page.locator('[data-reset]').click();
      assert.equal(await result.innerHTML(),initial);
      assert.deepEqual(await page.locator('.calculator input').evaluateAll(es=>es.map(e=>e.value)),['100','10','10']);
      await run();assert.equal(await result.locator('strong').innerText(),defaultMass);
      paperMass.push({route,width,mass,count,defaultMass,clipboard:'PASS',error:'PASS',resetRerun:'PASS'});
    }
    if(!boundaryOnly)console.log(JSON.stringify({paperMass:paperMass.length,output}));
    for(const route of boundaryOnly?[]:routes){
      await measure(route,390);
      if(!await page.locator('.calculator').count())continue;
      const result=page.locator('.result').first(),initial=await result.innerHTML();
      const fields=()=>page.locator('.calculator input,.calculator select,.calculator textarea').evaluateAll(es=>es.map(e=>({id:e.id,value:e.value})));
      const defaults=await fields();
      assert.equal(await page.locator('[data-copy]').count(),0,`${route}: initial copy`);
      await page.locator('.calculator button:not([data-copy]):not([data-reset])').first().click();
      await result.locator('[data-copy]').waitFor({state:'visible'});
      assert.ok(!/NaN|Infinity|undefined/.test(await result.innerText()),route);
      await result.locator('[data-copy]').click();
      await page.getByRole('button',{name:'Copy calculation result'}).filter({hasText:'Copied'}).waitFor();
      const copied=await page.evaluate(()=>navigator.clipboard.readText());assert.ok(copied.trim().length>0);
      // A cleared result alone is not a successful Reset: mutate every select,
      // restore actual initial field values, then prove a second calculation works.
      await page.locator('.calculator select').evaluateAll(es=>es.forEach(e=>{if(e.options.length>1){e.selectedIndex=(e.selectedIndex+1)%e.options.length;e.dispatchEvent(new Event('change',{bubbles:true}));}}));
      await page.locator('[data-reset]').click();assert.equal(await result.innerHTML(),initial,`${route}: reset`);
      assert.deepEqual(await fields(),defaults,`${route}: reset field values`);
      assert.equal(await page.locator('[data-copy]').count(),0,`${route}: reset copy`);
      await page.locator('.calculator button:not([data-copy]):not([data-reset])').first().click();
      await result.locator('[data-copy]').waitFor({state:'visible'});
      assert.ok(!/NaN|Infinity|undefined/.test(await result.innerText()),`${route}: rerun`);
      await result.locator('[data-copy]').click();
      await page.getByRole('button',{name:'Copy calculation result'}).filter({hasText:'Copied'}).waitFor();
      assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),copied,`${route}: rerun clipboard`);
      functions.push({route,calculate:'PASS',copy:'PASS',reset:'PASS',fieldDefaults:'PASS',rerun:'PASS'});
    }
    await measure('/tools/booklet-creep-calculator.html',390);
    const menu=page.locator('header button');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'false');
    await page.locator('#a').fill('0');await page.locator("button[onclick=\"run('creep')\"]").click();assert.equal(await page.locator('.result .error').count(),1);assert.equal(await page.locator('[data-copy]').count(),0);
    await page.locator('[data-reset]').click();await page.locator("button[onclick=\"run('creep')\"]").click();assert.equal(await page.locator('.result strong').innerText(),'1.50 mm');
    assert.equal(functions.length,boundaryOnly?0:66);assert.deepEqual(errors,[]);
  }
  const report={mode:live?'live':'local',reproduce,resetOracle,baseline,renders,functions,errors,unchanged,visuals,output};
  await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({mode:report.mode,reproduce,baseline:baseline.map(r=>({width:r.width,overflow:r.overflow,columns:r.columns})),renders:renders.length,functions:functions.length,errors,unchanged,output}));
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
