import type { Album } from "../types/album";

type TopFourProps = {
    albums: Album[];
};

function TopFour({ albums }: TopFourProps) {
    return (
        <section className="top-four">
            <h2>Top 4</h2>

            <div className="top-four-grid">
                {albums.slice(0, 4).map((album) => (
                    <img
                        key={album.id}
                        src={album.artworkUrl.replace("100x100", "300x300")}
                        alt={album.title}
                    />
                ))}
            </div>
        </section>
    );
}

export default TopFour;