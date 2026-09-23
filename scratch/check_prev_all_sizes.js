const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl');
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

rl.on('line', (line) => {
  try {
    if (line.includes('ananda_crown_clone.html') && line.includes('Total Bytes:')) {
      const d = JSON.parse(line);
      const bm = d.content?.match(/Total Bytes:\s*([0-9]+)/);
      const lm = d.content?.match(/Total Lines:\s*([0-9]+)/);
      console.log(`Step ${d.step_index}: Lines ${lm?.[1]}, Bytes ${bm?.[1]}`);
    }
  } catch(e) {}
});
