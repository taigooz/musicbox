import axios from "axios";
import { RateLimiter } from "../utils/rateLimiter.js";
import { TTLCache } from "../utils/cache.js";

const DEEZER_BASE = "https://api.deezer.com";

// Deezer's soft limit is ~50 req/5s. This keeps us well under that.
const limiter = new RateLimiter(120);
const searchCache = new TTLCache<any[]>(5 * 60 * 1000);
const detailCache = new TTLCache<any>(60 * 60 * 1000);

function msFromSeconds(seconds: number | undefined | null): number | null {
    return seconds == null ? null : seconds * 1000;
}

export async function searchAlbums(term: string) {
    const cached = searchCache.get(term);
    if (cached) return cached;

    const response = await limiter.schedule(() =>
        axios.get(`${DEEZER_BASE}/search/album`, { params: { q: term, limit: 50 } })
    );

    const results = response.data?.data ?? [];

    const uniqueAlbums = Array.from(
        new Map(
            results
                .filter((item: any) => item.id && item.title)
                .map((item: any) => [
                    item.id,
                    {
                        id: item.id,
                        title: item.title,
                        artist: item.artist?.name ?? "Unknown",
                        releaseDate: null, // not on search results, filled in on detail fetch
                        artworkUrl: item.cover_medium ??  item.cover_big ?? item.cover_xl  ?? null,
                        explicit: item.explicit_lyrics ?? false,
                        trackCount: item.nb_tracks ?? null,
                        source: "deezer",
                    },
                ])
        ).values()
    );

    searchCache.set(term, uniqueAlbums);
    return uniqueAlbums;
}

export async function getDeezerAlbumDetails(externalId: string) {
    const cached = detailCache.get(externalId);
    if (cached) return cached;

    const response = await limiter.schedule(() => axios.get(`${DEEZER_BASE}/album/${externalId}`));
    const data = response.data;
    if (!data || data.error) return null;

    const tracklist = (data.tracks?.data ?? []).map((t: any, index: number) => ({
        position: t.track_position ?? index + 1,
        title: t.title,
        durationMs: msFromSeconds(t.duration),
    }));

    const runtimeMs =
        msFromSeconds(data.duration) ??
        tracklist.reduce((sum: number, t: any) => sum + (t.durationMs ?? 0), 0);

    const genre = (data.genres?.data ?? []).map((g: any) => g.name).join(", ") || null;

    const details = {
        title: data.title,
        artist: data.artist?.name ?? "Unknown",
        releaseDate: data.release_date ?? null,
        artworkUrl: data.cover_xl ?? data.cover_big ?? data.cover_medium ?? null,
        explicit: data.explicit_lyrics ?? false,
        trackCount: data.nb_tracks ?? tracklist.length,
        genre,
        label: data.label ?? null,
        runtimeMs,
        tracklist,
    };

    detailCache.set(externalId, details);
    return details;
}