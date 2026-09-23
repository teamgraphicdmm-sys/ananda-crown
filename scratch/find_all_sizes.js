const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('ananda_crown_clone.html') && lines[i].includes('Total Bytes:')) {
    const d = JSON.parse(lines[i]);
    const byteMatch = d.content?.match(/Total Bytes:\s*([0-9]+)/);
    const linesMatch = d.content?.match(/Total Lines:\s*([0-9]+)/);
    console.log(`Step ${d.step_index}: Total Lines: ${linesMatch?.[1]}, Total Bytes: ${byteMatch?.[1]}`);
  }
}
