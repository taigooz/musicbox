import type { Album } from '../types/album';

type AlbumCardProps = {
    album: Album;
}

function AlbumCard({ album }: AlbumCardProps) {
    return (
        <div className="album-card">
            <h2>{album.title}</h2>
            <p>Artist: {album.artist}</p>
            <p>Year: {album.year}</p>
        </div>
    );
}

export default AlbumCard;