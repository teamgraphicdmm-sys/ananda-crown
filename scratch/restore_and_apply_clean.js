const fs = require('fs');

// 1. Start from the pristine build_clone output
require('../build_clone.js');
let html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');
console.log('Clean build length:', html.length);

// 2. Add florplan.png to floorplan buttons (Turn 2 request)
const urlRegex = /https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af3481dbebbb1a2\/[^\"]+\.(jpg|pdf)/gi;
let count = 0;
html = html.replace(urlRegex, () => {
  count++;
  return '/images/florplan.png';
});
console.log(`Replaced ${count} floorplan URLs with /images/florplan.png`);

// 3. Add hover style: change view floorplan btn hover text color white (Turn 2 request)
const hoverCss = `
<style id="floorplan-hover-style">
  .availability-button {
    transition: all 0.3s ease !important;
  }
  .availability-button:hover {
    background-color: #9e6443 !important;
    border-color: #9e6443 !important;
    color: #ffffff !important;
  }
  .availability-button:hover .untitled-400-13,
  .availability-button:hover * {
    color: #ffffff !important;
  }
</style>
`;
html = html.replace('</head>', `${hoverCss}\n</head>`);

// 4. Link INQUIRE nav link to /contact (Turn 3 request)
html = html.replace(
  '<a href="#" class="nav-link inquire w-inline-block"',
  '<a href="/contact" class="nav-link inquire w-inline-block"'
);
console.log('Linked nav INQUIRE to /contact');

// 5. Add Floorplan lightbox modal (Turn 2 request)
const modalHtmlAndScript = `
<!-- Floorplan Preview Lightbox Modal -->
<div id="floorplan-modal" style="display: none; position: fixed; inset: 0; z-index: 999999; background: rgba(14, 8, 5, 0.94); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); align-items: center; justify-content: center; padding: 24px;">
  <div style="position: relative; width: 92vw; max-width: 1050px; max-height: 90vh; background: #190f0a; border: 1px solid rgba(194, 161, 128, 0.35); box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85); display: flex; flex-direction: column; overflow: hidden; border-radius: 6px;">
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; border-bottom: 1px solid rgba(194, 161, 128, 0.2); background: #140b07;">
      <div>
        <span style="font-size: 10px; letter-spacing: 0.2em; color: #c2a180; text-transform: uppercase; font-family: Montserrat, sans-serif; display: block;">ANANDA CROWN • SECTOR 78 MOHALI</span>
        <h3 style="margin: 4px 0 0 0; font-size: 22px; font-family: 'Cormorant Garamond', Georgia, serif; color: #ffffff; font-weight: 400; letter-spacing: 0.05em;">Architectural Floor Plan Layout</h3>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <a href="/images/florplan.png" target="_blank" download="Ananda_Crown_Floorplan.png" style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px; border-radius: 999px; background-color: #c2a180; color: #190f0a; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;">
          Download Blueprint
        </a>
        <button type="button" id="close-floorplan-modal" style="background: transparent; border: none; color: #c2a180; font-size: 28px; line-height: 1; cursor: pointer; padding: 0 8px;">
          &times;
        </button>
      </div>
    </div>
    <div style="padding: 24px; overflow-y: auto; display: flex; align-items: center; justify-content: center; background: #100804;">
      <img src="/images/florplan.png" alt="Ananda Crown Floor Plan" style="max-width: 100%; max-height: 72vh; object-fit: contain; border-radius: 2px;" />
    </div>
  </div>
</div>

<script>
  (function() {
    function initFloorplanModal() {
      const modal = document.getElementById('floorplan-modal');
      const closeBtn = document.getElementById('close-floorplan-modal');
      if (!modal) return;

      function openModal(e) {
        if (e) e.preventDefault();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

      function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }

      document.querySelectorAll('.availability-button').forEach(function(btn) {
        btn.addEventListener('click', openModal);
      });

      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initFloorplanModal);
    } else {
      initFloorplanModal();
    }
  })();
</script>
`;

html = html.replace('</body>', `${modalHtmlAndScript}\n</body>`);

fs.writeFileSync('public/ananda_crown_clone.html', html, 'utf8');
console.log('Restored cleanly! Final length:', html.length);
