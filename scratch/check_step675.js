const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  try {
    const d = JSON.parse(lines[i]);
    if (d.step_index === 675 || d.step_index === 676) {
      console.log('Step:', d.step_index, 'CommandLine:', d.tool_calls?.[0]?.args?.CommandLine);
      console.log('Output:', d.content);
    }
  } catch(e) {}
}
