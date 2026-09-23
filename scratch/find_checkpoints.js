const fs = require('fs');
const readline = require('readline');

function findCheckpoints(transPath, label) {
  const fileStream = fs.createReadStream(transPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  rl.on('line', (line) => {
    if (line.includes('"CHECKPOINT"') || line.includes('"type":"CHECKPOINT"')) {
      try {
        const d = JSON.parse(line);
        console.log(`[${label}] Step ${d.step_index}: keys:`, Object.keys(d));
        console.log(`[${label}] Step ${d.step_index} content snippet:`, JSON.stringify(d).slice(0, 300));
      } catch(e) {}
    }
  });
}

findCheckpoints('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl', 'PREV');
findCheckpoints('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'CURR');
