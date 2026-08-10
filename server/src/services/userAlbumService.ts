import db from "../database/database.js";

export function markAlbumAsListened(albumId: string) {
    db.prepare(`
        INSERT INTO album_user_data (albumId, listened)
        VALUES (?, 1)
        ON CONFLICT(albumId)
        DO UPDATE SET listened = 1
    `).run(albumId);
}

export function rateAlbum(albumId: string, rating: number) {
    db.prepare(`
        INSERT INTO album_user_data (albumId, listened, rating)
        VALUES (?, 1, ?)
        ON CONFLICT(albumId)
        DO UPDATE SET
            listened = 1,
            rating = excluded.rating
    `).run(albumId, rating);
}

export function reviewAlbum(albumId: string, review: string) {
    const reviewedAt = new Date().toISOString();

    db.prepare(`
        INSERT INTO album_user_data (albumId, listened, review, reviewedAt)
        VALUES (?, 1, ?, ?)
        ON CONFLICT(albumId)
        DO UPDATE SET
            listened = 1,
            review = excluded.review,
            reviewedAt = excluded.reviewedAt
    `).run(albumId, review, reviewedAt);
}

export function getAlbumUserData(albumId: string) {
    const userData = db.prepare(`
        SELECT listened, rating, review, reviewedAt
        FROM album_user_data
        WHERE albumId = ?
    `).get(albumId);

    if (!userData) {
        return {
            listened: false,
            rating: null,
            review: null,
            reviewedAt: null
        };
    }

    return userData;
}

export function getLibrary() {
    return db.prepare(`
        SELECT albums.*, album_user_data.listened,
               album_user_data.rating,
               album_user_data.review,
               album_user_data.reviewedAt
        FROM album_user_data
        JOIN albums
            ON albums.id = album_user_data.albumId
        WHERE album_user_data.listened = 1
    `).all();
}

export function deleteAlbumRating(albumId: string) {
    db.prepare(`
        UPDATE album_user_data
        SET rating = NULL
        WHERE albumId = ?
    `).run(albumId);
}

export function deleteAlbumReview(albumId: string) {
    db.prepare(`
        UPDATE album_user_data
        SET review = NULL, reviewedAt = NULL
        WHERE albumId = ?
    `).run(albumId);
}

export function deleteAlbumUserData(albumId: string) {
    db.prepare(`
        DELETE FROM album_user_data
        WHERE albumId = ?
    `).run(albumId);
}