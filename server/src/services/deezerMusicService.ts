import axios from "axios";


export async function searchAlbums(term: string) {
    const response = await axios.get(
        "https://api.deezer.com/search/album",
        {
            params: {
                q: term,
                limit: 50
            }
        }
    );


    const uniqueAlbums = Array.from(
        new Map(
            response.data.data
                .filter((item: any) => item.id)
                .map((album: any) => [
                    album.id,
                    {
                        id: album.id,
                        title: album.title,
                        artist: album.artist.name,
                        releaseDate: album.release_date,
                        artworkUrl: album.cover_medium,
                        trackCount: album.nb_tracks
                    }
                ])
        ).values()
    );


    return uniqueAlbums;
}