const fs = require('fs');

let html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');
console.log('Initial file length:', html.length);

// 1. Standardize floorplan cells across all 13 units: exactly ONE button linking to /images/florplan.png
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

console.log('Identified floor cells to replace:', cells.length);

const cleanCell = `<div class="availability-table-content floor">
                                          <a
                                            href="/images/florplan.png"
                                            target="_blank"
                                            class="availability-button w-inline-block open-floorplan-lightbox"
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

// Replace all 13 cells backwards
for (let i = cells.length - 1; i >= 0; i--) {
  const c = cells[i];
  html = html.slice(0, c.start) + cleanCell + html.slice(c.end);
}

// 2. Fix Navbar Inquire link
html = html.replace(
  /<div class="nav-link-inquire">\s*<a href="[^"]*" class="nav-link inquire w-inline-block"/,
  '<div class="nav-link-inquire"><a href="/contact" class="nav-link inquire w-inline-block"'
);

// 3. Update Inquire Drawer / Overlay Markup
html = html.replace(
  /<div class="inquire-open-close">\s*<a id="close-inquire"[^>]*>[\s\S]*?<\/a>\s*<\/div>/,
  `<div class="inquire-open-close">
    <a id="close-inquire" href="/" class="nav-link inquire-close w-inline-block" aria-label="Close">
      <div class="untitled-400-13">CLOSE</div>
    </a>
  </div>`
);

// Address update
html = html.replace(
  /<div class="inquire-open-info-title">\s*<div class="untitled-400-13">WHERE<\/div>\s*<\/div>\s*<div class="inquire-open-info-links">[\s\S]*?<\/div>/,
  `<div class="inquire-open-info-title">
    <div class="untitled-400-13">WHERE</div>
  </div>
  <div class="inquire-open-info-links">
    <a href="https://maps.google.com/?q=Sector+78+Mohali+Punjab" target="_blank" class="tobias-300-26 hover-links mb-13">
      SECTOR 78, SAS NAGAR,<br />MOHALI, PUNJAB<br />140308
    </a>
  </div>`
);

// Contacts update
html = html.replace(
  /<div class="inquire-open-info-title">\s*<div class="untitled-400-13">CONTACTS<\/div>\s*<\/div>\s*<div class="inquire-open-info-links">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div class="inquire-open-right">/,
  `<div class="inquire-open-info-title">
    <div class="untitled-400-13">CONTACTS</div>
  </div>
  <div class="inquire-open-info-links">
    <div class="contact-num-item" style="margin-bottom: 14px;">
      <a href="tel:+919779799705" class="tobias-300-26 hover-links">+91 97797 99705</a>
      <div class="contact-sub-label">LOCAL CALL, FEES MAY APPLY</div>
    </div>
    <div class="contact-num-item">
      <a href="tel:+919872400078" class="tobias-300-26 hover-links">+91 98724 00078</a>
      <div class="contact-sub-label">LOCAL CALL, FEES MAY APPLY</div>
    </div>
  </div>
</div>
</div>
<div class="inquire-open-right">`
);

// Toggle pill in drawer
html = html.replace(
  /<div class="form-heading-top">[\s\S]*?<\/div>\s*<div class="horizontal-line-wrap">/,
  `<div class="form-heading-top">
    <div class="form-interest">
      <div class="ball-interest"></div>
      <div class="untitled-400-13" id="inquire-modal-interest-label">REGISTER INTEREST</div>
      <div class="toggle-pill active" id="inquire-modal-toggle" role="button" tabindex="0">
        <div class="toggle-handle"></div>
      </div>
    </div>
    <div class="form-required">
      <div class="untitled-400-10">*REQUIRED FIELDS</div>
    </div>
  </div>
  <div class="horizontal-line-wrap">`
);

// Uppercase placeholders
html = html.replace(/placeholder="Fisrt Name\*"/g, 'placeholder="FIRST NAME*"');
html = html.replace(/placeholder="Last Name\*"/g, 'placeholder="LAST NAME*"');
html = html.replace(/placeholder="Email\*"/g, 'placeholder="EMAIL*"');
html = html.replace(/placeholder="Phone Number"/g, 'placeholder="PHONE NUMBER"');
html = html.replace(/placeholder="Request\*"/g, 'placeholder="REQUEST*"');

// Privacy policy uppercase
html = html.replace(
  /I have read and accept the[\s\S]*?privacy policy[\s\S]*?<\/span>/i,
  'I HAVE READ AND ACCEPT THE <a href="/privacy" privacy="link" target="_blank" class="form-politica-link">PRIVACY POLICY</a>.</span>'
);

// 4. Inject Enhanced CSS before </head>
const luxuryCss = `
<style id="custom-luxury-fixes">
  /* Fix gap and black overlay between Availability & Amenities */
  .availability-section, .amenities-section {
    box-shadow: none !important;
    margin-bottom: 0 !important;
  }
  .availability-scroll-absolute {
    background-color: transparent !important;
  }
  
  /* Navbar Active dot only - hide dots on all inactive links */
  .nav-ball {
    display: none !important;
  }
  .nav-link.w--current .nav-ball,
  .nav-link.active .nav-ball {
    display: block !important;
  }

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
  .availability-button:hover {
    background-color: #9e6443 !important;
    border-color: #9e6443 !important;
    color: #ffffff !important;
  }
  .availability-button:hover .untitled-400-13,
  .availability-button:hover * {
    color: #ffffff !important;
  }

  /* Luxury Inquire & Contact Overlay Styling matching reference design */
  .inquire-wrap {
    background-color: #0e0703 !important;
    padding: 40px 60px 48px !important;
  }
  .inquire-open {
    background-color: #0e0703 !important;
    z-index: 99999 !important;
  }
  .inquire-open-close {
    padding-bottom: 20px !important;
    padding-right: 0 !important;
  }
  .inquire-open-close .untitled-400-13 {
    color: #ffffff !important;
    font-size: 13px !important;
    letter-spacing: 0.18em !important;
    text-transform: uppercase !important;
    font-weight: 500 !important;
    transition: color 0.3s ease, opacity 0.3s ease !important;
  }
  .inquire-open-close .nav-ball {
    display: none !important;
  }
  .inquire-open-close a:hover .untitled-400-13 {
    color: #a27b58 !important;
    opacity: 0.85 !important;
  }
  [inquire="text"],
  [inquire="text"] .chars {
    opacity: 1 !important;
    font-family: 'Tobias', 'Cormorant Garamond', Georgia, serif !important;
    color: #ffffff !important;
    font-weight: 300 !important;
    font-size: clamp(64px, 7.5vw, 115px) !important;
    line-height: 0.88 !important;
    letter-spacing: 0.01em !important;
  }
  .inquire-open-info-title .untitled-400-13 {
    color: #a27b58 !important;
    font-size: 11px !important;
    letter-spacing: 0.16em !important;
    text-transform: uppercase !important;
    font-weight: 500 !important;
    margin-bottom: 14px !important;
  }
  .inquire-open-info-links a.tobias-300-26 {
    font-family: 'Tobias', 'Cormorant Garamond', Georgia, serif !important;
    font-size: clamp(20px, 1.8vw, 25px) !important;
    font-weight: 300 !important;
    line-height: 1.3 !important;
    color: #ffffff !important;
    text-transform: uppercase !important;
    letter-spacing: 0.02em !important;
    text-decoration: none !important;
    display: inline-block !important;
    transition: color 0.3s ease !important;
  }
  .inquire-open-info-links a.tobias-300-26:hover {
    color: #a27b58 !important;
  }
  .contact-sub-label {
    font-size: 9px !important;
    letter-spacing: 0.14em !important;
    text-transform: uppercase !important;
    color: rgba(255, 255, 255, 0.45) !important;
    margin-top: 4px !important;
    display: block !important;
  }
  .form-interest {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
  }
  .form-interest .untitled-400-13 {
    color: #ffffff !important;
    font-size: 12px !important;
    letter-spacing: 0.14em !important;
    text-transform: uppercase !important;
    font-weight: 500 !important;
  }
  .ball-interest {
    width: 6px !important;
    height: 6px !important;
    background-color: #ffffff !important;
    border-radius: 50% !important;
  }
  .form-required .untitled-400-10 {
    color: rgba(255, 255, 255, 0.45) !important;
    font-size: 10px !important;
    letter-spacing: 0.12em !important;
    text-transform: uppercase !important;
  }
  .c-text-field {
    background-color: transparent !important;
    border: none !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25) !important;
    border-radius: 0 !important;
    color: #ffffff !important;
    font-family: 'Montserrat', sans-serif !important;
    font-size: 11px !important;
    letter-spacing: 0.14em !important;
    text-transform: uppercase !important;
    padding: 10px 0 !important;
    box-shadow: none !important;
    outline: none !important;
    width: 100% !important;
    transition: border-color 0.3s ease !important;
  }
  .c-text-field:focus {
    border-bottom-color: #ffffff !important;
  }
  .c-text-field::placeholder {
    color: rgba(255, 255, 255, 0.45) !important;
    text-transform: uppercase !important;
    font-size: 11px !important;
    letter-spacing: 0.14em !important;
  }
  .form-checkbox {
    width: 15px !important;
    height: 15px !important;
    border-radius: 50% !important;
    border: 1.5px solid rgba(255, 255, 255, 0.5) !important;
    background-color: transparent !important;
    margin-right: 12px !important;
    transition: border-color 0.3s ease !important;
  }
  .form-checkbox.w--redirected-checked {
    border-color: #ffffff !important;
    background-color: transparent !important;
    position: relative !important;
  }
  .form-checkbox.w--redirected-checked::after {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .form-accept .w-form-label {
    color: rgba(255, 255, 255, 0.7) !important;
    font-size: 10px !important;
    letter-spacing: 0.1em !important;
    text-transform: uppercase !important;
  }
  .form-accept .form-politica-link {
    color: rgba(255, 255, 255, 0.9) !important;
    text-decoration: underline !important;
  }
  .form-button-wrapper {
    display: flex !important;
    justify-content: flex-end !important;
    align-items: flex-end !important;
    margin-top: 40px !important;
    width: 100% !important;
  }
  .form-botton {
    font-family: 'Tobias', 'Cormorant Garamond', Georgia, serif !important;
    font-size: clamp(75px, 8.5vw, 135px) !important;
    font-weight: 300 !important;
    line-height: 0.85 !important;
    color: #ffffff !important;
    background-color: transparent !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
    cursor: pointer !important;
    letter-spacing: 0.02em !important;
    text-transform: uppercase !important;
    text-align: right !important;
    outline: none !important;
    box-shadow: none !important;
    transition: color 0.4s ease, transform 0.3s ease !important;
  }
  .form-botton:hover {
    color: #a27b58 !important;
    transform: translateX(4px) !important;
  }
  .toggle-pill {
    width: 32px;
    height: 18px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.6);
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-block;
    margin-left: 14px;
    vertical-align: middle;
  }
  .toggle-pill.active {
    background-color: #ffffff;
    border-color: #ffffff;
  }
  .toggle-handle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #ffffff;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
  }
  .toggle-pill.active .toggle-handle {
    transform: translateX(14px);
    background-color: #0e0703;
  }

  /* Floorplan Modal Styling */
  .floorplan-modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background: rgba(14, 8, 5, 0.94);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s ease;
  }
  .floorplan-modal-backdrop.is-open {
    opacity: 1;
    pointer-events: auto;
  }
  .floorplan-modal-container {
    position: relative;
    width: 92vw;
    max-width: 1100px;
    max-height: 90vh;
    background: #190f0a;
    border: 1px solid rgba(194, 161, 128, 0.35);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 4px;
    transform: scale(0.96);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .floorplan-modal-backdrop.is-open .floorplan-modal-container {
    transform: scale(1);
  }
  .floorplan-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 24px;
    border-bottom: 1px solid rgba(194, 161, 128, 0.2);
    background: #140b07;
  }
  .floorplan-modal-title {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .floorplan-modal-badge {
    font-size: 10px;
    letter-spacing: 0.2em;
    color: #c2a180;
    text-transform: uppercase;
    font-family: Montserrat, sans-serif;
  }
  .floorplan-modal-title h3 {
    margin: 0;
    font-size: 20px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #ffffff;
    font-weight: 400;
    letter-spacing: 0.05em;
  }
  .floorplan-modal-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .floorplan-download-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 999px;
    background-color: #c2a180;
    color: #190f0a;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  .floorplan-download-btn:hover {
    background-color: #e5cdb2;
    color: #000;
  }
  .floorplan-close-btn {
    background: transparent;
    border: none;
    color: #c2a180;
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
    padding: 0 8px;
    transition: color 0.2s ease;
  }
  .floorplan-close-btn:hover {
    color: #ffffff;
  }
  .floorplan-modal-body {
    padding: 24px;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #100804;
  }
  .floorplan-modal-img {
    max-width: 100%;
    max-height: 72vh;
    object-fit: contain;
    border-radius: 2px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
</style>
`;

if (!html.includes('id="custom-luxury-fixes"')) {
  html = html.replace('</head>', `${luxuryCss}\n</head>`);
}

// 5. Inject Floorplan Lightbox Modal and Scripts before </body>
const bottomScripts = `
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
  // Floorplan Lightbox Modal Controller
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

  // Inquire Drawer Controller
  (function() {
    function initInquireController() {
      const inquireOpen = document.querySelector('.inquire-open');
      const inquireWrap = document.querySelector('.inquire-wrap');
      const closeBtn = document.getElementById('close-inquire') || document.querySelector('.inquire-close');
      const togglePill = document.getElementById('inquire-modal-toggle');
      const interestLabel = document.getElementById('inquire-modal-interest-label');
      let isRegisterInterest = true;

      if (togglePill) {
        togglePill.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          isRegisterInterest = !isRegisterInterest;
          togglePill.classList.toggle('active', isRegisterInterest);
          if (interestLabel) {
            interestLabel.textContent = isRegisterInterest ? 'REGISTER INTEREST' : 'SCHEDULE VISIT';
          }
        });
      }

      function openInquire(updateUrl = true) {
        if (!inquireOpen || !inquireWrap) return;
        inquireOpen.classList.remove('close');
        inquireWrap.classList.remove('close');
        document.body.classList.add('no-scroll-transition');

        const textChars = document.querySelectorAll('[inquire="text"], [inquire="text"] .chars');
        textChars.forEach(el => el.style.opacity = '1');

        if (updateUrl && window.location.pathname !== '/contact') {
          history.pushState({ modal: 'inquire' }, '', '/contact');
        }
      }

      function closeInquire(updateUrl = true) {
        if (!inquireOpen || !inquireWrap) return;
        inquireWrap.classList.add('close');
        document.body.classList.remove('no-scroll-transition');
        setTimeout(function() {
          inquireOpen.classList.add('close');
        }, 500);

        if (updateUrl && (window.location.pathname === '/contact' || window.location.hash.includes('inquire'))) {
          history.pushState(null, '', '/');
        }
      }

      window.openInquireModal = openInquire;
      window.closeInquireModal = closeInquire;

      const inquireTriggers = document.querySelectorAll('.nav-link.inquire, .cta-link.inquire, .inquire-cta-wrap, .big-cta');
      inquireTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
          e.preventDefault();
          openInquire(true);
        });
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
          e.preventDefault();
          closeInquire(true);
        });
      }

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && inquireOpen && !inquireOpen.classList.contains('close')) {
          closeInquire(true);
        }
      });

      window.addEventListener('popstate', function() {
        if (window.location.pathname === '/contact' || window.location.hash === '#inquire') {
          openInquire(false);
        } else if (inquireOpen && !inquireOpen.classList.contains('close')) {
          closeInquire(false);
        }
      });

      if (window.location.hash === '#inquire' || window.location.hash === '#contact') {
        setTimeout(function() { openInquire(false); }, 600);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initInquireController);
    } else {
      initInquireController();
    }
  })();
</script>
`;

if (!html.includes('id="floorplan-modal"')) {
  html = html.replace('</body>', `${bottomScripts}\n</body>`);
}

fs.writeFileSync('public/ananda_crown_clone.html', html, 'utf8');
console.log('Successfully updated public/ananda_crown_clone.html! New length:', html.length);
