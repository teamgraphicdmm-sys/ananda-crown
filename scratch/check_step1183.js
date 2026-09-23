const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  try {
    const d = JSON.parse(lines[i]);
    if (d.step_index >= 1180 && d.step_index <= 1185) {
      console.log('Step:', d.step_index, 'type:', d.type, 'status:', d.status);
      if (d.tool_calls) {
        console.log('Tool calls:', JSON.stringify(d.tool_calls.map(t => ({name: t.name, file: t.args?.AbsolutePath || t.args?.TargetFile}))));
      }
      if (d.content && d.content.length < 500) {
        console.log('Content:', d.content);
      }
    }
  } catch(e) {}
}
