const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"step_index":749')) {
    console.log('=== Step 749 ===');
    console.log(lines[i]);
    console.log('=== Step 750 ===');
    console.log(lines[i+1]);
    break;
  }
}
