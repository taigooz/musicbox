import type { Album } from "../types/album";
import { useNavigate } from "react-router-dom";
import "./AlbumCard.css";

type AlbumCardProps = {
    album: Album;
};

function AlbumCard({ album }: AlbumCardProps) {
    const navigate = useNavigate();

    const handleCardClick = async () => {
        const response = await fetch("http://localhost:3000/api/albums", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: album.title,
                artist: album.artist,
                releaseDate: album.releaseDate,
                artworkUrl: album.artworkUrl,
                explicit: album.explicit,
                trackCount: album.trackCount,
                source: "itunes",
                externalId: String(album.id)
            })
        });

        if (!response.ok) {
            throw new Error("Failed to create album");
        }
        const musicboxAlbum = await response.json();
        const publicId = musicboxAlbum.id.replace(/^alb_/, "");
        navigate(`/album/${publicId}`);
    };

    return (
        <div className="album-card" onClick={handleCardClick}>
            <img src={album.artworkUrl} alt={album.title} />

            <h2>{album.title}</h2>

            <p>{album.artist}</p>

            <p>{new Date(album.releaseDate).getFullYear()}</p>
        </div>
    );
}

export default AlbumCard;