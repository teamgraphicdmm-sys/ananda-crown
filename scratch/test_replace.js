const fs = require('fs');
let html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

let pos = 0;
let cells = [];
while ((pos = html.indexOf('availability-table-content floor', pos)) !== -1) {
  const cellStart = html.lastIndexOf('<div', pos);
  const nextA = html.indexOf('<a', pos);
  const nextEndA1 = html.indexOf('</a', nextA);
  const nextEndA2 = html.indexOf('</a', nextEndA1 + 4);
  const cellClose = html.indexOf('</div>', nextEndA2);
  const cellEnd = cellClose + 6;
  cells.push({ start: cellStart, end: cellEnd, raw: html.slice(cellStart, cellEnd) });
  pos = cellEnd;
}

console.log('Total cells identified:', cells.length);

const cleanCell = `<div class="availability-table-content floor">
                                          <a
                                            href="/images/florplan.png"
                                            target="_blank"
                                            class="availability-button w-inline-block"
                                            ><div
                                              class="availability-ingles mb-none"
                                            >
                                              <div class="untitled-400-13">
                                                view floorplan
                                              </div>
                                            </div>
                                            <div
                                              class="availability-ingles mb-block"
                                            >
                                              <div class="untitled-400-13">
                                                view
                                              </div>
                                            </div>
                                            <div class="availability-portugues">
                                              <div class="untitled-400-13">
                                                ver planta
                                              </div>
                                            </div></a
                                          >
                                        </div>`;

// Replace back to front
for (let i = cells.length - 1; i >= 0; i--) {
  const c = cells[i];
  html = html.slice(0, c.start) + cleanCell + html.slice(c.end);
}

// Now let's count buttons in the new HTML
const remainingButtons = (html.match(/class="availability-button/g) || []).length;
console.log('Remaining availability-button classes:', remainingButtons);
