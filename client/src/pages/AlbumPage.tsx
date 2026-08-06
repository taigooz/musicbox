import { useParams } from "react-router-dom";

function AlbumPage() {
    const { id } = useParams();
    const hasLetters = id ? /[A-Za-z]/.test(id) : false;
    if (!id || id.length <= 6 || id.length >= 16 || hasLetters) {
        return (
            <div>
                <h1>Invalid Album ID</h1>
                <p>The album ID must be between 7 and 15 characters long and cannot contain letters.</p>
            </div>
        );
    }
    return (
        <>
            {id && id.length > 6 && id.length < 16 && !hasLetters && (
                <div>
                    <h1>Album Page</h1>
                    <p>Album ID: {id}</p>
                </div>
            )}
        </>
    );
}

export default AlbumPage;