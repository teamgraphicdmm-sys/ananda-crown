const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl');
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

rl.on('line', (line) => {
  try {
    const d = JSON.parse(line);
    if (d.step_index >= 669) {
      if (d.tool_calls) {
        d.tool_calls.forEach(tc => {
          const file = tc.args?.TargetFile || tc.args?.CommandLine || '';
          if (file.includes('ananda_crown_clone.html') || tc.name === 'replace_file_content' || (tc.name === 'write_to_file' && tc.args?.TargetFile?.includes('public'))) {
            console.log(`Step ${d.step_index}: ${tc.name} -> ${file.slice(0, 100)}`);
          }
        });
      }
    }
  } catch(e) {}
});
