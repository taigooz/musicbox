import type { Album } from "../types/album";

type AlbumCardProps = {
    album: Album;
};

function AlbumCard({ album }: AlbumCardProps) {
    return (
        <div className="album-card">
            <img src={album.artwork} alt={album.title} />

            <h2>{album.title}</h2>

            <p>{album.artist}</p>

            <p>{new Date(album.releaseDate).getFullYear()}</p>
        </div>
    );
}

export default AlbumCard;