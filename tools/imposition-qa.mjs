import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const baseline='658a1574d59558cfb8c642a4db8a09b4a6371351';
const read=p=>fs.readFileSync(p,'utf8'),old=p=>execFileSync('git',['show',`${baseline}:${p}`],{encoding:'utf8'}),normalize=s=>s.replace(/\r/g,'');
const context=vm.createContext({});vm.runInContext(read('assets/js/calculators/imposition.js'),context);const {plan,render}=context.PPLImposition;
const near=(a,b)=>assert.ok(Math.abs(a-b)<=Math.max(1e-9,Math.abs(b)*1e-12),`${a} != ${b}`);
// Literal counts/areas derived separately by hand, not by the production plan().
const normal=[
 {input:[700,500,3,90,50,12,10],count:56,other:48,name:'Normal',grid:[7,8],parent:350000,allocated:301056,trim:252000,unused:48944,percent:13.984},
 {input:[500,700,0,100,200,0,0],count:15,other:14,name:'Normal',grid:[5,3],parent:350000,allocated:300000,trim:300000,unused:50000,percent:14.285714285714286},
 {input:[100,200,0,60,40,0,0],count:6,other:5,name:'Rotated',grid:[2,3],parent:20000,allocated:14400,trim:14400,unused:5600,percent:28},
 {input:[96,56,3,90,50,0,0],count:1,other:0,name:'Normal',grid:[1,1],parent:5376,allocated:5376,trim:4500,unused:0,percent:0},
 {input:[700,500,3,90,50,12,50],count:40,other:36,name:'Rotated',grid:[10,4],parent:350000,allocated:215040,trim:180000,unused:134960,percent:38.56},
 {input:[100,100,0,20,20,0,0],count:25,other:25,name:'Normal',grid:[5,5],parent:10000,allocated:10000,trim:10000,unused:0,percent:0},
 {input:[70,50,.3,9,5,1.2,1],count:56,other:48,name:'Normal',grid:[7,8],parent:3500,allocated:3010.56,trim:2520,unused:489.44,percent:13.984},
];
for(const f of normal){const p=plan(f.input),b=p.best;assert.equal(b.total,f.count);assert.equal(b.name,f.name);assert.equal(b.across,f.grid[0]);assert.equal(b.down,f.grid[1]);assert.equal(Math.min(p.normal.total,p.rotated.total),f.other);near(p.parentArea,f.parent);near(b.allocated,f.allocated);near(b.trimArea,f.trim);near(b.unused,f.unused);near(b.unusedPercent,f.percent);assert.ok(!/NaN|Infinity|undefined|∞/.test(render(p)));}
const inches=plan([27.559055118110237,19.68503937007874,.11811023622047245,3.543307086614173,1.968503937007874,.4724409448818898,.3937007874015748]);assert.equal(inches.best.total,56);near(inches.best.unusedPercent,13.984);near(inches.best.trimPercent,72);
const defaults=[700,500,3,90,50,12,10],bad=[[],[700],null];
for(const [i,values]of [[0,[0,-1,NaN,Infinity,undefined]],[1,[0,-500]],[2,[-1,NaN]],[3,[0,-1]],[4,[0,-1]],[5,[-1]],[6,[-1,400]]])for(const v of values){const f=[...defaults];f[i]=v;bad.push(f);}
bad.push([100,100,0,200,200,0,0],[1e308,1e308,0,1,1,0,0],[1e-300,1e-300,0,1e-301,1e-301,0,0],[1000,1000,0,1e-10,1e-10,0,0]);
for(const f of bad)assert.throws(()=>plan(f));
const diagram=render(plan(defaults));assert.match(diagram,/viewBox="0 0 700 500"/);assert.match(diagram,/class="imposition-bleed" x="10" y="10" width="96" height="56"/);assert.match(diagram,/class="imposition-trim" x="13" y="13" width="90" height="50"/);assert.match(diagram,/class="imposition-gripper" x="10" y="478" width="680" height="12"/);assert.equal((diagram.match(/class="imposition-trim"/g)||[]).length,56);assert.match(diagram,/Normal\s*<\/th> <td>7 × 8<\/td> <td>56/);
const bounded=render(plan([1000,1000,0,1,1,0,0]));assert.match(bounded,/1,000,000 items/);assert.match(bounded,/Individual pieces are not drawn/);assert.ok(!bounded.includes('class="imposition-trim"'));assert.ok(bounded.length<10000);
const file='tools/print-imposition-calculator.html',current=normalize(read(file)),previous=normalize(old(file));
const section=(s,re)=>{const m=s.match(re);assert.ok(m);return m[0];};
assert.equal(section(current,/<head>[\s\S]*?<\/head>/).replace('<link rel="stylesheet" href="../assets/css/imposition-layout.css?v=imposition-20261104a">',''),section(previous,/<head>[\s\S]*?<\/head>/));
for(const re of [/<header[\s\S]*?<\/header>/,/<footer[\s\S]*?<\/footer>/,/<h1>[\s\S]*?<\/h1>/])assert.equal(section(current,re),section(previous,re));
for(const id of ['a','b','c','d','e','f'])assert.equal(section(current,new RegExp(`<input id="${id}"[^>]*>`)),section(previous,new RegExp(`<input id="${id}"[^>]*>`)).replace(id==='c'?'min=".01"':'NO_REPLACEMENT',id==='c'?'min="0"':'NO_REPLACEMENT'));
// Preserve the historical delivery scope without blocking future, unrelated releases.
const delivered='5e5c6dc1369ee155df32d6685732e3178961ac2d';
for(const p of ['assets/js/main.js','assets/js/calculators/calculators.js','assets/js/calculators/expansion.js','index.html','sitemap.xml','robots.txt','llms.txt','tools/rebuild-content.mjs'])assert.equal(normalize(execFileSync('git',['show',`${delivered}:${p}`],{encoding:'utf8'})),normalize(old(p)),`Imposition delivery changed unrelated source: ${p}`);
const changes=execFileSync('git',['diff','--name-only',baseline,delivered],{encoding:'utf8'}).trim().split(/\r?\n/).filter(p=>p.endsWith('.html'));assert.deepEqual(changes,[file]);
assert.ok(current.includes('imposition.js?v=imposition-20261104a'));assert.ok(!current.includes('data-copy'));
console.log(`IMPOSITION QA PASS: 8 independent geometry/area/unit-basis fixtures, ${bad.length} invalid/range cases, scaled SVG and bounded-render checks; metadata/Header/Footer/IDs/defaults and shared assets preserved.`);
