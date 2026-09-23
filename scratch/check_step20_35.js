const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  try {
    const d = JSON.parse(lines[i]);
    if (d.step_index >= 20 && d.step_index <= 35) {
      if (d.tool_calls) {
        console.log('Step:', d.step_index, 'tool:', d.tool_calls[0].name, 'TargetFile:', d.tool_calls[0].args?.TargetFile);
      }
      if (d.content && d.content.includes('Total Bytes:')) {
        console.log('Step:', d.step_index, 'content:', d.content.match(/Total Bytes:\s*([0-9]+)/)?.[1]);
      }
    }
  } catch(e) {}
}
