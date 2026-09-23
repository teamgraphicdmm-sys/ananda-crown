const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  try {
    const d = JSON.parse(lines[i]);
    if (d.step_index === 17 || d.step_index === 18) {
      console.log('Step:', d.step_index);
      console.log('tool_calls:', JSON.stringify(d.tool_calls));
      console.log('content length:', d.content?.length);
      console.log('content snippet:', d.content?.slice(0, 300));
    }
  } catch(e) {}
}
