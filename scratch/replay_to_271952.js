const fs = require('fs');
const readline = require('readline');

let html = fs.readFileSync('C:/Users/Admin/AppData/Roaming/Code/User/History/-6d38c520/smNC.html', 'utf8');
console.log('smNC.html initial length:', html.length, 'lines:', html.split('\n').length);

const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

const editSteps = [
  845, 849, 932, 938, 946, 950, 966, 1020, 1026, 1058, 1064, 1108, 1221, 1225, 
  1324, 1328, 1479, 1485, 1489, 1523, 1531, 1533, 1583, 1591, 1641, 1645, 1659, 
  1665, 1675, 1691, 1812, 1814, 1881, 1885, 1889, 1927, 1933, 1937, 1965, 1969, 
  2092, 2096, 2116, 2140, 2146, 2152, 2190, 2345, 2349, 2353, 2389, 2464, 2470, 
  2476, 2673, 2710, 2714, 2774, 2780
];

function getStepData(stepIdx) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"step_index":${stepIdx}`)) {
      return JSON.parse(lines[i]);
    }
  }
  return null;
}

let failed = 0;
for (const s of editSteps) {
  const d = getStepData(s);
  if (!d) {
    console.log(`Step ${s} not found in transcript`);
    failed++;
    continue;
  }
  const tc = d.tool_calls?.[0]?.args;
  if (!tc || !tc.TargetContent) {
    console.log(`Step ${s} has no TargetContent`);
    continue;
  }
  if (html.includes(tc.TargetContent)) {
    html = html.replace(tc.TargetContent, tc.ReplacementContent);
    // console.log(`Step ${s} applied. Len: ${html.length}`);
  } else {
    console.log(`Step ${s} TARGET NOT FOUND! Target len: ${tc.TargetContent.length}`);
    failed++;
  }
}

console.log(`Finished. Failed: ${failed}. Final HTML len: ${html.length}, lines: ${html.split('\n').length}`);
if (html.length === 271952) {
  console.log('EXACT MATCH 271952 BYTES!');
}
