const fs = require('fs');
const path = require('path');

const histDir = 'C:/Users/Admin/AppData/Roaming/Code/User/History';
const folders = fs.readdirSync(histDir);

for (const f of folders) {
  const entriesPath = path.join(histDir, f, 'entries.json');
  if (fs.existsSync(entriesPath)) {
    const content = fs.readFileSync(entriesPath, 'utf8');
    if (content.toLowerCase().includes('ananda_crown_clone')) {
      console.log('Matched folder:', f);
      const json = JSON.parse(content);
      console.log('Resource:', json.resource);
      console.log('Entries count:', json.entries?.length);
      const lastEntry = json.entries?.[json.entries.length - 1];
      console.log('Last entry:', lastEntry, new Date(lastEntry.timestamp).toISOString());
    }
  }
}
