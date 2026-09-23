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

const editSteps = [
  845, 849, 932, 938, 946, 950, 966, 1020, 1026
];

for (const s of editSteps) {
  const d = getStepData(s);
  const tc = d.tool_calls[0].args;
  html = html.replace(tc.TargetContent, tc.ReplacementContent);
}

// Now check step 1058
const s1058 = getStepData(1058).tool_calls[0].args;
console.log('Step 1058 TargetContent lines:', s1058.TargetContent.split('\n').length);
console.log('Target snippet:');
console.log(JSON.stringify(s1058.TargetContent.slice(0, 150)));

// Let's see if the first line exists in html
const firstLine = s1058.TargetContent.split('\n')[0];
console.log('First line exists in html?', html.includes(firstLine));
console.log('First line:', JSON.stringify(firstLine));
