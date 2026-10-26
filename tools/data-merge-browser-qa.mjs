import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import vm from 'node:vm';
import {createRequire} from 'node:module';
const {chromium}=createRequire(path.join(process.env.PPL_QA_MODULES,'ppl-qa.cjs'))('playwright-core');
vm.runInThisContext(await fs.readFile('assets/js/calculators/data-merge-core.js','utf8'));const core=globalThis.PPLDataMerge;
const live=process.argv.includes('--live'),root=process.cwd(),output=await fs.mkdtemp(path.join(os.tmpdir(),'ppl-data-merge-qa-'));
const toolNames=['data-merge-csv-preflight','cut-stack-csv-sequencer','data-merge-image-matcher','variable-text-fit-checker'];
const routes=['/tools/data-merge-production.html',...toolNames.map(s=>`/tools/${s}.html`),'/guides/data-merge-production-preflight.html'];
const server=live?null:http.createServer(async(req,res)=>{try{const u=new URL(req.url,'http://localhost'),route=decodeURIComponent(u.pathname);let f=path.resolve(root,'.'+route);if(f!==root&&!f.startsWith(root+path.sep))throw Error('Outside root');if(route.endsWith('/'))f=path.join(f,'index.html');const body=await fs.readFile(f);res.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml'}[path.extname(f)]||'application/octet-stream'});res.end(body);}catch{res.writeHead(404);res.end();}});
if(server)await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=live?'https://printproductionlab.com':`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:process.env.PPL_QA_BROWSER,headless:true});
const errors=[],renders=[],checks=[],blocked=[];
try{
 const context=await browser.newContext({viewport:{width:1280,height:1000},permissions:['clipboard-read','clipboard-write'],acceptDownloads:true});
 await context.route('**/*',r=>{const u=r.request().url();if(u.startsWith(base+'/'))return r.continue();blocked.push(u);return r.abort();});
 const page=await context.newPage();page.setDefaultTimeout(8000);
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/net::ERR_FAILED|net::ERR_BLOCKED_BY_CLIENT/.test(m.text()))errors.push(m.text());});
 page.on('response',r=>{if(r.url().startsWith(base+'/')&&r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
 const run=async()=>{await page.locator('#dm-run').click();await page.waitForFunction(()=>!document.querySelector('.result').textContent.includes('Checking local data'));};
 async function measure(route,width){
  await page.setViewportSize({width,height:1000});assert.equal((await page.goto(base+route,{waitUntil:'load'})).status(),200);if(await page.locator('[data-merge]').count())await run();
  const data=await page.evaluate(()=>{
   const rect=e=>{const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,height:r.height,width:r.width};};
   const rows=new Map();for(const label of document.querySelectorAll('.dm-fields label')){const key=Math.round(label.getBoundingClientRect().top),e=label.querySelector('input,select');if(!rows.has(key))rows.set(key,[]);rows.get(key).push(rect(e));}
   return {overflow:document.documentElement.scrollWidth-innerWidth,header:rect(document.querySelector('header')),h1:rect(document.querySelector('h1')),controlRows:[...rows.values()],offscreen:[...document.querySelectorAll('main input,main select,main textarea,main button,canvas')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.left<-.5||r.right>innerWidth+.5);}).map(e=>e.id||e.tagName),footer:!!document.querySelector('footer'),canonical:document.querySelector('link[rel=canonical]').href,copy:document.querySelectorAll('.result [data-copy]:not([hidden])').length};
  });
  assert.equal(data.overflow,0,`${route}/${width}: page overflow`);assert.deepEqual(data.offscreen,[],`${route}/${width}: offscreen control`);assert.ok(data.h1.top>=data.header.bottom-.5);assert.ok(data.footer);assert.equal(data.canonical,'https://printproductionlab.com'+route);
  if(width>768)for(const row of data.controlRows)if(row.length>1){assert.ok(Math.max(...row.map(r=>r.top))-Math.min(...row.map(r=>r.top))<.6,'control top alignment');assert.ok(Math.max(...row.map(r=>r.bottom))-Math.min(...row.map(r=>r.bottom))<.6,'control bottom alignment');}
  const name=route.split('/').at(-1).replace('.html','');await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:path.join(output,`${name}-top-${width}.png`)});
  if(await page.locator('#dm-output:not([hidden])').count()){await page.locator('#dm-output').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(output,`${name}-report-${width}.png`)});}
  if(width===1440||width===390)await page.screenshot({path:path.join(output,`${name}-full-${width}.png`),fullPage:true});
  renders.push({route,width,...data});
 }
 for(const width of [1440,1280,1024,900,768,390]){for(const route of routes)await measure(route,width);console.log(JSON.stringify({progress:'new-cluster-renders',width,count:renders.length}));}
 async function go(i){await page.goto(base+`/tools/${toolNames[i]}.html`,{waitUntil:'load'});}
 async function resetCheck(){const defaults=await page.locator('.calculator input,.calculator select,.calculator textarea').evaluateAll(nodes=>nodes.map(e=>e.value)),initial=await page.locator('.result').innerHTML();await run();await page.locator('.result [data-copy]').waitFor({state:'visible'});await page.locator('.result [data-copy]').click();await page.getByRole('button',{name:'Copy calculation result'}).filter({hasText:'Copied'}).waitFor();const clipboard=await page.evaluate(()=>navigator.clipboard.readText());assert.ok(clipboard.includes(await page.locator('.result strong').innerText()));assert.ok(!/Download issue report|Download production CSV|Enter the source/.test(clipboard));await page.locator('[data-reset]').click();await page.waitForFunction(expected=>document.querySelector('.result').innerHTML===expected,initial);assert.deepEqual(await page.locator('.calculator input,.calculator select,.calculator textarea').evaluateAll(nodes=>nodes.map(e=>e.value)),defaults);assert.equal(await page.locator('[data-copy]').count(),0);assert.equal(await page.locator('#dm-output').isVisible(),false);}
 async function downloaded(button){const event=page.waitForEvent('download');await page.getByRole('button',{name:button,exact:true}).click();const d=await event;return fs.readFile(await d.path(),'utf8');}
 for(let i=0;i<4;i++){
  await go(i);await resetCheck();
  await page.locator('#dm-delimiter').selectOption(';');await page.locator('#dm-source').fill('ID;Name;@Image\n1;Ada;photos/A.jpg');await run();assert.equal(await page.locator('.result .error').count(),0);await page.locator('[data-reset]').click();assert.equal(await page.locator('#dm-delimiter').inputValue(),'auto');
  await page.locator('#dm-source').fill('ID,Name\n1,"broken');await run();assert.match(await page.locator('.result .error').innerText(),/Unclosed/);assert.equal(await page.locator('[data-copy]').count(),0);await page.locator('[data-reset]').click();await run();assert.equal(await page.locator('.result .error').count(),0);
  checks.push({tool:toolNames[i],calculate:'PASS',clipboard:'PASS',resetDefaults:'PASS',alternateDelimiter:'PASS',malformedError:'PASS',rerun:'PASS'});
 }
 await go(0);await page.locator('#dm-file').setInputFiles({name:'names.csv',mimeType:'text/csv',buffer:Buffer.from('ID,Name\n001,Mélanie','utf8')});await run();assert.match(await page.locator('.result strong').innerText(),/^0 errors \/ 1 warnings$/);
 await page.locator('#dm-file').setInputFiles({name:'legacy.csv',mimeType:'text/csv',buffer:Buffer.from([73,68,44,78,97,109,101,10,49,44,233])});await run();assert.match(await page.locator('.result .error').innerText(),/encoding/);await page.locator('#dm-encoding').selectOption('windows-1252');await run();assert.equal(await page.locator('.result .error').count(),0);
 await page.locator('#dm-file').setInputFiles({name:'unicode.txt',mimeType:'text/plain',buffer:Buffer.from('\uFEFFID,Name\n1,김민서','utf16le')});await page.locator('#dm-encoding').selectOption('utf-16le');await run();assert.equal(await page.locator('.result .error').count(),0);
 await page.locator('[data-reset]').click();await page.locator('#dm-source').fill('ID,Name\n1,\n1,A');await run();assert.match(await page.locator('.result strong').innerText(),/^2 errors/);assert.match(await downloaded('Download issue report'),/Required value is blank/);checks.push({uploads:'UTF-8 / Windows-1252 / UTF-16LE PASS',strictDecode:'PASS',issueExport:'PASS'});
 await go(1);await run();const production=core.parse(await downloaded('Download production CSV'));assert.deepEqual(production.rows[0],['001','Ada','003','Chen']);assert.equal(production.rows.length,4);
 await page.locator('#dm-source').fill('ID,@Image\n001,=literal\n002,photos/b.jpg');await run();const prodButton=page.getByRole('button',{name:'Download production CSV',exact:true});assert.equal(await prodButton.isEnabled(),false);await page.locator('#dm-export-ack').check();const original=core.parse(await downloaded('Download production CSV'));assert.equal(original.headers[1],'@Image__C1');assert.equal(original.rows[0][1],'=literal');await page.locator('#dm-lift').fill('0');await run();assert.equal(await page.locator('.result .error').count(),1);checks.push({productionExport:'known sequence PASS',formulaGate:'PASS',losslessAtHeader:'PASS',invalidLift:'PASS'});
 await go(2);await run();assert.match(await page.locator('.result strong').innerText(),/^1 exact \/ 2 need review/);assert.match(await downloaded('Download asset report'),/CASE-ONLY/);
 const fixture=path.join(output,'job-assets');await fs.mkdir(path.join(fixture,'photos'),{recursive:true});for(const file of ['A.jpg','B.jpg','unused.jpg'])await fs.writeFile(path.join(fixture,'photos',file),'QA filename fixture; pixels are intentionally not read');
 await page.locator('#dm-assets').setInputFiles(fixture);await run();assert.match(await page.locator('.result strong').innerText(),/^1 exact \/ 2 need review/);await page.locator('#dm-image').fill('missing');await run();assert.equal(await page.locator('.result .error').count(),1);checks.push({folderFileAPI:'PASS',assetExport:'PASS',missingField:'PASS'});
 await go(3);await page.locator('#dm-font-file').setInputFiles(process.env.PPL_QA_FONT);await run();assert.match(await page.locator('.result').innerText(),/Local font loaded/);assert.equal(await page.locator('canvas').count(),1);const fontReport=core.parse(await downloaded('Download text-fit report'));assert.ok(fontReport.rows.some(r=>r.at(-1)==='FIT ESTIMATE'));
 const reportedAda=Number(fontReport.rows.find(r=>r[1]==='Ada')[3]);
 const independentDOMWidth=await page.evaluate(()=>{const face=[...document.fonts].find(f=>f.family.startsWith('DMPreview'));const s=document.createElement('span');s.textContent='Ada';s.style.cssText='position:absolute;white-space:pre;font-size:12pt;font-weight:400;letter-spacing:normal;';s.style.fontFamily='"'+face.family+'"';document.body.append(s);const pt=s.getBoundingClientRect().width*72/96;s.remove();return pt;});
 assert.ok(Math.abs(reportedAda-independentDOMWidth)<.05,`physical pt metric: report ${reportedAda}, independent DOM ${independentDOMWidth}`);checks.push({realFontWidthVersusDOMPt:'PASS',tolerancePt:0.05});
 await page.locator('#dm-source').fill('ID,Name\n001,"<img src=x onerror=alert(1)>"\n002,김민서');await page.locator('#dm-width').fill('8');await page.locator('#dm-height').fill('4');await run();assert.match(await page.locator('.result strong').innerText(),/overflow estimates/);assert.equal(await page.locator('main img').count(),0);assert.match(await downloaded('Download text-fit report'),/김민서/);
 await page.locator('#dm-padding').fill('10');await run();assert.equal(await page.locator('.result .error').count(),1);await page.locator('[data-reset]').click();await page.locator('#dm-size').fill('');await run();assert.match(await page.locator('.result .error').innerText(),/blank is not zero/);checks.push({realLocalFont:'PASS',Unicode:'PASS',noHTMLInjection:'PASS',invalidInset:'PASS',blankNumeric:'PASS'});
 await page.setViewportSize({width:390,height:900});await page.goto(base+'/tools/data-merge-production.html');for(const i of [0,1,2,3]){await page.locator(`main a[href="/tools/${toolNames[i]}.html"]`).click();assert.equal(await page.locator('[data-merge]').count(),1);await page.goBack({waitUntil:'load'});}
 const menu=page.locator('header button');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'false');
 await page.getByRole('link',{name:'Data Merge Production Preflight Guide',exact:true}).click();assert.match(await page.locator('h1').innerText(),/Data Merge Production Preflight/);checks.push({hubLinks:4,guideLink:'PASS',mobileMenu:'PASS'});
 assert.deepEqual(errors,[]);const report={mode:live?'live':'local',renders,checks,errors,analyticsBlocked:true,blockedRequestCount:blocked.length,output};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({...report,renders:renders.length}));
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
