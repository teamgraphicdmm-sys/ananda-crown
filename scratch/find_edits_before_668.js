const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl');
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

let lineNo = 0;
rl.on('line', (line) => {
  lineNo++;
  try {
    const data = JSON.parse(line);
    if (data.step_index <= 668 && data.tool_calls) {
      data.tool_calls.forEach(tc => {
        const target = tc.args?.TargetFile || tc.args?.targetFile || '';
        if (target.includes('ananda_crown_clone.html')) {
          console.log(`Step ${data.step_index} [${tc.name}]: Target: ${target}`);
          console.log(`   Description: ${tc.args?.Description || tc.args?.instruction || ''}`);
        }
      });
    }
  } catch(e) {}
});
