import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Album } from "../types/album";
import AlbumCard from "../components/AlbumCard";


function SearchResults() {
    const [params] = useSearchParams();
    const query = params.get("q") ?? "";

    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query) return;

        async function fetchAlbums() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:3000/api/search?term=${encodeURIComponent(query)}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch albums");
                }

                const data = await response.json();
                setAlbums(data);

            } catch (err) {
                setError("Something went wrong.");
                console.error(err);

            } finally {
                setLoading(false);
            }
        }

        fetchAlbums();

    }, [query]);


    return (
        <div>
            <h1>Search Results for "{query}"</h1>

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            <div>
                {albums.map((album) => (
                    <AlbumCard
                        key={album.id}
                        album={album}
                    />
                ))}
            </div>
        </div>
    );
}

export default SearchResults;