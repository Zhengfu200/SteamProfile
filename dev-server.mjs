import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { exec } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, ".env");
const pubDir = path.join(__dirname, "public");
const psScript = path.join(__dirname, "steam-fetch.ps1");

function loadEnv() {
  if (!fs.existsSync(envPath)) return;
  const envTxt = fs.readFileSync(envPath, "utf8").replace(/\r/g, "");
  for (const line of envTxt.split("\n")) {
    const t = line.trim();
    if (t && !t.startsWith("#")) {
      const eq = t.indexOf("=");
      if (eq > 0) process.env[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
    }
  }
}
loadEnv();

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".svg": "image/svg+xml",
};

// ---------- In-memory cache (5 min TTL) ----------
const CACHE_TTL = 5 * 60 * 1000;
const cache = new Map();
function cacheGet(key) {
  const e = cache.get(key);
  if (e && Date.now() - e.ts < CACHE_TTL) return e.val;
  cache.delete(key);
  return undefined;
}
function cacheSet(key, val) { cache.set(key, { ts: Date.now(), val }); }
function buildResponseFromPayload(payload, status = 200, contentType = "application/octet-stream") {
  const headers = new Headers();
  headers.set("content-type", contentType);
  return new Response(payload, { status, headers });
}

// ---------- Async PowerShell exec ----------
function psExec(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { encoding: "utf-8", maxBuffer: 10 * 1024 * 1024 }, (err, stdout) => {
      if (err) reject(err);
      else resolve(stdout);
    });
  });
}

const nativeFetch = globalThis.fetch.bind(globalThis);
const usePowerShellProxy = process.platform === "win32" || Boolean(process.env.PWSH || process.env.POWERSHELL_DISTRIBUTION_CHANNEL);

// Override global fetch: async PowerShell proxy with caching, but fall back to native fetch on Linux.
globalThis.fetch = async function smartFetch(input, init) {
  const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
  const cached = cacheGet(url);
  if (cached) {
    return buildResponseFromPayload(cached.payload, cached.status, cached.contentType);
  }

  let payload;
  let status = 200;
  let contentType = "application/octet-stream";

  if (usePowerShellProxy) {
    const result = await psExec(`powershell -NoProfile -File "${psScript}" -Url "${url}"`);
    if (result.startsWith("IMG_BASE64:")) {
      const b64 = result.slice("IMG_BASE64:".length).trim();
      payload = `data:image/jpeg;base64,${b64}`;
      contentType = "text/plain";
    } else {
      payload = result;
      contentType = "application/json";
    }
  } else {
    const response = await nativeFetch(input, init);
    status = response.status;
    contentType = response.headers.get("content-type") || "application/octet-stream";
    payload = await response.arrayBuffer();
  }

  cacheSet(url, { payload, status, contentType });
  return buildResponseFromPayload(payload, status, contentType);
};

// Dynamic import the handler (uses overridden fetch)
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
      const t0 = Date.now();
      await mod.default(apiReq, vres);
      console.log(` ${u.pathname}${u.search}  ${Date.now() - t0}ms`);
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

