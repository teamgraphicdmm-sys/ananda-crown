// Local server for the clone site (same content GitHub Pages serves).
// Usage:
//   npm run dev      -> http://localhost:3000/ (serves ./public, no build needed)
//   npm run preview  -> http://localhost:8080/ (serves ./out, exact CI artifact)
// Zero dependencies (built-in http/fs only).

const http = require("http");
const fs = require("fs");
const path = require("path");
const { createGzip } = require("zlib");

const ROOT = path.resolve(__dirname, process.argv[3] || "out");
const PRODUCTION = path.basename(ROOT) === "out";
const rawBase = (process.env.NEXT_PUBLIC_BASE_PATH || process.env.NEXT_BASE_PATH || "").replace(/^\/+|\/+$/g, "");
const BASE_PATH = rawBase ? "/" + rawBase : "";
const PORT = Number(process.env.PORT || process.argv[2] || 8080);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".txt": "text/plain; charset=utf-8",
};

http
  .createServer((req, res) => {
    let urlPath;
    try { urlPath = decodeURIComponent(req.url.split("?")[0]); }
    catch { res.writeHead(400); res.end("Bad URL"); return; }
    if (BASE_PATH && (urlPath === BASE_PATH || urlPath.startsWith(BASE_PATH + "/"))) urlPath = urlPath.slice(BASE_PATH.length) || "/";
    let file = path.join(ROOT, path.normalize(urlPath).replace(/^[/\\]+/, ""));
    if (file !== ROOT && !file.startsWith(ROOT + path.sep)) {
      res.writeHead(403);
      res.end("forbidden");
      return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, "index.html");
    }
    if (!fs.existsSync(file) && !path.extname(file)) {
      if (fs.existsSync(file + ".html")) file = file + ".html";
    }
    // Clone site entry points (legacy static HTML design)
    if (!fs.existsSync(file) && file === path.join(ROOT, "index.html")) {
      const clone = path.join(ROOT, "ananda_crown_clone.html");
      if (fs.existsSync(clone)) file = clone;
    }
    if (!fs.existsSync(file)) {
      const notFoundPage = path.join(ROOT, "404.html");
      if (fs.existsSync(notFoundPage)) {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        fs.createReadStream(notFoundPage).pipe(res);
        return;
      }
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("not found: " + urlPath);
      return;
    }
    const { size, mtimeMs } = fs.statSync(file);
    const etag = '"' + size.toString(16) + '-' + Math.round(mtimeMs).toString(16) + '"';
    res.setHeader("ETag", etag);
    res.setHeader("Cache-Control", PRODUCTION && /[?&]v=[a-f0-9]{12}/.test(req.url) ? "public, max-age=31536000, immutable" : "no-cache");
    if (req.headers["if-none-match"] === etag) { res.writeHead(304); res.end(); return; }
    const type = MIME[path.extname(file).toLowerCase()] || "application/octet-stream";
    // Range requests (required for <video> seeking / canvas frame scrubbing)
    const range = req.headers.range;
    if (range) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(range);
      const start = m && m[1] !== "" ? Number(m[1]) : 0;
      const end = m && m[2] !== "" ? Number(m[2]) : size - 1;
      if (Number.isNaN(start) || Number.isNaN(end) || start >= size || end >= size) {
        res.writeHead(416, { "Content-Range": `bytes */${size}` });
        res.end();
        return;
      }
      res.writeHead(206, {
        "Content-Type": type,
        "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
      });
      fs.createReadStream(file, { start, end }).pipe(res);
      return;
    }
    const compress = size > 1024 && /(?:text|javascript|json|svg)/.test(type) && /\bgzip\b/.test(req.headers["accept-encoding"] || "");
    const headers = { "Content-Type": type, "Accept-Ranges": "bytes", "Vary": "Accept-Encoding" };
    if (compress) headers["Content-Encoding"] = "gzip";
    else headers["Content-Length"] = size;
    res.writeHead(200, headers);
    if (req.method === "HEAD") { res.end(); return; }
    const stream = fs.createReadStream(file);
    if (compress) stream.pipe(createGzip()).pipe(res);
    else stream.pipe(res);
  })
  .listen(PORT, () => console.log(`preview: http://localhost:${PORT}${BASE_PATH}/  (serving ${ROOT})`));
