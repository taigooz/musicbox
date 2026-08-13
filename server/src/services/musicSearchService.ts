import { searchAlbums as searchDeezer } from "./deezerService.js";
import { searchAlbums as searchDiscogs } from "./discogsService.js";

export async function searchAllSources(term: string) {
    try {
        const deezerResults = await searchDeezer(term);
        if (deezerResults.length > 0) return deezerResults;
    } catch (err) {
        console.error("Deezer search failed, falling back to Discogs:", err);
    }

    try {
        return await searchDiscogs(term);
    } catch (err) {
        console.error("Discogs search failed:", err);
        return [];
    }
}