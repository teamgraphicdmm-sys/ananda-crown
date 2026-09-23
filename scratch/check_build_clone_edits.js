const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl');
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

rl.on('line', (line) => {
  if (line.includes('build_clone.js') && (line.includes('replace_file_content') || line.includes('write_to_file'))) {
    try {
      const d = JSON.parse(line);
      console.log(`Step ${d.step_index}: ${d.tool_calls?.[0]?.name}`);
    } catch(e) {}
  }
});
