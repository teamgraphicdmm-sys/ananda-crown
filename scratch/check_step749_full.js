const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  try {
    const d = JSON.parse(lines[i]);
    if (d.step_index >= 748 && d.step_index <= 754) {
      console.log('Step:', d.step_index);
      if (d.tool_calls) {
        console.log('  tool:', d.tool_calls[0].name, 'TargetFile:', d.tool_calls[0].args?.TargetFile);
        console.log('  TargetContent snippet:', JSON.stringify(d.tool_calls[0].args?.TargetContent?.slice(0, 100)));
        console.log('  ReplacementContent snippet:', JSON.stringify(d.tool_calls[0].args?.ReplacementContent?.slice(0, 100)));
      }
    }
  } catch(e) {}
}
