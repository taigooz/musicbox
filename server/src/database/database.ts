import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";

const db: DatabaseType = new Database("musicbox.db");
db.pragma("foreign_keys = ON");


db.exec(`
    CREATE TABLE IF NOT EXISTS albums (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        releaseDate TEXT,
        artworkUrl TEXT,
        trackCount INTEGER,
        explicit INTEGER NOT NULL DEFAULT 0,
        genre TEXT,
        label TEXT,
        runtimeMs INTEGER
    );

    CREATE TABLE IF NOT EXISTS album_sources (
        albumId TEXT NOT NULL,
        source TEXT NOT NULL,
        externalId TEXT NOT NULL,
        PRIMARY KEY (source, externalId),
        FOREIGN KEY (albumId) REFERENCES albums(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tracks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        albumId TEXT NOT NULL,
        position INTEGER,
        title TEXT NOT NULL,
        durationMs INTEGER,
        FOREIGN KEY (albumId) REFERENCES albums(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS album_user_data (
        albumId TEXT PRIMARY KEY,
        listened INTEGER NOT NULL DEFAULT 0,
        rating INTEGER CHECK (rating >= 0 AND rating <= 10),
        review TEXT,
        reviewedAt TEXT,
        FOREIGN KEY (albumId) REFERENCES albums(id) ON DELETE CASCADE
    );
    
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        bio TEXT
    )
`);

export default db;