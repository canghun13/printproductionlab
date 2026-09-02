import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { TextEncoder } from 'node:util';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['sgtin-96-epc-encoder.html','nfc-ndef-memory-estimator.html','rfid-label-pitch-drift-checker.html','rfid-encode-position-converter.html','rfid-encoding-throughput-planner.html'];
const elements = new Map();
const field = (id, value) => { const element = { id, value: String(value), innerHTML: '' }; elements.set(id, element); return element; };
field('result', '');
[
  ['epc-mode','encode'],['gtin','00614141123452'],['company-prefix-digits',7],['serial','100000001'],['filter-value',1],['epc-hex','3034257BF40C0E4005F5E101'],
  ['ndef-kind','uri'],['ndef-content','https://www.example.com/job/123'],['ndef-language','en'],['tag-capacity',144],
  ['label-pitch',50],['inlay-pitch',50.01],['start-offset',0],['alignment-window',1],['run-labels',100],
  ['inlay-position',25.4],['printer-dpi',300],['position-label-pitch',50.8],
  ['good-labels',10000],['encode-speed',60],['first-pass-yield',98],['retry-success',80],['retry-delay',0.5],['max-attempts',3]
].forEach(([id,value]) => field(id,value));
const context = { window:{}, document:{ getElementById:id => elements.get(id), addEventListener:() => {} }, Number, Math, Intl, BigInt, TextEncoder, console };
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/js/calculators/smart-label.js'),'utf8'),context);
const run = name => { elements.get('result').innerHTML=''; context.window.runSmartLabel(name); return elements.get('result').innerHTML; };
const set = values => Object.entries(values).forEach(([id,value]) => { elements.get(id).value=String(value); });
const expect = (condition,message) => { if(!condition) throw new Error(message); };
let fixtureCount = 0;
const valid = (label,action,values,marker) => { set(values); const output=run(action); fixtureCount += 1; expect(!output.includes('class="error"') && output.includes(marker),`${label}: ${output}`); };
const invalid = (label,action,values) => { set(values); fixtureCount += 1; expect(run(action).includes('class="error"'),label); };

valid('EPC GS1 canonical vector','epc',{'epc-mode':'encode','gtin':'00614141123452','company-prefix-digits':7,'serial':'100000001','filter-value':1},'3034257BF40C0E4005F5E101');
valid('EPC second vector','epc',{'epc-mode':'encode','gtin':'10614141123459','company-prefix-digits':7,'serial':'0','filter-value':0},'urn:epc:tag:sgtin-96');
valid('EPC decode vector','epc',{'epc-mode':'decode','epc-hex':'3034257BF40C0E4005F5E101'},'GTIN 00614141123452');
invalid('EPC bad check digit','epc',{'epc-mode':'encode','gtin':'00614141123451'});
invalid('EPC leading zero serial','epc',{'epc-mode':'encode','gtin':'00614141123452','serial':'001'});
invalid('EPC serial overflow','epc',{'epc-mode':'encode','serial':'274877906944'});
invalid('EPC blank','epc',{'epc-mode':'encode','gtin':''});
invalid('EPC invalid hex','epc',{'epc-mode':'decode','epc-hex':'XYZ'});

valid('NDEF compressed URI','ndef',{'ndef-kind':'uri','ndef-content':'https://www.example.com/job/123','tag-capacity':144},'bytes remain');
valid('NDEF text Unicode','ndef',{'ndef-kind':'text','ndef-content':'Press 승인','ndef-language':'ko','tag-capacity':144},'TEXT NDEF record');
valid('NDEF exact small capacity','ndef',{'ndef-kind':'uri','ndef-content':'https://a.co','tag-capacity':48},'bytes required');
valid('NDEF over capacity','ndef',{'ndef-kind':'text','ndef-content':'x'.repeat(200),'ndef-language':'en','tag-capacity':48},'over capacity');
invalid('NDEF blank','ndef',{'ndef-kind':'uri','ndef-content':''});
invalid('NDEF zero capacity','ndef',{'ndef-kind':'uri','ndef-content':'https://a.co','tag-capacity':0});
invalid('NDEF invalid language','ndef',{'ndef-kind':'text','ndef-content':'test','ndef-language':'1'});

valid('pitch matched','pitch',{'label-pitch':50,'inlay-pitch':50,'start-offset':0,'alignment-window':1,'run-labels':1000},'all 1,000 labels remain');
valid('pitch drift boundary','pitch',{'label-pitch':50,'inlay-pitch':50.01,'start-offset':0,'alignment-window':1,'run-labels':101},'all 101 labels remain');
valid('pitch first failure','pitch',{'label-pitch':50,'inlay-pitch':50.01,'start-offset':0,'alignment-window':1,'run-labels':102},'first out-of-window label: 102');
valid('pitch negative drift','pitch',{'label-pitch':50,'inlay-pitch':49.98,'start-offset':0.5,'alignment-window':1,'run-labels':100},'first out-of-window label');
invalid('pitch zero','pitch',{'label-pitch':0});
invalid('pitch fractional count','pitch',{'label-pitch':50,'run-labels':10.5});
invalid('pitch blank','pitch',{'label-pitch':''});

valid('position 300 dpi exact','position',{'inlay-position':25.4,'printer-dpi':300,'position-label-pitch':50.8},'300 dots');
valid('position 203 dpi decimal','position',{'inlay-position':12.7,'printer-dpi':203,'position-label-pitch':25.4},'dots');
valid('position zero boundary','position',{'inlay-position':0,'printer-dpi':300,'position-label-pitch':50},'0 dots');
invalid('position outside pitch','position',{'inlay-position':51,'printer-dpi':300,'position-label-pitch':50});
invalid('position negative','position',{'inlay-position':-1});
invalid('position blank','position',{'inlay-position':''});

valid('throughput normal','throughput',{'good-labels':10000,'encode-speed':60,'first-pass-yield':98,'retry-success':80,'retry-delay':0.5,'max-attempts':3},'Start 10,009 tags');
valid('throughput perfect boundary','throughput',{'good-labels':1000,'encode-speed':50,'first-pass-yield':100,'retry-success':0,'retry-delay':0,'max-attempts':1},'Start 1,000 tags');
valid('throughput decimal rates','throughput',{'good-labels':2500,'encode-speed':42.5,'first-pass-yield':96.5,'retry-success':72.5,'retry-delay':0.75,'max-attempts':4},'expected');
invalid('throughput zero','throughput',{'good-labels':0});
invalid('throughput contradictory rate','throughput',{'good-labels':1000,'first-pass-yield':101});
invalid('throughput fractional qty','throughput',{'good-labels':10.5});
invalid('throughput attempts high','throughput',{'good-labels':1000,'max-attempts':11});
invalid('throughput blank','throughput',{'good-labels':''});

for(const page of pages){
  const source=fs.readFileSync(path.join(root,'tools',page),'utf8');
  const ids=[...source.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  expect(ids.length===new Set(ids).size,page+' duplicate id');
  for(const marker of ['G-QMCP8M0CW6','application/ld+json','rel="canonical"','runSmartLabel(','aria-live="polite"','Last reviewed: 2026-09-02']) expect(source.includes(marker),page+' missing '+marker);
}
console.log(`SMART LABEL QA PASS: 5 tools, ${fixtureCount} independent normal/decimal/boundary/invalid fixtures, metadata and duplicate IDs`);
