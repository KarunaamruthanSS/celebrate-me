const path = require('path');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { nanoid } = require('nanoid');

const { createPage, getPage } = require('./db');
const { validate, TYPES } = require('./validation');
const { templates } = require('../public/templates');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

app.disable('x-powered-by');

// Strict baseline CSP for the app shell — everything is external files, no inline script needed.
//
// upgradeInsecureRequests is explicitly disabled: this is a plain-HTTP dev
// server. Chrome exempts "localhost" from that directive but NOT a LAN IP
// (e.g. testing from a phone on the same Wi-Fi) — with it left on, every
// subresource request (styles.css, app.js, fonts) gets silently rewritten
// to https:// and fails against our non-TLS server, so the page loads with
// zero CSS/JS applied. Re-enable this only once the app is served over TLS.
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'", 'https://fonts.googleapis.com'],
                fontSrc: ["'self'", 'https://fonts.gstatic.com'],
                imgSrc: ["'self'", 'data:'],
                objectSrc: ["'none'"],
                baseUri: ["'none'"],
                formAction: ["'self'"],
                frameAncestors: ["'self'"],
                upgradeInsecureRequests: null
            }
        }
    })
);

app.use(express.json({ limit: '20kb' }));

app.use(express.static(PUBLIC_DIR, { index: 'index.html' }));

const createPageLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many pages created — please wait a moment and try again.' }
});

app.get('/healthz', (req, res) => {
    res.json({ ok: true });
});

app.post('/api/pages', createPageLimiter, (req, res) => {
    const { type, data } = req.body || {};

    if (typeof type !== 'string' || !TYPES.includes(type)) {
        return res.status(400).json({ error: 'Unknown or missing celebration type.' });
    }

    const result = validate(type, data || {});
    if (!result.success) {
        return res.status(400).json({ error: result.error });
    }

    const id = nanoid(12);
    createPage(id, type, result.data);

    res.status(201).json({ id, url: `/c/${id}` });
});

// Celebration pages embed a small inline <script> for their animations and
// load the card's script/cursive Google Fonts, so this route needs its own
// (still tight) CSP that allows those two things.
app.get('/c/:id', (req, res, next) => {
    const page = getPage(req.params.id);
    if (!page) return next();

    const render = templates[page.type];
    if (!render) return next();

    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; object-src 'none'; base-uri 'none'; form-action 'none'"
    );
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(render(page.data, { shareUrl: `${req.protocol}://${req.get('host')}/c/${page.id}` }));
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const status = err.status || err.statusCode || 500;
    if (status >= 500) console.error(err);
    res.status(status).json({ error: status === 413 ? 'Payload too large.' : 'Something went wrong.' });
});

app.listen(PORT, () => {
    console.log(`CelebrateMe listening on http://localhost:${PORT}`);
});
