const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

[584, 598, 602, 608].forEach(s => {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"step_index":${s}`)) {
      const d = JSON.parse(lines[i]);
      const tc = d.tool_calls[0].args;
      console.log(`=== STEP ${s} ===`);
      console.log('TargetContent:');
      console.log(tc.TargetContent);
      console.log('ReplacementContent:');
      console.log(tc.ReplacementContent);
      break;
    }
  }
});
