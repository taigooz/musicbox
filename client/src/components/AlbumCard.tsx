import type { Album } from "../types/album";
import { useNavigate } from "react-router-dom";
import "./AlbumCard.css";

type AlbumCardProps = {
    album: Album;
};

function AlbumCard({ album }: AlbumCardProps) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/album/${album.id}`);
    };

    return (
        <div className="album-card" onClick={handleCardClick}>
            <img src={album.artwork} alt={album.title} />

            <h2>{album.title}</h2>

            <p>{album.artist}</p>

            <p>{new Date(album.releaseDate).getFullYear()}</p>
        </div>
    );
}

export default AlbumCard;