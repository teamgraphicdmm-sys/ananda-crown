const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"step_index":110')) {
    const d = JSON.parse(lines[i]);
    console.log('=== Step 110 ===');
    console.log(d.content);
    break;
  }
}
