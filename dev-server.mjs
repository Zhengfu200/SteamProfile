import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

// Load .env
const envTxt = fs.readFileSync(".env", "utf8").replace(/\r/g, "");
for (const line of envTxt.split("\n")) {
  const t = line.trim();
  if (t && !t.startsWith("#")) {
    const eq = t.indexOf("=");
    if (eq > 0) process.env[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pubDir = path.join(__dirname, "public");
const psScript = path.join(__dirname, "steam-fetch.ps1");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".svg": "image/svg+xml",
};

// Override global fetch to use PowerShell (Node.js fetch can't reach Steam API on this network)
delete globalThis.fetch;
globalThis.fetch = async function psFetch(url) {
  const result = execSync(
    `powershell -File "${psScript}" -Url "${url}"`,
    { encoding: "utf-8", maxBuffer: 10 * 1024 * 1024 }
  );
  // Handle base64-encoded image responses (IMG_BASE64: prefix)
  if (result.startsWith("IMG_BASE64:")) {
    const b64 = result.slice("IMG_BASE64:".length).trim();
    const dataUri = `data:image/jpeg;base64,${b64}`;
    const text = () => Promise.resolve(dataUri);
    const json = async () => { throw new Error("Not a JSON response"); };
    return { ok: true, status: 200, text, json, headers: new Map(), _isImage: true };
  }
  const text = () => Promise.resolve(result);
  const json = () => Promise.resolve(JSON.parse(result));
  return { ok: true, status: 200, text, json, headers: new Map() };
};

// Dynamic import so the handler uses the overridden fetch
const handlerPromise = import("./api/card.js?" + Date.now());

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, "http://" + (req.headers.host || "localhost"));

  if (u.pathname === "/api/card") {
    try {
      const mod = await handlerPromise;
      const vres = {
        _h: {}, _c: 200,
        setHeader(k, v) { this._h[k] = v; },
        status(c) { this._c = c; return this; },
        send(b) { res.writeHead(this._c, this._h); res.end(b); },
      };
      const apiReq = { url: u.pathname + u.search, headers: req.headers, method: req.method };
      await mod.default(apiReq, vres);
    } catch (e) {
      console.error("API error:", e);
      res.writeHead(500, { "Content-Type": "image/svg+xml" });
      res.end('<svg xmlns="http://www.w3.org/2000/svg" width="495" height="120"><rect width="495" height="120" rx="10" fill="#161b22"/><text x="247" y="55" fill="#f85149" font-family="system-ui,sans-serif" font-size="14" text-anchor="middle">Server error</text></svg>');
    }
    return;
  }

  let fp = u.pathname === "/" ? "/index.html" : u.pathname;
  const full = path.join(pubDir, fp);
  try {
    const c = fs.readFileSync(full);
    res.writeHead(200, { "Content-Type": MIME[path.extname(full)] || "text/plain" });
    res.end(c);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

const PORT = parseInt(process.env.PORT || "3456");
server.listen(PORT, () => console.log(" Dev server: http://localhost:" + PORT));
