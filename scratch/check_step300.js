const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  try {
    const d = JSON.parse(lines[i]);
    if (d.step_index >= 295 && d.step_index <= 305) {
      console.log('Step:', d.step_index, 'type:', d.type);
      if (d.tool_calls) {
        console.log('  tool:', d.tool_calls[0].name, 'args:', JSON.stringify(d.tool_calls[0].args).slice(0, 300));
      }
    }
  } catch(e) {}
}
