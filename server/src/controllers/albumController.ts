import type { Request, Response } from "express";
import { searchAlbums } from "../services/appleMusicService.js";
import { findOrCreateAlbum } from "../services/albumService.js";

export async function searchAlbumsController(req: Request, res: Response): Promise<Response | void> {
    try {
        const term = req.query.term as string;

        if (!term) {
            return res.status(400).json({
                message: "Missing search term"
            });
        }

        const albums = await searchAlbums(term);

        res.json(albums);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}

export function createAlbumController(req: Request, res: Response) {
    try {
        const album = findOrCreateAlbum(req.body);

        res.status(201).json(album);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create album"
        });
    }
}