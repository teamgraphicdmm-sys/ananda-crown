/**
 * Leadership Cards Asset Preparation Script
 * Builds optimized rounded cards with warm peach-to-orange gradient styling
 * matching refe/c73b1b92-2ef0-4f92-ac37-a881b71cedd1.webp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function prepareLeadershipAssets() {
  const w = 800;
  const h = 1000;
  const foundersDir = path.resolve(__dirname, '../public/images/founders');

  const maskSvg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" rx="50" fill="#fff" />
  </svg>`;

  const orangeGradientSvg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F8E2D2" />
        <stop offset="45%" stop-color="#FAAE7A" />
        <stop offset="100%" stop-color="#FE7823" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" rx="50" fill="url(#g)" />
  </svg>`;

  const warmOverlaySvg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F8E2D2" stop-opacity="0.2" />
        <stop offset="50%" stop-color="#FAAE7A" stop-opacity="0.1" />
        <stop offset="85%" stop-color="#FE7823" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#E85719" stop-opacity="0.65" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#glow)" />
  </svg>`;

  // 1. Anuj Card with Reference Orange Gradient
  if (fs.existsSync(path.join(foundersDir, 'anuj_transparent.webp'))) {
    const bg = await sharp(Buffer.from(orangeGradientSvg)).png().toBuffer();
    const fg = await sharp(path.join(foundersDir, 'anuj_transparent.webp'))
      .resize(750, 937, { fit: 'contain' })
      .toBuffer();
    await sharp(bg)
      .composite([{ input: fg, gravity: 'south' }])
      .webp({ quality: 90 })
      .toFile(path.join(foundersDir, 'anuj_card_orange.webp'));
  }

  // 2. Sahil Card with Warm Ambient Glow
  if (fs.existsSync(path.join(foundersDir, 'sahil_card.optimized.webp'))) {
    const base = await sharp(path.join(foundersDir, 'sahil_card.optimized.webp'))
      .resize(w, h, { fit: 'cover', position: 'top' })
      .toBuffer();
    await sharp(base)
      .composite([
        { input: Buffer.from(warmOverlaySvg), blend: 'over' },
        { input: Buffer.from(maskSvg), blend: 'dest-in' }
      ])
      .webp({ quality: 92 })
      .toFile(path.join(foundersDir, 'sahil_card_warm.webp'));
  }

  // 3. Anuj Office Studio Card
  if (fs.existsSync(path.join(foundersDir, 'anuj-office.webp'))) {
    await sharp(path.join(foundersDir, 'anuj-office.webp'))
      .resize(w, h, { fit: 'cover', position: 'center' })
      .composite([{ input: Buffer.from(maskSvg), blend: 'dest-in' }])
      .webp({ quality: 90 })
      .toFile(path.join(foundersDir, 'anuj_office_card.webp'));
  }

  // 4. Sahil Portrait Card
  if (fs.existsSync(path.join(foundersDir, 'Warm Bokeh Corporate Portrait.optimized.webp'))) {
    await sharp(path.join(foundersDir, 'Warm Bokeh Corporate Portrait.optimized.webp'))
      .resize(w, h, { fit: 'cover', position: 'top' })
      .composite([{ input: Buffer.from(maskSvg), blend: 'dest-in' }])
      .webp({ quality: 90 })
      .toFile(path.join(foundersDir, 'sahil_portrait_card.webp'));
  }

  console.log('Leadership assets successfully generated.');
}

prepareLeadershipAssets().catch(console.error);
