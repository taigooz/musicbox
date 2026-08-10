import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";

const db: DatabaseType = new Database("musicbox.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS albums (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        releaseDate TEXT,
        artworkUrl TEXT,
        explicit INTEGER,
        trackCount INTEGER
    );

    CREATE TABLE IF NOT EXISTS album_sources (
        albumId TEXT NOT NULL,
        source TEXT NOT NULL,
        externalId TEXT NOT NULL,

        PRIMARY KEY (source, externalId),

        FOREIGN KEY (albumId) REFERENCES albums(id)
    );
`);

export default db;