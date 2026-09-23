const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"step_index":31') || lines[i].includes('"step_index":32')) {
    const d = JSON.parse(lines[i]);
    console.log(`Step ${d.step_index}: type: ${d.type}`);
    if (d.tool_calls) {
      console.log('Tool calls:', JSON.stringify(d.tool_calls.map(tc => ({ name: tc.name, args: tc.args }))));
    }
  }
}
