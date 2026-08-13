import type { Request, Response } from "express";
import { searchAllSources } from "../services/musicSearchService.js";
import { getDeezerAlbumDetails } from "../services/deezerService.js";
import { getDiscogsReleaseDetails, findGenreFallback } from "../services/discogsService.js";
import { findOrCreateAlbum } from "../services/albumService.js";

export async function searchAlbumsController(req: Request, res: Response): Promise<Response | void> {
    try {
        const term = (req.query.term as string)?.trim();
        if (!term) return res.status(400).json({ message: "Missing search term" });

        const albums = await searchAllSources(term);
        res.json(albums);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function getExternalAlbumController(req: Request, res: Response): Promise<Response | void> {
    try {
        const { source, externalId } = req.params;

        // Ensure externalId is a valid string
        if (typeof externalId !== "string" || !externalId.trim()) {
            return res.status(400).json({ message: "Invalid or missing externalId" });
        }

        if (source !== "deezer" && source !== "discogs") {
            return res.status(400).json({ message: `Unknown source: ${source}` });
        }

        let details =
            source === "deezer"
                ? await getDeezerAlbumDetails(externalId)
                : await getDiscogsReleaseDetails(externalId);

        if (!details) {
            return res.status(404).json({ message: "Album not found" });
        }

        // Deezer frequently has no genre data - backfill from Discogs, best-effort.
        if (!details.genre) {
            const fallbackGenre = await findGenreFallback(details.artist, details.title);
            if (fallbackGenre) details = { ...details, genre: fallbackGenre };
        }

        const album = findOrCreateAlbum({ ...details, source, externalId });
        res.status(201).json(album);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch album" });
    }
}