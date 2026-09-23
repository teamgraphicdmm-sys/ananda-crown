const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

function getStepData(stepIndex) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"step_index":${stepIndex}`)) {
      return JSON.parse(lines[i]);
    }
  }
  return null;
}

[301, 303, 584, 598, 602].forEach(s => {
  const d = getStepData(s);
  const tc = d.tool_calls[0].args;
  console.log(`=== Step ${s} TargetContent ===`);
  console.log(JSON.stringify(tc.TargetContent));
});
