import axios from "axios";
import { RateLimiter } from "../utils/rateLimiter.js";
import { TTLCache } from "../utils/cache.js";

const DISCOGS_BASE = "https://api.discogs.com";
const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN;

const discogsHeaders = { "User-Agent": "MusicBox/1.0 +https://yourapp.example.com" };

// ~60/min authenticated, 25/min unauthenticated - stay safely under either.
const limiter = new RateLimiter(1200);
const searchCache = new TTLCache<any[]>(5 * 60 * 1000);
const detailCache = new TTLCache<any>(60 * 60 * 1000);

function msFromDuration(duration: string | undefined): number | null {
    if (!duration) return null;
    const parts = duration.split(":").map(Number);
    if (parts.some(Number.isNaN)) return null;
    if (parts.length === 2) return (parts[0]! * 60 + parts[1]!) * 1000;
    if (parts.length === 3) return (parts[0]! * 3600 + parts[1]! * 60 + parts[2]!) * 1000;
    return null;
}

function cleanArtistName(name: string | undefined): string {
    return (name ?? "Unknown").replace(/\s\(\d+\)$/, "");
}

export async function searchAlbums(term: string) {
    const cached = searchCache.get(term);
    if (cached) return cached;

    const response = await limiter.schedule(() =>
        axios.get(`${DISCOGS_BASE}/database/search`, {
            headers: discogsHeaders,
            params: { q: term, type: "release", token: DISCOGS_TOKEN, per_page: 50 },
        })
    );

    const results = response.data?.results ?? [];

    const uniqueAlbums = Array.from(
        new Map(
            results
                .filter((item: any) => item.id && item.title)
                .map((item: any) => {
                    const [artist, ...rest] = item.title.split(" - ");
                    const title = rest.length ? rest.join(" - ") : item.title;
                    return [
                        item.id,
                        {
                            id: item.id,
                            title,
                            artist: cleanArtistName(artist),
                            releaseDate: item.year ? String(item.year) : null,
                            artworkUrl: item.cover_image ?? item.thumb ?? null,
                            explicit: false,
                            trackCount: null,
                            source: "discogs",
                        },
                    ];
                })
        ).values()
    );

    searchCache.set(term, uniqueAlbums);
    return uniqueAlbums;
}

export async function getDiscogsReleaseDetails(externalId: string) {
    const cached = detailCache.get(externalId);
    if (cached) return cached;

    const response = await limiter.schedule(() =>
        axios.get(`${DISCOGS_BASE}/releases/${externalId}`, {
            headers: discogsHeaders,
            params: { token: DISCOGS_TOKEN },
        })
    );

    const data = response.data;
    if (!data) return null;

    const tracklist = (data.tracklist ?? [])
        .filter((t: any) => t.type_ === "track")
        .map((t: any, index: number) => ({
            position: index + 1,
            title: t.title,
            durationMs: msFromDuration(t.duration),
        }));

    const runtimeMs = tracklist.reduce((sum: number, t: any) => sum + (t.durationMs ?? 0), 0);

    const details = {
        title: data.title,
        artist: cleanArtistName(data.artists?.[0]?.name),
        releaseDate: data.released || (data.year ? String(data.year) : null),
        artworkUrl: data.images?.[0]?.uri ?? null,
        explicit: false,
        trackCount: tracklist.length,
        genre: [...(data.genres ?? []), ...(data.styles ?? [])].join(", ") || null,
        label: data.labels?.[0]?.name ?? null,
        runtimeMs: runtimeMs || null,
        tracklist,
    };

    detailCache.set(externalId, details);
    return details;
}

// Best-effort genre backfill when Deezer has none. Never throws - failures
// should be invisible to the main flow.
export async function findGenreFallback(artist: string, title: string): Promise<string | null> {
    try {
        const results = await searchAlbums(`${artist} ${title}`);
        const match: any = results[0];
        if (!match) return null;
        const details = await getDiscogsReleaseDetails(String(match.id));
        return details?.genre ?? null;
    } catch {
        return null;
    }
}