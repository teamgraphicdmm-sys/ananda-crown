const fs = require('fs');

let html = fs.readFileSync('C:/Users/Admin/AppData/Roaming/Code/User/History/-6d38c520/smNC.html', 'utf8');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

function getStepData(stepIdx) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"step_index":${stepIdx}`)) {
      return JSON.parse(lines[i]);
    }
  }
  return null;
}

const allSteps = [
  845, 849, 932, 938, 946, 950, 966, 1020, 1026, 1064, 1108, 1221, 1225, 
  1324, 1328, 1583, 1591, 1641, 1645, 1659, 1665, 1675, 1691, 1812, 1814, 
  1881, 1885, 1889, 1927, 1933, 1937, 1965, 1969, 2092, 2096, 2116, 2140, 
  2146, 2152, 2190, 2345, 2349, 2353, 2389, 2464, 2470, 2673
];

for (const s of allSteps) {
  const tc = getStepData(s).tool_calls[0].args;
  html = html.replace(tc.TargetContent, tc.ReplacementContent);
}

const s2710 = getStepData(2710).tool_calls[0].args;
console.log('s2710 TargetContent:');
console.log(JSON.stringify(s2710.TargetContent));

// Let's see what is in html around lines 440 to 460
const docLines = html.split('\n');
console.log('Doc lines 440 to 455:');
for (let i = 438; i < 455; i++) {
  console.log(i + 1, JSON.stringify(docLines[i]));
}
