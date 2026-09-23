const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  try {
    const d = JSON.parse(lines[i]);
    if (d.step_index >= 1055 && d.step_index <= 1058) {
      console.log('Step:', d.step_index, 'tool:', d.tool_calls?.[0]?.name);
      console.log(JSON.stringify(d.tool_calls?.[0]?.args));
      if (d.content) console.log('Content:', d.content.slice(0, 300));
    }
  } catch(e) {}
}
