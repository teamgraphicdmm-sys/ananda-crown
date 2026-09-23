const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl');
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

rl.on('line', (line) => {
  try {
    const d = JSON.parse(line);
    if (d.tool_calls) {
      d.tool_calls.forEach(tc => {
        const target = tc.args?.TargetFile || tc.args?.CommandLine || '';
        if (target.includes('ananda_crown_clone.html') && (tc.name === 'write_to_file' || tc.name.includes('command'))) {
          console.log(`Step ${d.step_index}: ${tc.name} -> ${target.slice(0, 100)}`);
        }
      });
    }
  } catch(e) {}
});
