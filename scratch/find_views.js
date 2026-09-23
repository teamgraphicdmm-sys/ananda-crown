const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl');
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

let lineNo = 0;
rl.on('line', (line) => {
  lineNo++;
  try {
    const d = JSON.parse(line);
    if (d.tool_calls) {
      d.tool_calls.forEach(tc => {
        if (tc.name === 'view_file' && tc.args?.AbsolutePath?.includes('ananda_crown_clone.html')) {
          console.log(`Step ${d.step_index}: StartLine: ${tc.args.StartLine}, EndLine: ${tc.args.EndLine}`);
        }
      });
    }
  } catch(e) {}
});
