const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  try {
    const d = JSON.parse(lines[i]);
    if (d.tool_calls) {
      for (const tc of d.tool_calls) {
        const file = tc.args?.TargetFile || tc.args?.AbsolutePath || '';
        const cmd = tc.args?.CommandLine || '';
        if (file.includes('ananda_crown_clone.html') || cmd.includes('ananda_crown_clone.html') || tc.name === 'replace_file_content' || tc.name === 'write_to_file') {
          console.log(`Step ${d.step_index}: ${tc.name} -> ${file || cmd}`);
        }
      }
    }
  } catch(e) {}
}
