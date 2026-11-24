import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';

const read=file=>fs.readFileSync(file,'utf8').replace(/\r/g,'');
const old=file=>execFileSync('git',['show','71b64ac:'+file],{encoding:'utf8'}).replace(/\r/g,'');
const file='assets/js/calculators/expansion.js', before=old(file), after=read(file);
function run(source,type,[a,b,c]){
  const fields={a:{value:a},b:{value:b},c:{value:c},result:{innerHTML:''}};
  vm.runInNewContext(source+`\nrun2(${JSON.stringify(type)});`,{document:{getElementById:id=>fields[id]}});
  return fields.result.innerHTML;
}
const sample=[700,500,120];
for(const type of ['ream','mweight'])assert.match(run(before,type,sample),/<strong>42000\.00<\/strong>/);
const fixtures=[
  [sample,'42.00','21.00'],
  [[1000,1000,100],'100.00','50.00'],
  [[210,297,80],'4.99','2.495'],
  [[100,10,10],'0.01','0.005'],
  [[215.9,279.4,90],'5.429','2.715'],
  [[1,1,0.01],'1.000e-8','5.000e-9'],
];
const malformed=[[0,500,120],[-700,500,120],['',500,120],[700,'',120],[700,500,0],[700,500,-120],[700,500,''],['not numeric',500,120],[Infinity,500,120],[1e308,1e308,120],[1e-300,1e-300,120]];
for(const [type,index,count] of [['mweight',1,'1,000'],['ream',2,'500']]){
  for(const row of fixtures){
    const output=run(after,type,row[0]);
    assert.ok(output.includes(`<strong>${row[index]} kg</strong>`),output);
    assert.ok(output.includes(`for ${count} sheets`),output);
    assert.doesNotMatch(output,/NaN|Infinity|undefined|∞/);
  }
  for(const input of malformed){
    const output=run(after,type,input);
    assert.match(output,/class="error"/);
    assert.doesNotMatch(output,/<strong>|NaN|Infinity|undefined|∞/);
  }
}
// Prove the shared module is unchanged outside the two corrected cases.
const scoped=/if\(type==='ream'\|\|type==='mweight'\)\{[^\n]+\}\n/;
assert.match(after,scoped);
assert.equal(after.replace(scoped,''),before.replace('ream:()=>a*b*c/1000,mweight:()=>a*b*c/1000,',''));
const cases=vm.runInNewContext(read('tools/verify-expanded.mjs').split(';let count=')[0]+';cases');
let controls=0;
for(const [type,rows] of Object.entries(cases))if(type!=='ream'&&type!=='mweight')for(const input of rows){
  assert.equal(run(after,type,input),run(before,type,input),type);controls++;
}
for(const page of ['tools/m-weight.html','tools/ream-weight.html']){
  const oldPage=old(page),newPage=read(page).replace('expansion.js?v=paper-mass-20261124a','expansion.js');
  assert.ok(read(page).includes('expansion.js?v=paper-mass-20261124a'));
  assert.equal(newPage.split('<section class="content-detail">')[0],oldPage.split('<section class="content-detail">')[0]);
  assert.equal(newPage.split('</main>')[1].trimEnd(),oldPage.split('</main>')[1].trimEnd());
}
for(const p of ['assets/js/main.js','assets/js/calculators/calculators.js','sitemap.xml','robots.txt','llms.txt'])assert.equal(read(p),old(p),p);
console.log(`PAPER MASS QA PASS: 12 independent results, 22 invalid/range cases, ${controls} unchanged branch controls, source/form/SEO/Footer preservation.`);
