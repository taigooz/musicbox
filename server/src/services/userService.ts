import db from "../database/database.js";

export function getUser() {
    return db.prepare(`
        SELECT id, username, bio
        FROM users
        LIMIT 1
    `).get();
}