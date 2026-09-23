const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript.jsonl');
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

let lineNo = 0;
rl.on('line', (line) => {
  lineNo++;
  try {
    const data = JSON.parse(line);
    if (data.tool_calls && data.step_index < 685) {
      data.tool_calls.forEach(tc => {
        if (tc.name === 'write_to_file' || tc.name === 'replace_file_content') {
          console.log(`Step ${data.step_index} [${tc.name}]: Target: ${tc.args?.TargetFile || tc.args?.targetFile || tc.args?.target_file}`);
          console.log(`   Description: ${tc.args?.Description || tc.args?.instruction || ''}`);
        }
      });
    }
  } catch(e) {}
});
