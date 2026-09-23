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

const editSteps = [845, 849, 932, 938, 946, 950, 966, 1020, 1026];

for (const s of editSteps) {
  const d = getStepData(s);
  const tc = d.tool_calls[0].args;
  html = html.replace(tc.TargetContent, tc.ReplacementContent);
}

const s1058 = getStepData(1058).tool_calls[0].args;
const targetLines = s1058.TargetContent.split('\n').map(l => l.trim());
const docLines = html.split('\n');

console.log('Target line 0:', JSON.stringify(targetLines[0]));
// Find where targetLine 0 appears in docLines
docLines.forEach((l, i) => {
  if (l.trim() === targetLines[0]) {
    console.log(`Matched targetLine[0] at doc line ${i + 1}`);
    for (let k = 0; k < targetLines.length; k++) {
      const match = docLines[i + k]?.trim() === targetLines[k];
      if (!match) {
        console.log(`  Mismatch at offset ${k}:`);
        console.log(`    doc:    ${JSON.stringify(docLines[i + k]?.trim())}`);
        console.log(`    target: ${JSON.stringify(targetLines[k])}`);
        break;
      }
    }
  }
});
