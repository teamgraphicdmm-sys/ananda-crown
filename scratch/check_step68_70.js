const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"step_index":68')) {
    console.log('=== Step 68 (Lines 2160 to 2350) ===');
    console.log(JSON.parse(lines[i]).content);
  }
  if (lines[i].includes('"step_index":70')) {
    console.log('=== Step 70 (Lines 2100 to 2165) ===');
    console.log(JSON.parse(lines[i]).content);
  }
}
