const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

const failedSteps = [1058, 1479, 1523, 2476, 2710, 2774];

for (const s of failedSteps) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"step_index":${s}`)) {
      const d = JSON.parse(lines[i]);
      const tc = d.tool_calls[0].args;
      const nextD = JSON.parse(lines[i+1]);
      console.log(`=== Step ${s} ===`);
      console.log('Next status / content snippet:', nextD.status, nextD.content?.slice(0, 150));
      break;
    }
  }
}
