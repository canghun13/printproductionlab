import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const script = fs.readFileSync('assets/js/calculators/expansion.js', 'utf8');
function calculate(inputs, type = 'rolldiameter') {
  const nodes = Object.fromEntries(['a', 'b', 'c'].map((id, i) => [id, { value: inputs[i] }]));
  nodes.result = { innerHTML: '' };
  vm.runInNewContext(script + `;run2('${type}');`, { document: { getElementById: id => nodes[id] } });
  return nodes.result.innerHTML;
}
// Independent annulus-area fixtures: L_mm * t_mm = PI/4 * (D_mm^2 - core_mm^2).
// Expected literals were calculated separately, not by the production function.
const fixtures = [
  [[100, .10, 76], '136.05'],
  [[500, .08, 152.4], '272.31'],
  [[25, .12, 50], '79.50'],
  [[.01, .001, 1], '1.01'],
];
for (const [inputs, expected] of fixtures) {
  const output = calculate(inputs);
  assert.ok(output.includes(`<strong>${expected} mm</strong>`), `${inputs}: ${output}`);
  assert.ok(!/NaN|Infinity|undefined/.test(output));
}
const invalid = [[0,.1,76],[-1,.1,76],['',.1,76],[100,0,76],[100,-.1,76],[100,'',76],[100,.1,0],[100,.1,-1],[100,.1,''],['x',.1,76],[NaN,.1,76],[Infinity,.1,76],[1e308,1e308,76]];
for (const inputs of invalid) {
  const output = calculate(inputs);
  assert.ok(output.includes('class="error"') && !output.includes('<strong>'), `${inputs}: ${output}`);
  assert.ok(!/NaN|Infinity|undefined/.test(output));
}
const page = fs.readFileSync('tools/roll-diameter.html', 'utf8');
for (const text of ['Roll length (m)', 'Total caliper (mm)', 'Core OD (mm)', '136.05 mm', 'Last reviewed: 2026-10-01', 'expansion.js?v=roll-units-20261001']) assert.ok(page.includes(text), text);
assert.deepEqual([...page.matchAll(/<input id="([abc])"/g)].map(m => m[1]), ['a','b','c']);
// Exercise every other expansion branch against the start-commit script with identical inputs.
const baseline = process.argv[2] && fs.readFileSync(process.argv[2], 'utf8');
const controls = ['thickness','ream','mweight','sheets-weight','nup','bleedsize','allowance','presssheets','signatures','saddle','bookweight','coil','pixels','scaling','safearea','rolllength','remainingroll','bannerarea','rollyield','costpiece','spoilage','runtime','profit'];
if (baseline) for (const type of controls) {
  const nodes = { a:{value:100}, b:{value:2}, c:{value:1}, result:{innerHTML:''} };
  vm.runInNewContext(baseline + `;run2('${type}');`, { document:{getElementById:id=>nodes[id]} });
  assert.equal(calculate([100,2,1],type), nodes.result.innerHTML, `unrelated ${type}`);
}
console.log(`Roll diameter QA PASS: ${fixtures.length} independent normal/decimal/boundary, ${invalid.length} invalid/extreme, unit/page contracts${baseline ? ', 23 unchanged branch controls' : ''}.`);
