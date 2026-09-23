const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

function getStepData(stepIdx) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"step_index":${stepIdx}`)) {
      return JSON.parse(lines[i]);
    }
  }
  return null;
}

const s1020 = getStepData(1020).tool_calls[0].args;
const s1058 = getStepData(1058).tool_calls[0].args;

console.log('Does s1020 replacement include s1058 target?');
console.log(s1020.ReplacementContent.includes(s1058.TargetContent));

if (!s1020.ReplacementContent.includes(s1058.TargetContent)) {
  // Let's find where they differ
  const tLines = s1058.TargetContent.split('\n');
  tLines.forEach((l, i) => {
    if (!s1020.ReplacementContent.includes(l.trim())) {
      console.log('Line ' + i + ' not found:', JSON.stringify(l));
    }
  });
}
