const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i <= 30; i++) {
  if (lines[i]) {
    const d = JSON.parse(lines[i]);
    console.log(`Step ${d.step_index} (${d.type}):`);
    if (d.tool_calls) {
      console.log('  tools:', d.tool_calls.map(t => `${t.name} -> ${t.args?.AbsolutePath || t.args?.TargetFile || t.args?.CommandLine || ''}`));
    }
  }
}
