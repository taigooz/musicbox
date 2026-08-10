import db from "../database/database.js";
import { generateAlbumId } from "../utils/generateId.js";

type CreateAlbumData = {
    title: string;
    artist: string;
    releaseDate: string;
    artworkUrl: string;
    explicit: boolean;
    trackCount: number;
    source: string;
    externalId: string;
};

export function createAlbum(album: CreateAlbumData) {
    const id = generateAlbumId();

    const insertAlbum = db.prepare(`
        INSERT INTO albums (
            id,
            title,
            artist,
            releaseDate,
            artworkUrl,
            explicit,
            trackCount
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const insertSource = db.prepare(`
        INSERT INTO album_sources (
            albumId,
            source,
            externalId
        )
        VALUES (?, ?, ?)
    `);

    const transaction = db.transaction(() => {
        insertAlbum.run(
            id,
            album.title,
            album.artist,
            album.releaseDate,
            album.artworkUrl,
            album.explicit ? 1 : 0,
            album.trackCount
        );

        insertSource.run(
            id,
            album.source,
            album.externalId
        );
    });

    transaction();

    return {
        id,
        title: album.title,
        artist: album.artist,
        releaseDate: album.releaseDate,
        artworkUrl: album.artworkUrl,
        explicit: album.explicit,
        trackCount: album.trackCount
    };
}

export function findAlbumBySource(
    source: string,
    externalId: string
) {
    const album = db.prepare(`
        SELECT albums.*
        FROM albums
        JOIN album_sources
            ON albums.id = album_sources.albumId
        WHERE album_sources.source = ?
          AND album_sources.externalId = ?
    `).get(source, externalId);

    return album;
}

export function findOrCreateAlbum(album: CreateAlbumData) {
    const existingAlbum = findAlbumBySource(
        album.source,
        album.externalId
    );

    if (existingAlbum) {
        return existingAlbum;
    }

    return createAlbum(album);
}

export function getAlbumById(id: string) {
    const album = db.prepare(`
        SELECT *
        FROM albums
        WHERE id = ?
    `).get(id);

    return album;
}