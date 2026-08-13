
import axios from "axios";

export interface MBAlbum {
  id: string;
  title: string;
  artist: string;
  releaseDate: string | null;
  artworkUrl: string;
}

export async function searchAlbums(term: string): Promise<MBAlbum[]> {
  // MusicBrainz strictly mandates a descriptive User-Agent to prevent 503 blockages
  const headers = {
    "User-Agent": "musicbox/1.0.0",
    "Accept": "application/json"
  };

  try {
    const response = await axios.get("https://musicbrainz.org", {
      headers,
      params: {
        query: term, // Lucene search handles raw multi-word phrases cleanly
        fmt: "json",
        limit: 50
      }
    });

    const releaseGroups = response.data["release-groups"] || [];

    // Deduplicate and map just like your Deezer code block
    const uniqueAlbums = Array.from(
      new Map<string, MBAlbum>(
        releaseGroups
          .filter((item: any) => item.id)
          .map((album: any) => {
            // Pull the primary artist's name safely from the credit list
            const artistName = album["artist-credit"]?.[0]?.name || "Unknown Artist";
            
            return [
              album.id,
              {
                id: album.id,
                title: album.title,
                artist: artistName,
                // Maps the global original release date safely
                releaseDate: album["first-release-date"] || null,
                // Constructs the Cover Art Archive URL directly using the MBID
                artworkUrl: `https://coverartarchive.org{album.id}/front-500`,
              }
            ];
          })
      ).values()
    );

    return uniqueAlbums;

  } catch (error) {
    console.error("MusicBrainz fetch failed:", error);
    return [];
  }
}
