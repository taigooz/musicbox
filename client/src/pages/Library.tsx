import { useEffect, useState } from "react";
import type { Album } from "../types/album";

export default function Library() {
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        async function fetchLibrary() {
            const response = await fetch(
                "http://localhost:3000/api/albums/library"
            );

            const data = await response.json();

            setAlbums(data);
        }

        fetchLibrary();
    }, []);

    return (
        <div>
            <h1>My Library</h1>

            {albums.map((album) => (
                <div key={album.id}>
                    <h2>
                        <a href={`/album/${album.id.replace("alb_", "")}`}>{album.title}</a>
                    </h2>
                    <p>{album.artist}, {new Date(album.releaseDate).getFullYear()}</p>
                </div>
            ))}
        </div>
    );
}