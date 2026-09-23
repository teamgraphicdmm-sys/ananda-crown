const fs = require('fs');
let html = fs.readFileSync('scratch/baseline_turn1_exact.html', 'utf8');

// In Step 295 of current transcript, lines 470 to 520 were viewed
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"step_index":296')) {
    const d = JSON.parse(lines[i]);
    console.log('=== Step 296 (Actual view of lines 470-520 at Step 295) ===');
    console.log(d.content);
    break;
  }
}
