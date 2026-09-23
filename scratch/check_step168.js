const fs = require('fs');
const html = fs.readFileSync('scratch/baseline_turn1_exact.html', 'utf8');
const docLines = html.split('\n');

// In Step 167: lines 5480 to 5547
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"step_index":168')) {
    const d = JSON.parse(lines[i]);
    console.log('=== Step 168 (View of lines 5480 to 5547) ===');
    console.log(d.content.slice(0, 500));
    console.log('Last lines of step 168:');
    const contentLines = d.content.split('\n');
    console.log(contentLines.slice(-15).join('\n'));
    break;
  }
}
