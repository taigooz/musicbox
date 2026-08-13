import db from "../database/database.js";
import { generateAlbumId } from "../utils/generateId.js";

type Track = {
    position: number;
    title: string;
    durationMs: number | null;
};

type CreateAlbumData = {
    title: string;
    artist: string;
    releaseDate: string | null;
    artworkUrl: string | null;
    explicit: boolean;
    trackCount: number;
    genre: string | null;
    label: string | null;
    runtimeMs: number | null;
    tracklist: Track[];
    source: string;
    externalId: string;
};

export function createAlbum(album: CreateAlbumData) {
    const id = generateAlbumId();

    const insertAlbum = db.prepare(`
        INSERT INTO albums (
            id, title, artist, releaseDate, artworkUrl,
            explicit, trackCount, genre, label, runtimeMs
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertSource = db.prepare(`
        INSERT INTO album_sources (albumId, source, externalId)
        VALUES (?, ?, ?)
    `);

    const insertTrack = db.prepare(`
        INSERT INTO tracks (albumId, position, title, durationMs)
        VALUES (?, ?, ?, ?)
    `);

    const transaction = db.transaction(() => {
        insertAlbum.run(
            id,
            album.title,
            album.artist,
            album.releaseDate,
            album.artworkUrl,
            album.explicit ? 1 : 0,
            album.trackCount,
            album.genre,
            album.label,
            album.runtimeMs
        );

        insertSource.run(id, album.source, album.externalId);

        for (const track of album.tracklist) {
            insertTrack.run(id, track.position, track.title, track.durationMs);
        }
    });

    transaction();

    return getAlbumById(id);
}

export function findAlbumBySource(source: string, externalId: string) {
    const row: any = db.prepare(`
        SELECT albums.id
        FROM albums
        JOIN album_sources ON albums.id = album_sources.albumId
        WHERE album_sources.source = ? AND album_sources.externalId = ?
    `).get(source, externalId);

    return row ? getAlbumById(row.id) : null;
}

export function findOrCreateAlbum(album: CreateAlbumData) {
    const existing = findAlbumBySource(album.source, album.externalId);
    return existing ?? createAlbum(album);
}

export function getAlbumById(id: string) {
    const album: any = db.prepare(`SELECT * FROM albums WHERE id = ?`).get(id);
    if (!album) return null;

    const tracklist = db.prepare(`
        SELECT position, title, durationMs
        FROM tracks
        WHERE albumId = ?
        ORDER BY position
    `).all(id);

    return { ...album, tracklist };
}