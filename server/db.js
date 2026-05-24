import Database from 'better-sqlite3'

const db = new Database('reviews.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    author TEXT,
    rating INTEGER,
    text TEXT,
    date TEXT,
    replied INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS replies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    review_id TEXT,
    draft TEXT,
    posted INTEGER DEFAULT 0,
    created_at TEXT
  );
`)

export default db