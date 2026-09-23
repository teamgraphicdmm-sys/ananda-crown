const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('restore_step668.js')) {
    const d = JSON.parse(lines[i]);
    console.log('Step:', d.step_index, 'type:', d.type);
    if (lines[i+1]) {
      const next = JSON.parse(lines[i+1]);
      console.log('Output:', next.content?.slice(0, 500));
    }
  }
}
