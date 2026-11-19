// Local server for the clone site (same content GitHub Pages serves).
// Usage:
//   npm run dev      -> http://localhost:3000/ (serves ./public, no build needed)
//   npm run preview  -> http://localhost:8080/ (serves ./out, exact CI artifact)
// Zero dependencies (built-in http/fs only).

const http = require("http");
const fs = require("fs");
const path = require("path");
const { createGzip } = require("zlib");

// Load local environment variables for SMTP direct mail
function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const envFile of envFiles) {
    const fullPath = path.join(__dirname, envFile);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf8");
      content.split("\n").forEach((line) => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let val = (match[2] || "").trim();
          if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
          if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
          if (!process.env[key]) process.env[key] = val;
        }
      });
    }
  }
}
loadEnv();

let nodemailer = null;
try { nodemailer = require("nodemailer"); } catch (e) { }

async function handleContactApi(req, res) {
  let bodyStr = "";
  req.on("data", (chunk) => { bodyStr += chunk; });
  req.on("end", async () => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
      let data = {};
      const contentType = req.headers["content-type"] || "";
      if (contentType.includes("application/json")) {
        data = JSON.parse(bodyStr || "{}");
      } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
        if (contentType.includes("application/x-www-form-urlencoded")) {
          const params = new URLSearchParams(bodyStr);
          for (const [k, v] of params) data[k] = v;
        } else {
          const boundary = (contentType.split("boundary=")[1] || "").trim().replace(/^["']|["']$/g, "");
          if (boundary) {
            const parts = bodyStr.split("--" + boundary);
            for (const part of parts) {
              const match = part.match(/name="([^"]+)"\r?\n\r?\n([\s\S]*?)\r?\n?$/);
              if (match) data[match[1]] = match[2].trim();
            }
          }
        }
      }

      const firstName = data.firstName || data["Fisrt-Name"] || "";
      const lastName = data.lastName || data["Last-Name"] || "";
      const fullName = data.name || (firstName + " " + lastName).trim() || "Visitor";
      const userEmail = data.email || data["Email-Adress"] || "No email provided";
      const userPhone = data.phone || data["Phone-Number"] || "Not provided";
      const interestType = data.interest || "REGISTER INTEREST";
      const inquiryMessage = data.message || data.request || data["Request"] || "No message content";

      const host = process.env.SMTP_HOST || "smtp.gmail.com";
      const port = parseInt(process.env.SMTP_PORT || "465", 10);
      const secure = process.env.SMTP_SECURE === "true" || port === 465;
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;
      const toEmail = process.env.CONTACT_TO_EMAIL || user;

      if (!user || !pass) {
        res.writeHead(500);
        res.end(JSON.stringify({
          success: false,
          message: "SMTP is not configured on the server. Please set SMTP_USER and SMTP_PASS in .env.local"
        }));
        return;
      }

      if (!nodemailer) {
        res.writeHead(500);
        res.end(JSON.stringify({
          success: false,
          message: "Nodemailer package is not installed."
        }));
        return;
      }

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass }
      });

      await transporter.sendMail({
        from: `"Ananda Crown Website" <${user}>`,
        replyTo: userEmail !== "No email provided" ? userEmail : undefined,
        to: toEmail,
        subject: `New Inquiry: ${interestType} from ${fullName}`,
        text: `New Inquiry Received from Ananda Crown Website:\n\nInterest: ${interestType}\nName: ${fullName}\nEmail: ${userEmail}\nPhone: ${userPhone}\n\nRequest / Message:\n${inquiryMessage}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #a27b58; border-bottom: 2px solid #a27b58; padding-bottom: 10px;">New Inquiry - Ananda Crown</h2>
            <p><strong>Interest:</strong> ${interestType}</p>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${userEmail}">${userEmail}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${userPhone}">${userPhone}</a></p>
            <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #a27b58;">
              <p style="margin: 0; font-weight: bold;">Request / Message:</p>
              <p style="margin: 8px 0 0 0; white-space: pre-wrap;">${inquiryMessage}</p>
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #888;">Delivered directly via self-hosted SMTP.</p>
          </div>
        `
      });

      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        message: "Your message has been sent directly to our team."
      }));
    } catch (err) {
      console.error("Direct SMTP error:", err);
      res.writeHead(500);
      res.end(JSON.stringify({
        success: false,
        message: err.message || "Failed to send email."
      }));
    }
  });
}

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

    // Direct Contact API handler (self-hosted SMTP via nodemailer)
    if (urlPath === "/api/contact" || urlPath === "/api/contact/") {
      if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.writeHead(204);
        res.end();
        return;
      }
      if (req.method === "POST") {
        handleContactApi(req, res);
        return;
      }
    }
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
