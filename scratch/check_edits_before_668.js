const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  try {
    const d = JSON.parse(lines[i]);
    if (d.step_index < 668) {
      if (d.tool_calls) {
        d.tool_calls.forEach(tc => {
          const target = tc.args?.TargetFile || tc.args?.CommandLine || '';
          if (target.includes('ananda_crown_clone.html') || tc.name === 'replace_file_content' || (tc.name === 'write_to_file' && tc.args?.TargetFile?.includes('html'))) {
            console.log(`Step ${d.step_index}: ${tc.name} target: ${target}`);
          }
        });
      }
    }
  } catch(e) {}
}
