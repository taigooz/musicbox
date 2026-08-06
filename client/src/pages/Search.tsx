import { useState } from "react";
import type { Album } from "../types/album";
import AlbumCard from "../components/AlbumCard";

export default function Search() {

    const [term, setTerm] = useState("");
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                `http://localhost:3000/api/search?term=${term}`
            );

            if (!response.ok) {
                throw new Error("Search failed.");
            }

            const data = await response.json();

            setAlbums(data);
        } catch (err) {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <h1>Search Albums</h1>

            <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search album..."
            />

            <button onClick={handleSearch}>
                Search
            </button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {!loading && albums.map((album: Album) => (
                <AlbumCard key={album.id} album={album} />
            ))}
        </div>
    );
}