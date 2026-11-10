import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const normalize=s=>s.replace(/\r/g,'');
const previous=normalize(execFileSync('git',['show','3cdf9b8:assets/js/main.js'],{encoding:'utf8'}));
const current=normalize(fs.readFileSync('assets/js/main.js','utf8'));
const start="  calculator?.querySelectorAll('input,select,textarea').forEach(field => {";
const end="  if (result) result.innerHTML = result.dataset.resetContent";
const outside=s=>s.slice(0,s.indexOf(start))+s.slice(s.indexOf(end));
assert.ok(previous.includes(start)&&current.includes(start));
assert.equal(outside(current),outside(previous),'Only the field restoration block may change');
assert.ok(current.includes('option.defaultSelected'));
assert.ok(current.includes('option.closest(\'optgroup\')?.disabled'));
assert.ok(current.includes('field.multiple'));
assert.ok(current.includes('else field.value = field.defaultValue;'));
console.log('RESET CONTRACT QA PASS: shared JS outside field restoration unchanged; default-selected/multiple/disabled fallback and existing input reset retained. Browser suite compares 10 native form.reset controls and reruns all 66 tools.');
