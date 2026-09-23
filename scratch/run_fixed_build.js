const fs = require('fs');

let html = fs.readFileSync('public/one24_source.html', 'utf8');

console.log('Original HTML loaded, length:', html.length);

// 1. Google Fonts Cormorant Garamond & Montserrat for editorial perfection
const fontLinks = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
`;
html = html.replace('<head>', `<head>${fontLinks}`);

// 2. Update Title and Meta
html = html.replace(/<title>.*?<\/title>/gi, '<title>Ananda Crown | Sector 78 Mohali - Ultra Luxury Residences</title>');
html = html.replace(/ONE24 \| Residence/g, 'Ananda Crown | Sector 78 Mohali');
html = html.replace(/CONFORT AND ELEGANCE AT MADEIRA ISLAND/g, 'COMFORT AND ELEGANCE IN SECTOR 78 MOHALI');
html = html.replace(/Comfort and elegance at Madeira Island/g, 'Comfort and elegance in Sector 78 Mohali');
html = html.replace(/Comfort and elegance at Madeira/g, 'Comfort and elegance in Mohali');

// 3. Navigation items in Webflow
html = html.replace(/<div class="untitled-400-13">the island<\/div>/g, '<div class="untitled-400-13">THE DESTINATION</div>');
html = html.replace(/<div class="untitled-400-13">apartments<\/div>/g, '<div class="untitled-400-13">RESIDENCES</div>');
html = html.replace(/<div class="untitled-400-13">home<\/div>/g, '<div class="untitled-400-13">HOME</div>');
html = html.replace(/<div class="untitled-400-13">vision<\/div>/g, '<div class="untitled-400-13">VISION</div>');
html = html.replace(/<div class="untitled-400-13">location<\/div>/g, '<div class="untitled-400-13">LOCATION</div>');
html = html.replace(/<div class="untitled-400-13">Availability<\/div>/g, '<div class="untitled-400-13">AVAILABILITY</div>');
html = html.replace(/<div class="untitled-400-13">inquire<\/div>/g, '<div class="untitled-400-13">INQUIRE</div>');
html = html.replace(/<a href="\/pt" class="nav-link lingua w-inline-block">[\s\S]*?<\/a>/g, '');

// Add top-left logo with ZERO background color directly before nav
html = html.replace(
  /<nav class="nav">/i,
  '<a href="#home" class="ref-top-logo" aria-label="Ananda Crown"><img src="/images/logo-clean-transparent.png" alt="Ananda Crown" class="ref-top-logo-img" /></a><nav class="nav">'
);

// 4. Brand Name ONE24 / ONE 24
html = html.replace(/ONE24/g, 'ANANDA CROWN');
html = html.replace(/ONE 24/g, 'ANANDA CROWN');
html = html.replace(/Edificio ONE 24/gi, 'Ananda Crown Mohali');
html = html.replace(/EDIFICIO ONE 24/gi, 'Ananda Crown Sector 78');
html = html.replace(/Apartamento ONE 24/gi, 'Ananda Crown Skydeck');
html = html.replace(/Sala ONE 24/gi, 'Ananda Crown Grand Living');
html = html.replace(/Cozinha ONE 24/gi, 'Ananda Crown Gourmet Kitchen');
html = html.replace(/Quarto ONE 24/gi, 'Ananda Crown Master Suite');

// 5. Update Phone Numbers
html = html.replace(/\+351 291 147 686/g, '+91 97797 99705');
html = html.replace(/\+351 291  147 686/g, '+91 97797 99705');
html = html.replace(/\+351 967 182 444/g, '+91 98724 00078');
html = html.replace(/tel:\+351291147686/g, 'tel:+919779799705');
html = html.replace(/tel:\+351967182444/g, 'tel:+919872400078');

// 6. Update Address & Maps Links
html = html.replace(/Av\. Arriaga 75 Loja A, Marina Shopping 9000-065 Funchal/g, 'Sector 78, SAS Nagar, Mohali, Punjab 140308');
html = html.replace(/Av\. Arriaga 75 Loja A, Marina Shopping <br\/>9000-065 Funchal/g, 'Sector 78, SAS Nagar, Mohali, Punjab 140308');
html = html.replace(/https:\/\/goo\.gl\/maps\/okYjeK9wPskFLS179/g, 'https://maps.google.com/?q=Sector+78+Mohali+Punjab');
html = html.replace(/https:\/\/maps\.app\.goo\.gl\/gpnGN3DZZUzTdrVb6\?g_st=iwb/g, 'https://maps.google.com/?q=Sector+78+Mohali+Punjab');

// 7. Update Marquee ticker text
html = html.replace(/in heart of funchal/gi, 'in heart of sector 78 mohali');

// 8. Replace Hero Section Content (PRIOR to changing hero image URL to ensure exact bounds matching)
const heroComponentStart = '<div class="hero-component">';

const newHeroComponentHTML = `
<div class="ref-hero-container">
  <!-- Mid-Left Hero Content with Strict Uniform Left Alignment -->
  <div class="ref-hero-text-block">
    <!-- Eyebrow: Copper line + SOPHISTICATION (Copper) LIVES HERE (Dark Espresso) -->
    <div class="ref-hero-eyebrow">
      <span class="ref-hero-eyebrow-line"></span>
      <span class="ref-hero-eyebrow-word-copper">SOPHISTICATION</span>
      <span class="ref-hero-eyebrow-word-dark">LIVES HERE</span>
    </div>

    <!-- Main Headline: Comfort and (Dark Espresso) Elegance (Golden Terracotta Italic) -->
    <h1 load="anim" class="ref-hero-heading">
      <span class="ref-hero-comfort">Comfort and</span><br />
      <span class="ref-hero-elegance">Elegance</span>
    </h1>

    <!-- Location Subtitle: IN SECTOR 78 MOHALI -->
    <div class="ref-hero-location">IN SECTOR 78 MOHALI</div>

    <!-- Olive-Bronze Divider Line -->
    <div class="ref-hero-divider"></div>

    <!-- EXPLORE RESIDENCES CTA with Outlined Circular Arrow -->
    <div class="ref-hero-cta-wrap">
      <a href="#apartments" class="ref-hero-cta">
        <span class="ref-hero-cta-label">EXPLORE RESIDENCES</span>
        <div class="ref-hero-arrow-circle">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <polyline points="13 5 20 12 13 19"></polyline>
          </svg>
        </div>
      </a>
    </div>
  </div>

  <!-- Bottom Row: Phone & Location (Left) | Vertical SCROLL (Right) -->
  <div class="ref-hero-bottom">
    <div class="ref-hero-bottom-left">
      <a href="tel:+919779799705" class="ref-bottom-contact-item">
        <svg class="ref-bottom-icon" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.12.45 2.33.69 3.48.69a1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.15.24 2.36.69 3.48a1 1 0 01-.21 1.11l-2.36 2.2z"/>
        </svg>
        <span>+91 97797 99705</span>
      </a>

      <span class="ref-bottom-sep">|</span>

      <a href="#location" class="ref-bottom-contact-item">
        <svg class="ref-bottom-icon" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span>Sector 78, Mohali</span>
      </a>
    </div>

    <div class="ref-hero-bottom-right hero-scroll">
      <a href="#vision" class="ref-scroll-link">
        <span class="ref-scroll-text">SCROLL</span>
        <div class="ref-scroll-line"></div>
        <div class="ref-scroll-circle"></div>
      </a>
    </div>
  </div>
</div>
`;

const startIdx = html.indexOf(heroComponentStart);
const heroImgIdx = html.indexOf('6405d4c052dec18e7d8789b9_hero.webp', startIdx);
const lastDiv2 = html.lastIndexOf('</div>', heroImgIdx);
const lastDiv1 = html.lastIndexOf('</div>', lastDiv2 - 1);
const endIdx = lastDiv1;
if (startIdx !== -1 && heroImgIdx !== -1) {
  html = html.substring(0, startIdx + heroComponentStart.length) + newHeroComponentHTML + html.substring(endIdx);
  console.log('Successfully replaced hero-component content with exact div balance.');
} else {
  console.error('Could not find hero-component bounds!');
}

// 9. Replace Hero Background with Animated Sunset Image and Overlay
html = html.replace(
  /<img [^>]*class="hero-img-background"[^>]*>/i,
  '<img src="/images/hero-building-sunset.png" alt="Ananda Crown Sector 78 Mohali" class="hero-image-background animate-hero-zoom" /><div class="hero-img-gradient"></div>'
);

// 10. (Hero overlay kept as .hero-img-gradient)

// 11. Update Footer & Pedigree
html = html.replace(/an exclusive<br\/>/g, 'developed by<br/>');
html = html.replace(/https:\/\/bemineproperties\.com\//g, '#home');
html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/6405d4c052dec18e7d8789b9_hero\.webp/g, '/images/ananda-building.png');
html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/63d3bab7fb9a02f1f85b4adf_exclusive\.webp/g, '/images/logo-clean-transparent.png');
html = html.replace(/©ONE24 - 2023\. ALL RIGHTS RESERVED\./g, '©ANANDA CROWN - 2026. RERA: PBRERA-SAS81-PR1421-082026. ALL RIGHTS RESERVED.');
html = html.replace(/designed by duall©/g, 'crafted for ananda crown');
html = html.replace(/https:\/\/duallstudio\.com/g, '#');
html = html.replace(/complaint book<br\/>/g, 'punjab rera portal<br/>');
html = html.replace(/https:\/\/www\.livroreclamacoes\.pt\/INICIO\//g, 'https://rera.punjab.gov.in');

// 12. Replace Vision Images
html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/6411a4b4d1a0ba3eb1887e64_one-24%20\(1\)\.webp/g, '/images/crown-arrived.webp');
html = html.replace(/srcset="[^"]*one-24[^"]*"/gi, 'srcset="/images/crown-arrived.webp 1200w"');
html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/640605b828c86d2a9487bb88_vision\.webp/g, '/images/wait-is-over.webp');

// 13. Replace Apartment / Residences Images with high-res luxury visuals
html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/640623a27b5c66fa68701f66_apartment-1\.webp/g, '/images/wait-is-over.webp');
html = html.replace(/srcset="[^"]*apartment-1[^"]*"/gi, 'srcset="/images/wait-is-over.webp 1200w"');

html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/640623a3a5bff942b070fac8_apartment-2\.webp/g, '/images/crown-arrived.webp');
html = html.replace(/srcset="[^"]*apartment-2[^"]*"/gi, 'srcset="/images/crown-arrived.webp 1200w"');

html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/640623a3c2a727a3d26ebd2d_apartment-3\.webp/g, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80');
html = html.replace(/srcset="[^"]*apartment-3[^"]*"/gi, 'srcset="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80 1200w"');

html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/640623a37b5c66566c701f67_apartment-4\.webp/g, 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80');
html = html.replace(/srcset="[^"]*apartment-4[^"]*"/gi, 'srcset="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80 1200w"');

// 14. Replace Location Big Image
html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/64070b5af80a800a9c6bf1d9_big-img\.webp/g, '/images/crown-arrived.webp');
html = html.replace(/srcset="[^"]*big-img[^"]*"/gi, 'srcset="/images/crown-arrived.webp 1200w"');

// 15. Replace Inquire Background Image
html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/640753df75ae157db4ba17d5_inquire\.webp/g, '/images/wait-is-over.webp');
html = html.replace(/srcset="[^"]*inquire[^"]*"/gi, 'srcset="/images/wait-is-over.webp 1200w"');

// 16. Replace transition images
html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/64061e47a47c5fe13ae8f44c_img-2\.webp/g, '/images/crown-arrived.webp');
html = html.replace(/srcset="[^"]*img-2[^"]*"/gi, 'srcset="/images/crown-arrived.webp 1200w"');

// 17. Fix local CSS & JS references
html = html.replace(/https:\/\/assets-global\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/css\/one24\.webflow\.54f8ed0ce\.css/g, '/one24.css');
html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/6440fcdd9913381980813a0b_one24\.txt/g, '/one24.js');

// 18. Update Typologies & Apartment Numbers in Specs
html = html.replace(/<div class="untitled-400-13">typologies<\/div><\/div><div class="ap-info-text-wrap-right"><div class="untitled-400-13">t1; t2; t3 duplex<\/div>/gi, '<div class="untitled-400-13">typologies</div></div><div class="ap-info-text-wrap-right"><div class="untitled-400-13">3 BHK, 4 BHK, 5 BHK Penthouse</div>');
html = html.replace(/<div class="untitled-400-13">funchal<\/div>/gi, '<div class="untitled-400-13">Sector 78, Mohali</div>');
html = html.replace(/<div class="untitled-400-13">Release date<\/div><\/div><div class="ap-info-text-wrap-right"><div class="untitled-400-13">2023<\/div>/gi, '<div class="untitled-400-13">Possession</div></div><div class="ap-info-text-wrap-right"><div class="untitled-400-13">2026 - 2027</div>');
html = html.replace(/<div class="untitled-400-13">Nr\. OF APARTMENTS<\/div><\/div><div class="ap-info-text-wrap-right"><div class="untitled-400-13">13<\/div>/gi, '<div class="untitled-400-13">Elevation</div></div><div class="ap-info-text-wrap-right"><div class="untitled-400-13">G+30 Towers</div>');

// 19. Update Vision text
html = html.replace(
  /Featuring straight lines and modern amenities, our development will offer residents the ultimate in style and comfort\. our vision is to set a new standard for luxury living on Madeira Island\./gi,
  'Featuring 11.5 ft slab-to-slab clear ceiling heights, 600 ft frontage, and master architecture by IE Design and landscape by Oracles, Ananda Crown sets a new benchmark for ultra-luxury residential living in Mohali.'
);

// 20. Update Destination / Island text
html = html.replace(
  /<h2 class="untitled-400-13">the island<\/h2>/gi,
  '<h2 class="untitled-400-13">the destination</h2>'
);
html = html.replace(
  /Experience the Best of Island/gi,
  'Experience the Best of Urban Royalty'
);
html = html.replace(
  /Living on Madeira/gi,
  'Living in Mohali'
);
html = html.replace(
  /Living on ANANDA CROWN offers a chance to experience the island&#x27;s lush green landscapes.*?something for everyone\./gi,
  'Living at Ananda Crown offers a rare harmony: the wide tree-lined boulevards and planned geometric calm of the Chandigarh Capital Region, coupled with Mohali\'s surging economic pulse and international stature. With immediate access to PCA Stadium, premier healthcare at Sohana & Fortis, and 15 minutes to Shaheed Bhagat Singh International Airport, experience urban royalty at its peak.'
);

// 21. Update Location cards (n1, n2, n3)
html = html.replace('Our luxurious Living in Mohali Island is nestled in the heart of nature&#x27;s paradise. The island is known for its stunning landscapes and unique flora and fauna, and our development puts you right in the middle of it all.', 'Our luxurious residences in Sector 78 Mohali are nestled along open green corridors and master-planned parks. Away from chaotic urban noise yet centrally positioned, offering unobstructed panoramic views of the sunrise and Shivalik horizons.');
html = html.replace(/Our luxurious living on [^<]+? is nestled in the heart of nature&#x27;s paradise\..*?middle of it all\./gi, 'Our luxurious residences in Sector 78 Mohali are nestled along open green corridors and master-planned parks. Away from chaotic urban noise yet centrally positioned, offering unobstructed panoramic views of the sunrise and Shivalik horizons.');
html = html.replace(
  /Our development is in close proximity to top-rated schools.*?golfing, sailing and more\./gi,
  'Our development is in close proximity to top-rated schools (YPS, Learning Paths), world-class healthcare facilities (Sohana Multispecialty, Fortis Hospital), and recreational hubs like I.S. Bindra PCA Stadium.'
);
html = html.replace(
  /Not only are you situated in the heart of the island.*?business or pleasure\./gi,
  'Direct arterial access to PR-7 / Airport Road places Shaheed Bhagat Singh International Airport (IXC) just 15 minutes away. Rapid highway corridors link you effortlessly to IT City, Aerocity, Chandigarh Sector 17, and the Himalayan foothills.'
);

// 22. Update Brochure URL
html = html.replace(
  /https:\/\/assets\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/641c3cf78742cca56900b63c_ANANDA%20CROWN_catalogo_compressed\.pdf/g,
  '#availability'
);

// 23. Add Complete Styling Overrides matching ChatGPT Image Sep 16, 2026, 05_59_01 PM.png
const customStyle = `
<style>
/* Remove Webflow Badge */
.w-webflow-badge, .w-webflow-badge *, a[href*="webflow.com"] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  width: 0 !important;
  height: 0 !important;
}

:root {
  --brand-primary: #30160e;
  --brand-secondary: #573024;
  --brand-light: #c2a180;
  --brand-dark: #221814;
  --brand-terracotta: #9e6443;
}

/* ==========================================================================
   HERO VIDEO BACKGROUND & ZERO OVERLAYS
   ========================================================================== */
.hero-section {
  position: relative !important;
  width: 100vw !important;
  height: 100vh !important;
  overflow: hidden !important;
  background: transparent !important;
}

.hero-image-background,
.hero-video-background {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
  z-index: 1 !important;
  filter: none !important;
  will-change: transform !important;
  animation: heroZoom 20s ease-in-out infinite !important;
}

@keyframes heroZoom {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
}

/* Hero Video / Image Overlay */
.hero-img-gradient {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background-color: rgba(0, 0, 0, 0.4) !important;
  z-index: 2 !important;
  pointer-events: none !important;
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}

/* Reset .page-padding and .hero-component to take full screen without blocking */
.hero-section .page-padding {
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  position: relative !important;
  z-index: 10 !important;
}

.hero-component {
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  display: block !important;
  position: relative !important;
}

/* ==========================================================================
   TOP-LEFT LOGO: ZERO BACKGROUND COLOR, TRANSPARENT
   ========================================================================== */
.ref-top-logo {
  position: fixed !important;
  top: 24px !important;
  left: clamp(40px, 5vw, 90px) !important;
  width: 72px !important;
  height: 72px !important;
  background: transparent !important; /* NO BACKGROUND COLOR */
  border: none !important;            /* NO BORDER */
  box-shadow: none !important;        /* NO SHADOW */
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 1001 !important;
  text-decoration: none !important;
  transition: transform 0.3s ease !important;
}
.ref-top-logo:hover {
  transform: scale(1.05) !important;
}
.ref-top-logo-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  display: block !important;
  background: transparent !important;
}

/* ==========================================================================
   TOP NAVIGATION: TRANSPARENT, CENTERED, EDITORIAL TRACKING
   ========================================================================== */
.nav {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 80px !important;
  background: transparent !important;
  padding: 0 clamp(40px, 5vw, 90px) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  z-index: 1000 !important;
}

.nav-links-component {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: clamp(24px, 2.5vw, 44px) !important;
  margin: 0 auto !important;
}

.nav-link {
  text-decoration: none !important;
  position: relative !important;
  display: inline-flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

.nav-link .untitled-400-13 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11px !important;
  font-weight: 500 !important;
  letter-spacing: 0.22em !important;
  text-transform: uppercase !important;
  color: #221814 !important;
  transition: color 0.3s ease !important;
}
.nav-link:hover .untitled-400-13 {
  color: #9e6443 !important;
}

/* Active underline on home */
.nav-link.home::after {
  content: '' !important;
  display: block !important;
  width: 22px !important;
  height: 1.5px !important;
  background-color: #221814 !important;
  margin-top: 4px !important;
}

/* Hide original Webflow nav dots on the hero */
.nav-ball {
  display: none !important;
}

/* Right Inquire Link */
.nav-link-inquire {
  display: inline-flex !important;
  align-items: center !important;
  margin-left: 0 !important;
}
.nav-link-inquire::before {
  content: '|' !important;
  color: rgba(34, 24, 20, 0.4) !important;
  font-size: 14px !important;
  margin-right: 20px !important;
  font-weight: 300 !important;
}
.nav-link.inquire .untitled-400-13 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11px !important;
  font-weight: 500 !important;
  letter-spacing: 0.22em !important;
  text-transform: uppercase !important;
  color: #221814 !important;
}

/* ==========================================================================
   HERO CONTENT: STRICT VERTICAL ALIGNMENT, ACCURATE COLOR & SIZE
   ========================================================================== */
.ref-hero-container {
  position: relative !important;
  width: 100% !important;
  height: 100vh !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  padding: 110px clamp(40px, 5vw, 90px) 36px clamp(40px, 5vw, 90px) !important;
  box-sizing: border-box !important;
  pointer-events: none !important;
}

.ref-hero-text-block {
  max-width: 680px !important;
  margin-top: auto !important;
  margin-bottom: auto !important;
  pointer-events: auto !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  text-align: left !important;
}

/* Eyebrow line & text */
.ref-hero-eyebrow {
  display: inline-flex !important;
  align-items: center !important;
  gap: 14px !important;
  margin-bottom: 24px !important;
  animation: refFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both !important;
}

.ref-hero-eyebrow-line {
  width: 38px !important;
  height: 1.5px !important;
  background-color: #9e6443 !important;
  display: inline-block !important;
}

.ref-hero-eyebrow-word-copper {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  letter-spacing: 0.28em !important;
  text-transform: uppercase !important;
  color: #8c5d3d !important;
}

.ref-hero-eyebrow-word-dark {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11px !important;
  font-weight: 500 !important;
  letter-spacing: 0.28em !important;
  text-transform: uppercase !important;
  color: #2b221d !important;
  margin-left: -6px !important;
}

/* Main Display Heading */
.ref-hero-heading {
  font-family: 'Cormorant Garamond', Georgia, serif !important;
  font-size: clamp(52px, 5.8vw, 86px) !important;
  line-height: 1.05 !important;
  letter-spacing: -0.01em !important;
  margin: 0 0 16px 0 !important;
  padding: 0 !important;
  text-align: left !important;
  animation: refFadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both !important;
}

.ref-hero-comfort {
  font-weight: 400 !important;
  color: #221814 !important;
}

/* Elegance in rich warm golden terracotta italic */
.ref-hero-elegance {
  font-style: italic !important;
  font-weight: 400 !important;
  color: #9e6443 !important;
}

/* Location: IN SECTOR 78 MOHALI */
.ref-hero-location {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 500 !important;
  letter-spacing: 0.35em !important;
  text-transform: uppercase !important;
  color: #2b221d !important;
  margin-bottom: 24px !important;
  text-align: left !important;
  animation: refFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both !important;
}

/* Olive-Bronze Divider Line */
.ref-hero-divider {
  width: 44px !important;
  height: 1.5px !important;
  background-color: #7d7265 !important;
  margin-bottom: 28px !important;
  animation: refFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both !important;
}

/* CTA: EXPLORE RESIDENCES (→) */
.ref-hero-cta-wrap {
  animation: refFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both !important;
}

.ref-hero-cta {
  display: inline-flex !important;
  align-items: center !important;
  gap: 18px !important;
  text-decoration: none !important;
  cursor: pointer !important;
  transition: transform 0.3s ease !important;
}
.ref-hero-cta:hover {
  transform: translateX(4px) !important;
}

.ref-hero-cta-label {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 600 !important;
  letter-spacing: 0.25em !important;
  text-transform: uppercase !important;
  color: #221814 !important;
  transition: color 0.3s ease !important;
}
.ref-hero-cta:hover .ref-hero-cta-label {
  color: #9e6443 !important;
}

.ref-hero-arrow-circle {
  width: 42px !important;
  height: 42px !important;
  border-radius: 50% !important;
  border: 1px solid #3a281e !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #221814 !important;
  background: transparent !important;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.ref-hero-cta:hover .ref-hero-arrow-circle {
  border-color: #221814 !important;
  background-color: #221814 !important;
  color: #f7f2ed !important;
  transform: scale(1.06) !important;
}

/* ==========================================================================
   BOTTOM ROW: WARM CREAM / OFF-WHITE COLOR FOR CRISP LEGIBILITY OVER TREES
   ========================================================================= */
.ref-hero-bottom {
  display: flex !important;
  align-items: flex-end !important;
  justify-content: space-between !important;
  width: 100% !important;
  pointer-events: auto !important;
  animation: refFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both !important;
}

.ref-hero-bottom-left {
  display: inline-flex !important;
  align-items: center !important;
  gap: 16px !important;
}

.ref-bottom-contact-item {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  text-decoration: none !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  letter-spacing: 0.06em !important;
  color: #f2e8dc !important; /* WARM CREAM */
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5) !important;
  transition: color 0.3s ease !important;
}
.ref-bottom-contact-item:hover {
  color: #c2a180 !important;
}

.ref-bottom-icon {
  color: #f2e8dc !important;
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.4)) !important;
}

.ref-bottom-sep {
  color: rgba(242, 232, 220, 0.5) !important;
  font-size: 16px !important;
  font-weight: 300 !important;
}

/* Vertical SCROLL Indicator */
.ref-hero-bottom-right {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

.ref-scroll-link {
  display: inline-flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 6px !important;
  text-decoration: none !important;
  cursor: pointer !important;
  transition: opacity 0.3s ease !important;
}
.ref-scroll-link:hover {
  opacity: 0.8 !important;
}

.ref-scroll-text {
  writing-mode: vertical-rl !important;
  transform: rotate(180deg) !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 9.5px !important;
  font-weight: 600 !important;
  letter-spacing: 0.32em !important;
  text-transform: uppercase !important;
  color: #f2e8dc !important;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5) !important;
}

.ref-scroll-line {
  width: 1px !important;
  height: 36px !important;
  background-color: #f2e8dc !important;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5) !important;
  animation: refScrollBob 2.2s infinite ease-in-out !important;
}

.ref-scroll-circle {
  width: 8px !important;
  height: 8px !important;
  border-radius: 50% !important;
  border: 1px solid #f2e8dc !important;
  background: transparent !important;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5) !important;
}

/* ==========================================================================
   ANIMATION KEYFRAMES
   ========================================================================== */
@keyframes refFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes refScrollBob {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
}

/* Clean up rest of page styles */
.vision-img-brown, .img-background, .location-background {
  background-color: #573024 !important;
}
.horizontal-line, .vertical-line, .location-update-line, .horizontal-line.grey {
  background-color: rgba(194, 161, 128, 0.25) !important;
}
.c-text-field {
  background-color: #573024 !important;
  border: 1px solid rgba(194, 161, 128, 0.3) !important;
  color: #f7f2ed !important;
}
.form-botton {
  background-color: #c2a180 !important;
  color: #30160e !important;
}
.availability-button {
  border-color: #c2a180 !important;
  color: #c2a180 !important;
}
.vision-hover-text, .main-color {
  color: #c2a180 !important;
}
</style>
<script>
(function() {
  function removeWebflowBadge() {
    var badges = document.querySelectorAll('.w-webflow-badge, a[href*="webflow.com"]');
    badges.forEach(function(b) {
      b.remove();
    });
  }
  removeWebflowBadge();
  document.addEventListener('DOMContentLoaded', removeWebflowBadge);
  window.addEventListener('load', removeWebflowBadge);
  var observer = new MutationObserver(function() {
    removeWebflowBadge();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
</script>
`;

html = html.replace('</head>', `${customStyle}</head>`);

// Write out final file
fs.writeFileSync('public/ananda_crown_clone.html', html);
console.log('Successfully generated public/ananda_crown_clone.html, bytes:', html.length);
