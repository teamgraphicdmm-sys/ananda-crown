const fs = require('fs');
const path = require('path');

const filePath = path.resolve('scratch/temp_turn2.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Replace all webflow floorplan URLs with /images/florplan.png
const urlRegex = /https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af3481dbebbb1a2\/[^\"]+\.(jpg|pdf)/gi;
let matchCount = 0;
html = html.replace(urlRegex, () => {
  matchCount++;
  return '/images/florplan.png';
});
console.log('Replaced floorplan URLs:', matchCount);

// Also replace href="#" in availability-button if any
html = html.replace(/(<a\s+[^>]*href=)["']#["']([^>]*class=["'][^"']*availability-button)/gi, '$1"/images/florplan.png"$2 target="_blank"');

// 2. Add availability-button hover styles in <style>
const cssHoverRules = `
      /* View Floorplan Button Hover Styling - Pure White Text */
      .availability-button {
        border-color: #c2a180 !important;
        color: #c2a180 !important;
        transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
        text-decoration: none !important;
        cursor: pointer !important;
      }
      .availability-button .untitled-400-13 {
        color: inherit !important;
        transition: color 0.3s ease !important;
      }
      .availability-button:hover,
      .availability-button.grey:hover {
        background-color: #9e6443 !important;
        border-color: #9e6443 !important;
        color: #ffffff !important;
      }
      .availability-button:hover .untitled-400-13,
      .availability-button.grey:hover .untitled-400-13,
      .availability-button:hover * {
        color: #ffffff !important;
      }

      /* Floorplan Preview Lightbox Modal */
      .floorplan-modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: rgba(14, 8, 5, 0.92);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
      }
      .floorplan-modal-backdrop.is-open {
        opacity: 1;
        pointer-events: auto;
      }
      .floorplan-modal-container {
        position: relative;
        background: #1c110b;
        border: 1px solid rgba(194, 161, 128, 0.35);
        border-radius: 16px;
        max-width: 1040px;
        width: 100%;
        max-height: 92vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
        transform: scale(0.96) translateY(12px);
        transition: transform 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
      }
      .floorplan-modal-backdrop.is-open .floorplan-modal-container {
        transform: scale(1) translateY(0);
      }
      .floorplan-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 24px;
        border-bottom: 1px solid rgba(194, 161, 128, 0.2);
        background: #23160e;
      }
      .floorplan-modal-badge {
        font-family: "Montserrat", sans-serif;
        font-size: 9.5px;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #c2a180;
        display: block;
        margin-bottom: 2px;
      }
      .floorplan-modal-title h3 {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 24px;
        font-weight: 400;
        color: #f7f2ed;
        margin: 0;
      }
      .floorplan-modal-actions {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .floorplan-download-btn {
        font-family: "Montserrat", sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #ffffff !important;
        background: #9e6443;
        padding: 9px 20px;
        border-radius: 100px;
        text-decoration: none !important;
        transition: all 0.3s ease;
      }
      .floorplan-download-btn:hover {
        background: #c2a180;
        color: #1c110b !important;
      }
      .floorplan-close-btn {
        background: transparent;
        border: 1px solid rgba(194, 161, 128, 0.3);
        border-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #f7f2ed;
        font-size: 24px;
        line-height: 1;
        cursor: pointer;
        transition: all 0.25s ease;
      }
      .floorplan-close-btn:hover {
        background: #9e6443;
        border-color: #9e6443;
        color: #ffffff;
      }
      .floorplan-modal-body {
        padding: 20px;
        overflow-y: auto;
        display: flex;
        justify-content: center;
        background: #fbf8f4;
      }
      .floorplan-modal-img {
        max-width: 100%;
        max-height: 75vh;
        object-fit: contain;
        display: block;
        border-radius: 6px;
      }
`;

// Replace existing .availability-button rule in <style>
html = html.replace(/\.availability-button\s*\{[\s\S]*?color:\s*#c2a180\s*!important;\s*\}/i, cssHoverRules.trim());

// 3. Add Modal HTML and Script before </body>
const modalHTML = `
    <!-- Floorplan Preview Lightbox Modal -->
    <div id="floorplan-modal" class="floorplan-modal-backdrop" style="display: none;">
      <div class="floorplan-modal-container">
        <div class="floorplan-modal-header">
          <div class="floorplan-modal-title">
            <span class="floorplan-modal-badge">ANANDA CROWN • SECTOR 78 MOHALI</span>
            <h3>Architectural Floor Plan Layout</h3>
          </div>
          <div class="floorplan-modal-actions">
            <a href="/images/florplan.png" target="_blank" download="Ananda_Crown_Floorplan.png" class="floorplan-download-btn">
              Download Blueprint
            </a>
            <button type="button" id="close-floorplan-modal" class="floorplan-close-btn" aria-label="Close modal">
              &times;
            </button>
          </div>
        </div>
        <div class="floorplan-modal-body">
          <img src="/images/florplan.png" alt="Ananda Crown Floor Plan" class="floorplan-modal-img" />
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
            void modal.offsetWidth;
            modal.classList.add('is-open');
            document.body.style.overflow = 'hidden';
          }

          function closeModal() {
            modal.classList.remove('is-open');
            setTimeout(function() {
              modal.style.display = 'none';
              document.body.style.overflow = '';
            }, 350);
          }

          document.querySelectorAll('.availability-button').forEach(function(btn) {
            btn.addEventListener('click', openModal);
          });

          if (closeBtn) closeBtn.addEventListener('click', closeModal);
          modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
          });
          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
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

if (!html.includes('id="floorplan-modal"')) {
  html = html.replace('</body>', `${modalHTML}\n</body>`);
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated ananda_crown_clone.html');
