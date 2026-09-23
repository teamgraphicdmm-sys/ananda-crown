const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"step_index":2345') || lines[i].includes('"step_index":2349')) {
    const d = JSON.parse(lines[i]);
    console.log(`=== Step ${d.step_index} ===`);
    console.log('StartLine:', d.tool_calls[0].args.StartLine, 'EndLine:', d.tool_calls[0].args.EndLine);
    console.log('TargetContent snippet:', JSON.stringify(d.tool_calls[0].args.TargetContent.slice(0, 100)));
    console.log('ReplacementContent snippet:', JSON.stringify(d.tool_calls[0].args.ReplacementContent.slice(0, 100)));
  }
}
