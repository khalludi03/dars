import db from './client';

db.query(`
  CREATE TABLE IF NOT EXISTS vocabulary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    arabic TEXT NOT NULL,
    gender TEXT NOT NULL,
    section TEXT NOT NULL,
    reference_word TEXT NOT NULL,
    reference_roman TEXT NOT NULL
  )
`).run();

db.query(`
  CREATE TABLE IF NOT EXISTS sections (
    key TEXT PRIMARY KEY,
    emoji TEXT NOT NULL
  )
`).run();

// FTS5 virtual table — content= makes it a "content table" backed by vocabulary
// so we don't duplicate data; rowid maps to vocabulary.id
db.query(`
  CREATE VIRTUAL TABLE IF NOT EXISTS vocabulary_fts USING fts5(
    key,
    arabic,
    reference_word,
    reference_roman,
    content=vocabulary,
    content_rowid=id
  )
`).run();

db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  )
`).run();

// token is a random UUID used as a bearer token
db.query(`
  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`).run();

db.query(`
  CREATE TABLE IF NOT EXISTS quiz (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    options TEXT NOT NULL,
    category TEXT NOT NULL,
    vocab_key TEXT,
    FOREIGN KEY (vocab_key) REFERENCES vocabulary(key)
  )
`).run();
