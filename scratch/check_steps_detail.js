const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

[584, 598, 602, 608, 614, 620, 749].forEach(step => {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"step_index":${step}`)) {
      const data = JSON.parse(lines[i]);
      const tc = data.tool_calls?.[0];
      console.log(`=== STEP ${step}: ${tc?.args?.Description || ''} ===`);
      console.log(`TargetContent length: ${tc?.args?.TargetContent?.length}, Replacement length: ${tc?.args?.ReplacementContent?.length}`);
      break;
    }
  }
});
