import { useEffect, useState } from "react";
import type { Album } from "../../types/album";
import "./ProfileAlbums.css"

function ProfileAlbums() {
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        async function fetchLibrary() {
            const response = await fetch(
                "http://localhost:3000/api/albums/library"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch library");
            }

            const data = await response.json();

            setAlbums(data);
        }

        fetchLibrary();
    }, []);

    return (
        <section>
            <h2>Albums</h2>

            <div className="profile-album-grid">
                {albums.map((album) => (
                    <div
                        key={album.id}
                        className="profile-album"
                    >
                        <img
                            src={album.artworkUrl.replace('100x100', '300x300')}
                            alt={album.title}
                        />

                        <h3>{album.title}</h3>
                        <p>{album.artist}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProfileAlbums;