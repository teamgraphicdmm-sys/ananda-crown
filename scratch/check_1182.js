const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  try {
    const d = JSON.parse(lines[i]);
    if (d.step_index === 1182) {
      console.log('Step 1182 command:', d.tool_calls[0].args.CommandLine);
    }
    if (d.step_index === 1183) {
      console.log('Step 1183 content snippet:', d.content?.slice(0, 300));
    }
  } catch(e) {}
}
