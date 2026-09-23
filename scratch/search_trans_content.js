const fs = require('fs');

// Let's find in transcript_full.jsonl any content of ananda_crown_clone.html
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');
console.log('Total transcript lines:', lines.length);

for (let i = lines.length - 1; i >= 0; i--) {
  const line = lines[i];
  if (line.includes('ananda_crown_clone.html') && line.includes('CodeContent')) {
    console.log('Found CodeContent in line ' + i);
  }
}
