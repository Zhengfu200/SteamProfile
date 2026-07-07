 # Steam Profile Stats Card
 
 Dynamically generate a Steam profile stats card for your GitHub README.
 
 Inspired by [github-stats-extended](https://github.com/stats-organization/github-stats-extended) and [github-readme-stats](https://github.com/anuraghazra/github-readme-stats).
 
 ## Quick Start
 
 Paste this into your GitHub profile README, replacing `YOUR_STEAM_ID` with your Steam64 ID:
 
 ```markdown
 [![Steam Stats](https://YOUR_VERCEL_DOMAIN.vercel.app/api/card?steamid=YOUR_STEAM_ID)](https://steamcommunity.com/profiles/YOUR_STEAM_ID)
 ```
 
 Don't know your Steam ID? Use your vanity URL name instead:
 
 ```markdown
 [![Steam Stats](https://YOUR_VERCEL_DOMAIN.vercel.app/api/card?username=YOUR_USERNAME)](https://steamcommunity.com/id/YOUR_USERNAME)
 ```
 
 ## Card Preview
 
 The card shows:
 
 - **Avatar** — Your Steam profile picture
 - **Username** — Your Steam persona name
 - **Steam Level** — Your Steam level badge
 - **Games Owned** — How many games you own
 - **Hours Played** — Total playtime across all games
 
 ### Themes
 
 Add `&theme=light` for a light-themed card (default is dark).
 
 ```markdown
 [![Steam Stats](https://YOUR_VERCEL_DOMAIN.vercel.app/api/card?steamid=YOUR_STEAM_ID&theme=light)](https://steamcommunity.com/profiles/YOUR_STEAM_ID)
 ```
 
 ## How to Get a Steam ID
 
 1. Go to your [Steam profile](https://steamcommunity.com/my)
 2. Look at the URL:
    - **Steam64 ID** — The 17-digit number: `steamcommunity.com/profiles/76561197960435530`
    - **Vanity URL** — Your custom name: `steamcommunity.com/id/anuraghazra`
 
 If you don't have a custom URL set, use the numeric Steam64 ID.
 
 ## Wizard (Frontend)
 
 Visit `https://YOUR_VERCEL_DOMAIN.vercel.app/` to use the interactive wizard. Enter your Steam ID, see a live preview, and copy the markdown code.
 
 ## Deploy Your Own
 
 ### Prerequisites
 
 - A [Vercel](https://vercel.com) account (free tier works)
 - A [Steam Web API key](https://steamcommunity.com/dev/apikey) (free)
 - [Node.js 18+](https://nodejs.org) (for local testing)
 - [Vercel CLI](https://vercel.com/docs/cli) (optional)
 
 ### Deploy to Vercel
 
 1. Clone or fork this repo.
 2. Install Vercel CLI: `npm i -g vercel`
 3. In the project directory, run:
    ```bash
    vercel
    ```
 4. Follow the prompts to link your Vercel account.
 5. Set the environment variable:
    ```bash
    vercel env add STEAM_API_KEY
    ```
    Paste your Steam Web API key when prompted.
 6. Deploy:
    ```bash
    vercel --prod
    ```
 
 Or deploy directly from GitHub:
 
 [![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new)
 
 (When using the Vercel import flow, add `STEAM_API_KEY` as an environment variable.)
 
 ### Local Development
 
 1. Create a `.env` file:
    ```
    STEAM_API_KEY=your_key_here
    ```
 2. Run:
    ```bash
    vercel dev
    ```
 3. Open `http://localhost:3000` to see the frontend.
 
 ## API Reference
 
 ### `GET /api/card`
 
 | Parameter    | Type   | Required | Description                                    |
 |-------------|--------|----------|------------------------------------------------|
 | `steamid`   | string | No*      | Steam64 ID (17-digit number)                   |
 | `username`  | string | No*      | Vanity URL name (custom profile URL slug)      |
 | `theme`     | string | No       | Card theme: `dark` (default) or `light`        |
 
 *You must provide either `steamid` or `username`.
 
 Returns an SVG image with `Content-Type: image/svg+xml`.
 
 ## License
 
 MIT
