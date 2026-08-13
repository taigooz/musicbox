import type { Album } from "../types/album";
import { useNavigate } from "react-router-dom";
import "./AlbumCard.css";

type AlbumCardProps = {
    album: Album;
};

function AlbumCard({ album }: AlbumCardProps) {
    const navigate = useNavigate();

    const handleCardClick = async () => {
        try {
            // Use the source from the album data returned by search
            const response = await fetch(
                `http://localhost:3000/api/albums/external/${album.source}/${encodeURIComponent(String(album.id))}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch album");
            }

            const musicboxAlbum = await response.json();
            const publicId = musicboxAlbum.id.replace(/^alb_/, "");
            navigate(`/album/${publicId}`);
        } catch (error) {
            console.error("Error loading album:", error);
        }
    };

    return (
        <div className="album-card" onClick={handleCardClick}>
            <img src={album.artworkUrl} alt={album.title} />

            <h2>{album.title}</h2>

            <p>{album.artist}</p>
        </div>
    );
}

export default AlbumCard;