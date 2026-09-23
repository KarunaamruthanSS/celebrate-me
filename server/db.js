const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'celebrate.db');

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA journal_mode = WAL');

db.exec(`
    CREATE TABLE IF NOT EXISTS pages (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        data TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
`);

const insertStmt = db.prepare('INSERT INTO pages (id, type, data) VALUES (?, ?, ?)');
const getStmt = db.prepare('SELECT id, type, data, created_at FROM pages WHERE id = ?');

function createPage(id, type, data) {
    insertStmt.run(id, type, JSON.stringify(data));
}

function getPage(id) {
    const row = getStmt.get(id);
    if (!row) return null;
    return { id: row.id, type: row.type, data: JSON.parse(row.data), createdAt: row.created_at };
}

module.exports = { db, createPage, getPage };
