const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl');
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

const steps = [];
rl.on('line', (line) => {
  try {
    const d = JSON.parse(line);
    if (d.step_index >= 836 && d.step_index <= 2814) {
      if (d.tool_calls) {
        for (const tc of d.tool_calls) {
          if (tc.name === 'replace_file_content') {
            const target = tc.args?.TargetFile || '';
            if (target.toLowerCase().includes('ananda_crown_clone.html')) {
              steps.push({
                step: d.step_index,
                start: tc.args.StartLine,
                end: tc.args.EndLine,
                targetLen: tc.args.TargetContent.length,
                replLen: tc.args.ReplacementContent.length,
                desc: tc.args.Description
              });
            }
          }
        }
      }
    }
  } catch(e) {}
});

rl.on('close', () => {
  console.log('Total replace_file_content steps on ananda_crown_clone.html:', steps.length);
  steps.forEach(s => console.log(`Step ${s.step}: lines ${s.start}-${s.end}, target: ${s.targetLen} chars -> ${s.replLen} chars. Desc: ${s.desc}`));
});
