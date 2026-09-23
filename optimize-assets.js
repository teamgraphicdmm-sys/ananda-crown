// One-time (re-runnable) asset optimizer for the clone site.
// - Finds local raster images (png/jpg) referenced by the clone + contact HTML
// - Re-encodes files >400KB to WebP (max 1920px, q78) beside the original
// - Rewrites refs (src/href/srcset) in both HTML files to the .webp version
// - Skips favicons/icons (.ico, favicon*, apple-touch-icon*)
// Run: node optimize-assets.js

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = __dirname;
const HTML_FILES = ["public/ananda_crown_clone.html", "public/contact.html"];
const SIZE_THRESHOLD = 400 * 1024;
const MAX_DIM = 1920;

function collectRefs(html) {
  const refs = new Set();
  const attrRe = /(?:src|href)="(\/[^"]+?\.(png|jpe?g))"/gi;
  let m;
  while ((m = attrRe.exec(html)) !== null) refs.add(m[1]);
  const srcsetRe = /srcset="([^"]*)"/gi;
  while ((m = srcsetRe.exec(html)) !== null) {
    for (const part of m[1].split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (/^\/[^/].*\.(png|jpe?g)$/i.test(url)) refs.add(url);
    }
  }
  return [...refs].filter(
    (u) => !/favicon|apple-touch-icon|\.ico$/i.test(u)
  );
}

(async () => {
  const htmlMap = new Map(
    HTML_FILES.map((f) => [f, fs.readFileSync(path.join(ROOT, f), "utf8")])
  );
  const allRefs = new Set();
  for (const [, html] of htmlMap) collectRefs(html).forEach((r) => allRefs.add(r));

  console.log(`Found ${allRefs.size} referenced raster images`);
  let totalOld = 0;
  let totalNew = 0;
  const converted = [];

  for (const ref of allRefs) {
    const file = path.join(ROOT, "public", ref.replace(/^\/+/, "").split("?")[0]);
    if (!fs.existsSync(file)) {
      console.log(`  SKIP (missing): ${ref}`);
      continue;
    }
    const { size } = fs.statSync(file);
    if (size <= SIZE_THRESHOLD) continue;
    const webpFile = file.replace(/\.(png|jpe?g)$/i, ".webp");
    await sharp(file)
      .resize({ width: MAX_DIM, height: MAX_DIM, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(webpFile);
    const newSize = fs.statSync(webpFile).size;
    totalOld += size;
    totalNew += newSize;
    converted.push({ ref, webpRef: ref.replace(/\.(png|jpe?g)$/i, ".webp"), size, newSize });
    console.log(
      `  ${(size / 1048576).toFixed(1)}MB -> ${(newSize / 1048576).toFixed(1)}MB : ${ref}`
    );
  }

  for (const [f, html] of htmlMap) {
    let out = html;
    for (const c of converted) {
      out = out.split(c.ref).join(c.webpRef);
    }
    if (out !== html) {
      fs.writeFileSync(path.join(ROOT, f), out);
      console.log(`Updated refs in ${f}`);
    }
  }

  console.log(
    `\nTotal: ${(totalOld / 1048576).toFixed(1)}MB -> ${(totalNew / 1048576).toFixed(1)}MB ` +
      `(${converted.length} files, saved ${((totalOld - totalNew) / 1048576).toFixed(1)}MB)`
  );
  console.log("Delete the original heavy files only after verifying the site.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
