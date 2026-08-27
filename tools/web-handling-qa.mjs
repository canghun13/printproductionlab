import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['web-tension-force-calculator.html','winding-torque-calculator.html','taper-tension-planner.html','dancer-pressure-calculator.html','winder-acceleration-torque.html'];
const elements = new Map();
const field = (id, value) => { const element = { id, value: String(value), innerHTML: '' }; elements.set(id, element); return element; };
field('result', '');
[
  ['web-width',1000],['tension-per-width',0.2],['tension-unit','n-mm'],
  ['total-tension',200],['roll-diameter',600],['drive-efficiency',90],
  ['core-diameter',150],['full-diameter',900],['current-diameter',600],['start-tension',300],['taper-percent',40],
  ['dancer-tension',100],['web-spans',2],['web-arm',400],['cylinder-arm',200],['cylinder-bore',50],['rod-diameter',0],['cylinder-count',1],
  ['roll-mass',500],['accel-roll-diameter',800],['accel-core-diameter',150],['line-speed',200],['accel-time',10],['accel-tension',200],['accel-efficiency',90]
].forEach(([id,value]) => field(id,value));
const context = { window:{}, document:{ getElementById:id => elements.get(id) }, Number, Math, Intl, console };
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/js/calculators/web-handling.js'),'utf8'),context);
const run = name => { elements.get('result').innerHTML=''; context.window.runWebHandling(name); return elements.get('result').innerHTML; };
const expect = (condition,message) => { if(!condition) throw new Error(message); };
const set = values => Object.entries(values).forEach(([id,value]) => { elements.get(id).value=String(value); });
let fixtureCount = 0;
const valid = (label,action,values,marker) => {
  set(values); const output=run(action); fixtureCount += 1;
  expect(!output.includes('class="error"') && output.includes(marker),label);
};
const invalid = (label,action,values) => {
  set(values); fixtureCount += 1;
  expect(run(action).includes('class="error"'),label);
};

const force = (width,tension,unit='n-mm') => ({'web-width':width,'tension-per-width':tension,'tension-unit':unit});
valid('force normal 1','tensionForce',force(1000,0.2),'200 N total web tension');
valid('force normal 2','tensionForce',force(800,0.25),'200 N total web tension');
valid('force decimal imperial','tensionForce',force(25.4,10,'pli'),'44.48 N');
valid('force boundary positive','tensionForce',force(0.001,0.001),'total web tension');
invalid('force zero','tensionForce',force(0,0.2));
invalid('force negative','tensionForce',force(-100,0.2));
invalid('force blank','tensionForce',force('',0.2));
invalid('force invalid text','tensionForce',force('invalid',0.2));
invalid('force NaN','tensionForce',force('NaN',0.2));
invalid('force Infinity','tensionForce',force('Infinity',0.2));

const winding = (tension,diameter,efficiency) => ({'total-tension':tension,'roll-diameter':diameter,'drive-efficiency':efficiency});
valid('winding normal 1','windingTorque',winding(200,600,90),'60 N·m');
valid('winding normal 2','windingTorque',winding(250,600,90),'75 N·m');
valid('winding decimal','windingTorque',winding(12.5,246.9,87.5),'N·m at the roll');
valid('winding efficiency boundary','windingTorque',winding(200,600,100),'60 N·m');
invalid('winding zero','windingTorque',winding(0,600,90));
invalid('winding negative','windingTorque',winding(-1,600,90));
invalid('winding blank','windingTorque',winding('',600,90));
invalid('winding efficiency invalid','windingTorque',winding(200,600,101));
invalid('winding NaN','windingTorque',winding('NaN',600,90));
invalid('winding Infinity','windingTorque',winding('Infinity',600,90));

const taper = (core,full,current,start,percent) => ({'core-diameter':core,'full-diameter':full,'current-diameter':current,'start-tension':start,'taper-percent':percent});
valid('taper normal 1','taperTension',taper(150,900,600,300,40),'228 N');
valid('taper normal 2','taperTension',taper(150,900,450,320,30),'281.6 N');
valid('taper decimal','taperTension',taper(76.2,812.8,420.5,225.5,37.5),'N target tension');
valid('taper current-core boundary','taperTension',taper(150,900,150,300,40),'300 N');
valid('taper 100 boundary','taperTension',taper(150,900,900,300,100),'0 N');
invalid('taper zero diameter','taperTension',taper(0,900,600,300,40));
invalid('taper negative','taperTension',taper(150,900,600,-300,40));
invalid('taper blank','taperTension',taper('',900,600,300,40));
invalid('taper contradictory','taperTension',taper(150,900,1000,300,40));
invalid('taper NaN','taperTension',taper('NaN',900,600,300,40));
invalid('taper Infinity','taperTension',taper(150,'Infinity',600,300,40));

const dancer = (tension,spans,arm,cylinderArm,bore,rod,cylinders) => ({'dancer-tension':tension,'web-spans':spans,'web-arm':arm,'cylinder-arm':cylinderArm,'cylinder-bore':bore,'rod-diameter':rod,'cylinder-count':cylinders});
valid('dancer normal 1','dancerPressure',dancer(100,2,400,200,50,0,1),'203.7 kPa');
valid('dancer normal 2','dancerPressure',dancer(120,2,400,200,50,0,1),'244.5 kPa');
valid('dancer decimal','dancerPressure',dancer(87.5,2,355.6,177.8,63.5,25.4,2),'kPa cylinder pressure');
valid('dancer rod-zero boundary','dancerPressure',dancer(100,2,400,200,50,0,1),'203.7 kPa');
invalid('dancer zero','dancerPressure',dancer(0,2,400,200,50,0,1));
invalid('dancer negative','dancerPressure',dancer(-1,2,400,200,50,0,1));
invalid('dancer blank','dancerPressure',dancer('',2,400,200,50,0,1));
invalid('dancer contradictory rod','dancerPressure',dancer(100,2,400,200,50,50,1));
invalid('dancer fractional spans','dancerPressure',dancer(100,1.5,400,200,50,0,1));
invalid('dancer NaN','dancerPressure',dancer('NaN',2,400,200,50,0,1));
invalid('dancer Infinity','dancerPressure',dancer(100,2,'Infinity',200,50,0,1));

const acceleration = (mass,od,core,speed,seconds,tension,efficiency) => ({'roll-mass':mass,'accel-roll-diameter':od,'accel-core-diameter':core,'line-speed':speed,'accel-time':seconds,'accel-tension':tension,'accel-efficiency':efficiency});
valid('acceleration normal 1','accelerationTorque',acceleration(500,800,150,200,10,200,90),'127.23 N·m');
valid('acceleration normal 2','accelerationTorque',acceleration(550,800,150,200,10,200,90),'131.06 N·m');
valid('acceleration decimal','accelerationTorque',acceleration(245.5,610.2,76.2,123.4,7.5,87.6,92.5),'N·m drive torque');
valid('acceleration efficiency boundary','accelerationTorque',acceleration(500,800,150,200,10,200,100),'N·m drive torque');
invalid('acceleration zero','accelerationTorque',acceleration(0,800,150,200,10,200,90));
invalid('acceleration negative','accelerationTorque',acceleration(-1,800,150,200,10,200,90));
invalid('acceleration blank','accelerationTorque',acceleration('',800,150,200,10,200,90));
invalid('acceleration contradictory core','accelerationTorque',acceleration(500,800,800,200,10,200,90));
invalid('acceleration efficiency invalid','accelerationTorque',acceleration(500,800,150,200,10,200,101));
invalid('acceleration NaN','accelerationTorque',acceleration('NaN',800,150,200,10,200,90));
invalid('acceleration Infinity','accelerationTorque',acceleration(500,800,150,'Infinity',10,200,90));

for(const page of pages){
  const source=fs.readFileSync(path.join(root,'tools',page),'utf8');
  const ids=[...source.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  expect(ids.length===new Set(ids).size,page+' duplicate id');
  for(const marker of ['G-QMCP8M0CW6','application/ld+json','rel="canonical"','runWebHandling(','aria-live="polite"','Last reviewed: 2026-08-27']) expect(source.includes(marker),page+' missing '+marker);
}
console.log(`WEB HANDLING QA PASS: 5 calculators, ${fixtureCount} independent normal/decimal/boundary/invalid fixtures, metadata and duplicate IDs`);
