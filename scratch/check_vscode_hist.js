const fs = require('fs');
const path = require('path');

const histDir = 'C:/Users/Admin/AppData/Roaming/Code/User/History';
if (fs.existsSync(histDir)) {
  const folders = fs.readdirSync(histDir);
  console.log('Found history folders:', folders.length);
  
  // Find entries with entries.json mentioning ananda_crown_clone.html
  for (const f of folders) {
    const entriesPath = path.join(histDir, f, 'entries.json');
    if (fs.existsSync(entriesPath)) {
      const content = fs.readFileSync(entriesPath, 'utf8');
      if (content.includes('ananda_crown_clone.html')) {
        console.log('Matched folder:', f, content);
        const files = fs.readdirSync(path.join(histDir, f));
        for (const file of files) {
          if (file !== 'entries.json') {
            const stat = fs.statSync(path.join(histDir, f, file));
            console.log(`  File: ${file}, Size: ${stat.size}, MTime: ${stat.mtime.toISOString()}`);
          }
        }
      }
    }
  }
} else {
  console.log('History dir does not exist');
}
