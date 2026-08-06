import { useState } from "react";

export default function Search() {

    const [term, setTerm] = useState("");
    const [albums, setAlbums] = useState([]);

    async function handleSearch() {
        const response = await fetch(
            `http://localhost:3000/api/search?term=${term}`
        );

        const data = await response.json();

        setAlbums(data);
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

            {albums.map((album: any) => (
                <div key={album.id}>
                    <img src={album.artwork} alt={album.title} />

                    <h3>{album.title}</h3>

                    <p>{album.artist}, {new Date(album.releaseDate).getFullYear()}</p>
                </div>
            ))}
        </div>
    );
}