const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"step_index":584')) {
    const d = JSON.parse(lines[i]);
    const tc = d.tool_calls[0].args;
    console.log('=== STEP 584 TARGET ===');
    console.log(tc.TargetContent);
    console.log('=== STEP 584 REPLACEMENT ===');
    console.log(tc.ReplacementContent);
    break;
  }
}
