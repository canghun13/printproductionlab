import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const context={window:{},document:{addEventListener(){}}};
vm.runInNewContext(fs.readFileSync('assets/js/calculators/runtime-rate.js','utf8'),context);
const {plan,render}=context.window.PPLRuntimeRate;
const fixtures=[
 [[12000,6000,4,'hour'],8,2,48000,'8.00 press hours','480.00 minutes'],
 [[12000,100,4,'minute'],8,2,48000,'8.00 press hours','480.00 minutes'],
 [[400,20,1,'minute'],1/3,1/3,400,'0.33 press hours','20.00 minutes'],
 [[12000,4000,1,'minute'],0.05,0.05,12000,'0.05 press hours','3.00 minutes'],
 [[15,7.5,3,'minute'],0.1,1/30,45,'0.10 press hours','6.00 minutes'],
 [[1,100,1,'minute'],1/6000,1/6000,1,'0.60 press seconds','0.01 minutes'],
 [[12,6000,1,'hour'],0.002,0.002,12,'7.20 press seconds','0.12 minutes'],
 [[0.000001,6000,1,'hour'],1/6000000000,1/6000000000,0.000001,'less than 0.01 press seconds','1.00e-8 minutes'],
 [[1e308,1e308,1,'hour'],1,1,1e308,'1.00 press hours','60.00 minutes'],
 [[1e308,1e308,1,'minute'],1/60,1/60,1e308,'0.02 press hours','1.00 minutes'],
];
for(const [input,total,perPass,impressions,heading,minutes]of fixtures){const p=plan(...input),out=render(p);assert.ok(Math.abs(p.total-total)<=Math.abs(total)*1e-12);assert.ok(Math.abs(p.perPass-perPass)<=Math.abs(perPass)*1e-12);assert.equal(p.totalImpressions,impressions);assert.ok(out.includes(`<strong>${heading}</strong>`));assert.ok(out.includes(minutes));assert.ok(!/NaN|Infinity|undefined|∞/.test(out));}
for(const input of [[0,20,1,'minute'],[-1,20,1,'minute'],[400,0,1,'minute'],[400,-1,1,'minute'],[400,20,0,'minute'],[400,20,1.5,'minute'],[400,20,1,''],[400,20,1,'second'],[NaN,20,1,'hour'],[Infinity,20,1,'hour'],[1e308,1e308,2,'minute'],[1e-300,1e300,1,'minute'],[1e308,1,2,'hour']])assert.throws(()=>plan(...input));
assert.ok(!/Infinity|NaN/.test(render(plan(1e308,1,1,'hour'))));
assert.match(render(plan(1e308,1,1,'hour')),/minutes outside numerical display range/);
const old=p=>execFileSync('git',['show','db3dfc5:'+p],{encoding:'utf8'}).replace(/\r/g,'');
const read=p=>fs.readFileSync(p,'utf8').replace(/\r/g,'');
for(const p of ['assets/js/main.js','assets/js/calculators/expansion.js','assets/js/calculators/calculators.js','sitemap.xml','robots.txt','llms.txt'])assert.equal(read(p),old(p),p);
const page=read('tools/print-run-time.html'),before=old('tools/print-run-time.html');
assert.equal(page.split('</head>')[0].replace('runtime-rate-20261118a','runtime-20261030a'),before.split('</head>')[0]);
assert.equal(page.split('</main>')[1].split('<script')[0],before.split('</main>')[1].split('<script')[0]);
for(const id of ['a','b','c'])assert.equal(page.match(new RegExp(`<input id="${id}"[^>]*>`))[0],before.match(new RegExp(`<input id="${id}"[^>]*>`))[0]);
console.log('RUNTIME RATE QA PASS: 10 independent expected outputs, 13 invalid inputs, large-minute range, legacy/shared calculation/SEO/Footer/input preservation.');
