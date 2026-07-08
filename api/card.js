 const STEAM_API_BASE = 'https://api.steampowered.com';
 const STEAM_CDN = 'https://avatars.steamstatic.com';
 
 // ─── Color themes ───────────────────────────────────────────────────────────
 const THEMES = {
  dark: {
    bg: "#0d1117", cardBg: "#161b22", border: "#30363d",
    title: "#ffffff", text: "#c9d1d9", muted: "#8b949e",
    accent: "#1991ff", badgeBg: "#1991ff", badgeText: "#ffffff",
    footer: "#484f58", barLeft: "#1991ff", barRight: "#7c3aed",
  },
  light: {
    bg: "#ffffff", cardBg: "#ffffff", border: "#d0d7de",
    title: "#1f2328", text: "#24292f", muted: "#656d76",
    accent: "#1991ff", badgeBg: "#1991ff", badgeText: "#ffffff",
    footer: "#8b949e", barLeft: "#1991ff", barRight: "#4facfe",
  },
  radical: {
    bg: "#141321", cardBg: "#141321", border: "#2a1f3d",
    title: "#fe428e", text: "#a9fef7", muted: "#6b5b8c",
    accent: "#f8d847", badgeBg: "#fe428e", badgeText: "#ffffff",
    footer: "#6b5b8c", barLeft: "#fe428e", barRight: "#f8d847",
  },
  gruvbox: {
    bg: "#282828", cardBg: "#282828", border: "#3c3836",
    title: "#fabd2f", text: "#8ec07c", muted: "#7c6f64",
    accent: "#fe8019", badgeBg: "#fabd2f", badgeText: "#282828",
    footer: "#7c6f64", barLeft: "#fabd2f", barRight: "#fe8019",
  },
  tokyonight: {
    bg: "#1a1b27", cardBg: "#1a1b27", border: "#2a2d4a",
    title: "#70a5fd", text: "#38bdae", muted: "#565f89",
    accent: "#bf91f3", badgeBg: "#70a5fd", badgeText: "#ffffff",
    footer: "#565f89", barLeft: "#70a5fd", barRight: "#bf91f3",
  },
  onedark: {
    bg: "#282c34", cardBg: "#282c34", border: "#3b4048",
    title: "#e4bf7a", text: "#df6d74", muted: "#7a8189",
    accent: "#8eb573", badgeBg: "#e4bf7a", badgeText: "#282c34",
    footer: "#7a8189", barLeft: "#e4bf7a", barRight: "#8eb573",
  },
  merko: {
    bg: "#0a0f0b", cardBg: "#0a0f0b", border: "#1a2e1c",
    title: "#abd200", text: "#68b587", muted: "#3a5a40",
    accent: "#b7d364", badgeBg: "#abd200", badgeText: "#0a0f0b",
    footer: "#3a5a40", barLeft: "#abd200", barRight: "#b7d364",
  },
  cobalt: {
    bg: "#193549", cardBg: "#193549", border: "#1f4a64",
    title: "#e683d9", text: "#75eeb2", muted: "#5588a8",
    accent: "#0480ef", badgeBg: "#e683d9", badgeText: "#ffffff",
    footer: "#5588a8", barLeft: "#e683d9", barRight: "#0480ef",
  },
  synthwave: {
    bg: "#2b213a", cardBg: "#2b213a", border: "#3f3152",
    title: "#e2e9ec", text: "#e5289e", muted: "#7a6699",
    accent: "#ef8539", badgeBg: "#e5289e", badgeText: "#ffffff",
    footer: "#7a6699", barLeft: "#ef8539", barRight: "#e5289e",
  },
  dracula: {
    bg: "#282a36", cardBg: "#282a36", border: "#3c3f51",
    title: "#ff6e96", text: "#f8f8f2", muted: "#7c7f94",
    accent: "#79dafa", badgeBg: "#ff6e96", badgeText: "#ffffff",
    footer: "#7c7f94", barLeft: "#ff6e96", barRight: "#79dafa",
  },
  monokai: {
    bg: "#272822", cardBg: "#272822", border: "#3a3b35",
    title: "#eb1f6a", text: "#f1f1eb", muted: "#75756e",
    accent: "#e28905", badgeBg: "#eb1f6a", badgeText: "#ffffff",
    footer: "#75756e", barLeft: "#eb1f6a", barRight: "#e28905",
  },
  nord: {
    bg: "#2e3440", cardBg: "#2e3440", border: "#434c5e",
    title: "#81a1c1", text: "#d8dee9", muted: "#7a88a0",
    accent: "#88c0d0", badgeBg: "#81a1c1", badgeText: "#2e3440",
    footer: "#7a88a0", barLeft: "#81a1c1", barRight: "#88c0d0",
  },
  highcontrast: {
    bg: "#000000", cardBg: "#000000", border: "#333333",
    title: "#e7f216", text: "#ffffff", muted: "#999999",
    accent: "#00ffff", badgeBg: "#e7f216", badgeText: "#000000",
    footer: "#666666", barLeft: "#e7f216", barRight: "#00ffff",
  },
  react: {
    bg: "#20232a", cardBg: "#20232a", border: "#373940",
    title: "#61dafb", text: "#ffffff", muted: "#8b8f96",
    accent: "#61dafb", badgeBg: "#61dafb", badgeText: "#20232a",
    footer: "#8b8f96", barLeft: "#61dafb", barRight: "#282c34",
  },
  rose: {
    bg: "#1c1418", cardBg: "#1c1418", border: "#332228",
    title: "#ff9aa2", text: "#e8c4cc", muted: "#5e3f49",
    accent: "#c9a9b2", badgeBg: "#ff9aa2", badgeText: "#1c1418",
    footer: "#5e3f49", barLeft: "#ff9aa2", barRight: "#c9a9b2",
  },
  gotham: {
    bg: "#0c1014", cardBg: "#0c1014", border: "#1f2a33",
    title: "#2aa889", text: "#99d1ce", muted: "#4a6b70",
    accent: "#599cab", badgeBg: "#2aa889", badgeText: "#0c1014",
    footer: "#4a6b70", barLeft: "#2aa889", barRight: "#599cab",
  },
};


 
 // ─── Steam API helpers ──────────────────────────────────────────────────────
 
 function getApiKey() {
   return process.env.STEAM_API_KEY || '';
 }
 
async function resolveVanityUrl(vanityUrl) {
  const key = getApiKey();
  const url = `${STEAM_API_BASE}/ISteamUser/ResolveVanityURL/v1/?key=${key}&vanityurl=${encodeURIComponent(vanityUrl)}`;
   try {
  const res = await fetch(url).then((r) => r.json());
  if (res.response.success === 1) return res.response.steamid;
  if (res.response.success === 42) return null;
  throw new Error('Vanity URL resolution failed');
   } catch (e) {
     return null;
   }
}

async function getPlayerSummaries(steamId) {
  const key = getApiKey();
  const url = `${STEAM_API_BASE}/ISteamUser/GetPlayerSummaries/v2/?key=${key}&steamids=${steamId}`;
   try {
  const res = await fetch(url).then((r) => r.json());
  const players = res.response.players;
  return players && players.length > 0 ? players[0] : null;
   } catch (e) {
     return null;
   }
}

async function getPlayerLevel(steamId) {
  const key = getApiKey();
  const url = `${STEAM_API_BASE}/IPlayerService/GetBadges/v1/?key=${key}&steamid=${steamId}`;
   try {
  const res = await fetch(url).then((r) => r.json());
  return res.response.player_level || 0;
   } catch (e) {
     return 0;
   }
}

async function getOwnedGames(steamId) {
  const key = getApiKey();
  const url = `${STEAM_API_BASE}/IPlayerService/GetOwnedGames/v1/?key=${key}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true`;
   try {
  const res = await fetch(url).then((r) => r.json());
  return res.response || { game_count: 0, games: [] };
   } catch (e) {
     return { game_count: 0, games: [] };
   }
}
 
 // ─── Formatting helpers ─────────────────────────────────────
// ─── Avatar base64 helper ──────────────────────────────────────────

async function fetchAvatarAsBase64(url) {
  try {
    const res = await fetch(url);
    // Dev server (psFetch override): returns data URI directly
    // Vercel (native fetch): returns binary response
    if (typeof res.arrayBuffer === "function") {
      // Native fetch on Vercel
      const buffer = await res.arrayBuffer();
      const b64 = Buffer.from(buffer).toString("base64");
      return `data:image/jpeg;base64,${b64}`;
    } else {
      // Dev server with PowerShell fetch - already a data URI string
      return await res.text();
    }
  } catch (e) {
    // Fallback: use the original URL
    return url;
  }
}

 
 function formatHours(minutes) {
   const hours = Math.round(minutes / 60);
   return hours.toLocaleString();
 }
 
 function truncate(str, maxLen) {
   if (!str) return '';
   if (str.length <= maxLen) return str;
   return str.slice(0, maxLen - 1) + '\u2026';
 }
 
 function escapeXml(s) {
   if (typeof s !== 'string') return '';
   return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
 }
 
 function badgeWidth(level) {
   const text = `Lv. ${level}`;
   // approximate: each char ~7px at font-size 12
   const w = text.length * 7 + 20;
   return Math.max(60, Math.min(w, 120));
 }
 
 // ─── SVG Templates ──────────────────────────────────────────────────────────
 
 function renderErrorSvg(message, theme = 'dark') {
   const t = THEMES[theme] || THEMES.dark;
   return `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="120">
   <rect width="495" height="120" rx="14" fill="${t.cardBg}" stroke="${t.border}" stroke-width="1"/>
   <text x="170" y="55" fill="${t.muted}" font-family="system-ui,-apple-system,sans-serif" font-size="14" text-anchor="middle">${escapeXml(message)}</text>
   <text x="170" y="95" fill="${t.footer}" font-family="system-ui,-apple-system,sans-serif" font-size="10" text-anchor="middle">Click to visit profile</text>
 </svg>`;
 }
 
 function renderCardSvg(data, theme) {
  const t = THEMES[theme] || THEMES.dark;
  const { name, avatarUrl, level, gameCount, totalMinutes, disableAnimations,
    showGames, showHours, showJoined, showLocation, joinedYear, locCountry } = data;
  const noAnim = disableAnimations === true;

  const W = 340;
  const ax = 68, ay = 48, ar = 24;
  const lx = 99, statGap = 22, colGap = 105;
  const badgeW = Math.max(58, Math.min(90, level.toString().length * 8 + 36));
  const username = truncate(name || "Unknown", 18);
  const hoursTotal = formatHours(totalMinutes);
  const hasPlaytime = totalMinutes > 0;
  const gameCountStr = gameCount.toLocaleString();
  const hoursStr = hasPlaytime ? hoursTotal + " hrs" : "---";

  const items = [];
  if (showGames !== false) items.push({ icon: "&#x1F3AE;", val: gameCountStr, label: "GAMES" });
  if (showHours !== false) items.push({ icon: "&#x23F1;", val: hoursStr, label: "HOURS" });
  if (showJoined === true && joinedYear) items.push({ icon: "&#x1F4C5;", val: joinedYear, label: "JOINED" });
  if (showLocation === true && locCountry) items.push({ icon: "&#x1F30D;", val: locCountry, label: "COUNTRY" });

  const rows = Math.ceil(items.length / 2);
  const baseY = 102, rowH = 48, lblOff = 15, padAfter = 18;
  let divY, footY, H;
  if (rows === 0) {
    divY = 118; footY = 139; H = 145;
  } else {
    const lastLabelY = baseY + (rows - 1) * rowH + lblOff;
    divY = lastLabelY + padAfter;
    footY = divY + 21;
    H = footY + 12;
  }

  let statsHtml = "";
  items.forEach((it, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = lx + col * colGap, y = baseY + row * rowH;
    statsHtml += `
    <text x="${x}" y="${y}" fill="${t.accent}" font-size="14">${it.icon}</text>
    <text x="${x + statGap}" y="${y}" fill="${t.title}" font-size="16" font-weight="700">${it.val}</text>
    <text x="${x}" y="${y + lblOff}" fill="${t.muted}" font-size="10" letter-spacing="0.5">${it.label}</text>`;
  });

  const animCss = noAnim ? "" : `<style>
    @keyframes af{from{opacity:0}to{opacity:1}}
    @keyframes as{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes asc{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
    .af{animation:af .5s ease forwards;opacity:0}
    .as{animation:as .4s ease forwards;opacity:0}
    .asc{animation:asc .4s ease forwards;opacity:0}
  </style>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}">
  ${animCss}
  <defs>
    <clipPath id="avatarClip"><circle cx="${ax}" cy="${ay}" r="${ar}"/></clipPath>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.accent}"/>
      <stop offset="100%" stop-color="${t.barLeft || t.accent}"/>
    </linearGradient>
  </defs>

  <rect class="af" width="${W}" height="${H}" rx="14" fill="${t.cardBg}" stroke="${t.border}" stroke-width="1"/>

  <g class="asc" style="animation-delay:0.08s">
    <circle cx="${ax}" cy="${ay}" r="${ar + 2}" fill="none" stroke="${t.accent}" stroke-width="1.5" opacity="0.3"/>
    <circle cx="${ax}" cy="${ay}" r="${ar}" fill="none" stroke="${t.accent}" stroke-width="2"/>
    <image x="${ax - ar}" y="${ay - ar}" width="${ar * 2}" height="${ar * 2}" clip-path="url(#avatarClip)" href="${escapeXml(avatarUrl)}" xlink:href="${escapeXml(avatarUrl)}" preserveAspectRatio="xMidYMid slice"/>
  </g>

  <text class="as" style="animation-delay:0.12s" x="${lx}" y="40" fill="${t.title}" font-family="system-ui,-apple-system,sans-serif" font-size="16" font-weight="700" letter-spacing="-0.3">${escapeXml(username)}</text>

  <g class="as" style="animation-delay:0.16s">
    <rect x="${lx}" y="48" width="${badgeW}" height="18" rx="9" fill="url(#accentGrad)"/>
    <text x="${lx + badgeW / 2}" y="61" fill="${t.badgeText}" font-family="system-ui,-apple-system,sans-serif" font-size="10" font-weight="700" text-anchor="middle">LV. ${level}</text>
  </g>

  ${items.length > 0 ? `<g class="as" style="animation-delay:0.2s">${statsHtml}</g>` : ""}

  <line class="af" style="animation-delay:0.3s" x1="44" y1="${divY}" x2="${W - 44}" y2="${divY}" stroke="${t.border}" stroke-width="1"/>
  <text class="af" style="animation-delay:0.35s" x="${W / 2}" y="${footY}" fill="${t.footer}" font-family="system-ui,-apple-system,sans-serif" font-size="10" text-anchor="middle" letter-spacing="1">STEAM STATS</text>
</svg>`;
}
export { renderCardSvg, renderErrorSvg };

// ─── Vercel serverless handler ──────────────────────────────────────────────

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const host = (req.headers && req.headers.host) || "localhost";
  const { searchParams } = new URL(req.url, `http://${host}`);
  const steamId = searchParams.get("steamid");
  const username = searchParams.get("username");
  const theme = searchParams.get("theme") || "dark";
  const disableAnimations = searchParams.get("disable_animations") === "true";

  if (!steamId && !username) {
    res.setHeader("Content-Type", "image/svg+xml");
    return res.status(200).send(renderErrorSvg("Provide ?steamid=ID or ?username=NAME", theme));
  }

  if (!getApiKey()) {
    res.setHeader("Content-Type", "image/svg+xml");
    return res.status(200).send(renderErrorSvg("Server not configured \u2014 contact site owner", theme));
  }

  try {
    let resolvedId = steamId;
    if (!resolvedId && username) {
      resolvedId = await resolveVanityUrl(username);
      if (!resolvedId) {
        res.setHeader("Content-Type", "image/svg+xml");
        return res.status(200).send(renderErrorSvg(`User "${escapeXml(username)}" not found`, theme));
      }
    }

    const [summary, levelData, gamesData] = await Promise.all([
      getPlayerSummaries(resolvedId),
      getPlayerLevel(resolvedId),
      getOwnedGames(resolvedId),
    ]);

    if (!summary) {
      res.setHeader("Content-Type", "image/svg+xml");
      return res.status(200).send(renderErrorSvg("Profile not found or private", theme));
    }

    const totalMinutes = (gamesData.games || []).reduce(
      (sum, g) => sum + (g.playtime_forever || 0), 0
    );

    const avatarSrc = summary.avatarfull || `${STEAM_CDN}/full.jpg`;
    const avatarDataUri = await fetchAvatarAsBase64(avatarSrc);

    const showGames = searchParams.get("show_games") !== "false";
    const showHours = searchParams.get("show_hours") !== "false";
    const showJoined = searchParams.get("show_joined") === "true";
    const showLocation = searchParams.get("show_location") === "true";

    const joinedYear = summary.timecreated ? new Date(summary.timecreated * 1000).getFullYear().toString() : null;
    const locCountry = summary.loccountrycode || null;

    const cardData = {
      name: summary.personaname || "Unknown",
      avatarUrl: avatarDataUri,
      level: levelData,
      gameCount: gamesData.game_count || 0,
      totalMinutes,
      disableAnimations,
      showGames,
      showHours,
      showJoined,
      showLocation,
      joinedYear,
      locCountry,
      steamId: resolvedId,
    };

    const svg = renderCardSvg(cardData, theme);
    res.setHeader("Content-Type", "image/svg+xml");
    res.status(200).send(svg);
  } catch (err) {
    console.error("Error generating card:", err);
    res.setHeader("Content-Type", "image/svg+xml");
    res.status(200).send(renderErrorSvg("Failed to fetch Steam data", theme));
  }
}
