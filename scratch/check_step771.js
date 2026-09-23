const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  try {
    const d = JSON.parse(lines[i]);
    if (d.step_index >= 770 && d.step_index <= 776) {
      console.log('Step:', d.step_index, 'CommandLine:', d.tool_calls?.[0]?.args?.CommandLine);
      console.log('Content:', d.content);
    }
  } catch(e) {}
}
