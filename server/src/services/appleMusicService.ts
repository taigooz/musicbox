import axios from "axios";


export async function searchAlbums(term: string) {
    const response = await axios.get(
        "https://itunes.apple.com/search",
        {
            params: {
                term,
                media: "music",
                limit: 50
            }
        }
    );


    const uniqueAlbums = Array.from(
        new Map(
            response.data.results
                .filter((item: any) => item.collectionId)
                .map((track: any) => [
                    track.collectionId,
                    {
                        id: track.collectionId,
                        title: track.collectionName,
                        artist: track.artistName,
                        releaseDate: track.releaseDate,
                        artwork: track.artworkUrl100,
                        explicit: track.collectionExplicitness === "explicit",
                        trackCount: track.trackCount
                    }
                ])
        ).values()
    );


    return uniqueAlbums;
}