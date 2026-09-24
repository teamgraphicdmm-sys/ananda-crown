// Local server for the clone site (same content GitHub Pages serves).
// Usage:
//   npm run dev      -> http://localhost:3000/ (serves ./public, no build needed)
//   npm run preview  -> http://localhost:8080/ (serves ./out, exact CI artifact)
// Zero dependencies (built-in http/fs only).

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, process.argv[3] || "out");
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
  ".txt": "text/plain; charset=utf-8",
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    let file = path.join(ROOT, path.normalize(urlPath).replace(/^[/\\]+/, ""));
    if (!file.startsWith(ROOT)) {
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
    const { size } = fs.statSync(file);
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
    res.writeHead(200, {
      "Content-Type": type,
      "Content-Length": size,
      "Accept-Ranges": "bytes",
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log(`preview: http://localhost:${PORT}/  (serving ./out)`));
