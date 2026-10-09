import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync('tools/booklet-creep-calculator.html','utf8');
const generator=fs.readFileSync('tools/rebuild-content.mjs','utf8');
assert.deepEqual([...html.matchAll(/<input id="([a-z])"/g)].map(m=>m[1]),['a','b']);
assert.ok(!html.includes('Required positive reference'));
assert.ok(!generator.includes('The required positive reference field is a validation input'));
assert.ok(html.includes('no reference value or press allowance is required'));
const nodes={a:{value:'64'},b:{value:'.1'},result:{innerHTML:''}};
const context=vm.createContext({document:{getElementById:id=>nodes[id]||null}});
vm.runInContext(fs.readFileSync('assets/js/calculators/calculators.js','utf8'),context);
let count=0;
for(const [a,b,expected] of [['64','.1','1.50'],['64','.085','1.28'],['32','.12','0.84'],['4','.1','0.00'],['100000','1','24999.00']]){
  nodes.a.value=a;nodes.b.value=b;vm.runInContext("run('creep')",context);
  assert.equal(nodes.result.innerHTML,`<strong>${expected} mm</strong>`);count++;
}
for(const [a,b] of [['','.1'],['0','.1'],['-4','.1'],['10','.1'],['16.5','.1'],['64',''],['64','0'],['64','-.1'],['Infinity','.1'],['text','.1']]){
  nodes.a.value=a;nodes.b.value=b;vm.runInContext("run('creep')",context);
  assert.ok(nodes.result.innerHTML.includes('class="error"'));count++;
}
console.log(`BOOKLET CREEP QA PASS: 2-input contract, generator preservation, ${count} independent output/error fixtures.`);
