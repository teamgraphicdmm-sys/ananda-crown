// Post-build step for GitHub Pages: serve the legacy clone design
// (public/ananda_crown_clone.html + public/contact.html) as the live site
// instead of the Next.js React app.
//
// - Copies out/ananda_crown_clone.html -> out/index.html (site root)
// - Copies out/contact.html -> out/contact/index.html (/contact/ route)
// - Prefixes root-absolute asset/route refs (src, href, srcset, action,
//   poster) with the Pages basePath, e.g. /ananda-crown, so assets resolve
//   on project sites (https://<user>.github.io/<repo>/).
// - Remote URLs (http/https, //protocol-relative) are left untouched.
//
// Base path source: NEXT_PUBLIC_BASE_PATH or NEXT_BASE_PATH (set by
// .github/workflows/deploy.yml from the repo name; empty for local builds
// and <user>.github.io user sites).

const fs = require("fs");
const path = require("path");

const raw = (process.env.NEXT_PUBLIC_BASE_PATH || process.env.NEXT_BASE_PATH || "")
  .trim()
  .replace(/^\/+|\/+$/g, "");
const base = raw ? `/${raw}` : "";

const outDir = path.join(__dirname, "out");

function prefixRootRefs(html) {
  // srcset="..." may hold several comma-separated root-absolute URLs
  html = html.replace(/srcset="([^"]*)"/gi, (m, val) => {
    const fixed = val.replace(/(^|,\s*)\/(?!\/)/g, `$1${base}/`);
    return `srcset="${fixed}"`;
  });
  // src="..." href="..." action="..." poster="..." (skip // URLs)
  html = html.replace(/((?:src|href|action|poster)=")\/(?!\/)/gi, `$1${base}/`);
  return html;
}

function publish(srcFile, destFile) {
  const src = path.join(outDir, srcFile);
  const dest = path.join(outDir, destFile);
  if (!fs.existsSync(src)) {
    console.error(`export-clone: missing ${src} — run "npm run build" first`);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, prefixRootRefs(fs.readFileSync(src, "utf8")));
  console.log(`export-clone: ${srcFile} -> ${destFile} (base="${base}")`);
}

publish("ananda_crown_clone.html", "index.html");
publish("contact.html", path.join("contact", "index.html"));

// Keep the React /privacy page (out/privacy/index.html from next build)
// as the target of the clone's privacy links.
console.log("export-clone: done");
