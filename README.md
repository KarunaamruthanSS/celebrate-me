# CelebrateMe - Personalized Celebration Page Generator

A web application that creates beautiful, animated celebration pages for special occasions — download them as standalone HTML files, or generate a shareable link backed by a real server.

## Features

- **9 Celebration Types:** Birthday, Anniversary, Valentine's Day, Christmas, New Year, Student's Day, Independence Day, Labour Day, Engineer's Day — each with its own color theme, ornament icons, and centerpiece.

- **Two ways to celebrate:**
  - **Download** — a self-contained HTML file with the sender's and recipient's names on the card.
  - **Share a link** — the server stores the page and serves it at `/c/:id`, so you can send a link instead of a file.

- **Design:** an elegant centered card (gold/theme-colored border, cursive script title) staged inside a soft gradient scene with symmetric floating ornaments, twinkling sparkles, and a themed centerpiece (cake for Birthday, rings for Anniversary, etc.), all built in pure CSS.

  Generated pages load their cursive/display fonts (Great Vibes + Montserrat) from Google Fonts, so an internet connection is needed the first time a downloaded file is opened — the layout and animations still render without it, just with a system-font fallback for the script title.

## Running it

```bash
npm install
npm start
```

Then open http://localhost:3000 in your browser.

Requires Node.js 22.5+ (uses the built-in `node:sqlite` module — no native build step, no external database to provision).

## How to Use

1. Open the app in your browser.
2. Select a celebration type from the left sidebar.
3. Fill in the personalized information in the form.
4. Click **Download Page** to get a standalone HTML file, or **Get Shareable Link** to create a link you can send to someone.

## Architecture

- `public/` — the static client: `index.html` (form UI), `styles.css`, `app.js` (form handling + share flow), and `templates.js` (the celebration-page templates — the **single source of truth**, shared by both the client's download flow and the server's `/c/:id` rendering, so they can never drift apart).
- `server/` — the Express app: `index.js` (routes, security headers, rate limiting), `db.js` (SQLite via `node:sqlite`), `validation.js` (zod schemas for every celebration type).

### Security

- All user input is HTML-escaped at render time (`esc()` in `templates.js`), both client- and server-side.
- Strict Content-Security-Policy: the app shell disallows inline scripts entirely (`script-src 'self'`); only the self-contained generated celebration pages need `'unsafe-inline'` for their embedded canvas animations.
- `POST /api/pages` is schema-validated (zod), rate-limited (20/min/IP), and payload-capped (20kb).
- Shareable page IDs are opaque, non-sequential (`nanoid`), not enumerable.

## API

- `POST /api/pages` — body `{ type, data }`, returns `{ id, url }`.
- `GET /c/:id` — renders the stored celebration page.
- `GET /healthz` — liveness check.

Enjoy creating beautiful celebration pages! 🎉
