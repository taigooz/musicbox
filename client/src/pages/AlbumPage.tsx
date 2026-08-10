import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AlbumPage() {
    const { id } = useParams();
    const [userData, setUserData] = useState<{
        listened: boolean;
        rating: number | null;
        review: string | null;
        reviewedAt: string | null;
    } | null>(null);

    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState("");

    useEffect(() => {
        async function fetchUserData() {
            const response = await fetch(
                `http://localhost:3000/api/albums/${id}/user-data`
            );
            
            const data = await response.json();

            setUserData(data);
            setRating(data.rating ?? 0);
            setReview(data.review ?? "");
        }

        fetchUserData();
    }, [id]);

    async function handleMarkAsListened() {
        await fetch(
            `http://localhost:3000/api/albums/${id}/listened`,
            {
                method: "POST"
            }
        );

        setUserData((previous) => ({
            ...previous!,
            listened: true
        }));
    }

    async function handleRateAlbum() {
        await fetch(
            `http://localhost:3000/api/albums/${id}/rating`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    rating
                })
            }
        );

        setUserData((previous) => ({
            ...previous!,
            listened: true,
            rating
        }));
    }

    async function handleReviewAlbum() {
        await fetch(
            `http://localhost:3000/api/albums/${id}/review`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    review
                })
            }
        );

        setUserData((previous) => ({
            ...previous!,
            listened: true,
            review,
            reviewedAt: new Date().toISOString()
        }));
    }

    async function handleUnlisten() {
        const confirmed = window.confirm(
            "Are you sure you want to unlisten? This will remove your rating and review."
        );

        if (!confirmed) {
            return;
        }

        await fetch(
            `http://localhost:3000/api/albums/${id}/user-data`,
            {
                method: "DELETE"
            }
        );

        setUserData({
            listened: false,
            rating: null,
            review: null,
            reviewedAt: null
        });

        setReview("");
        setRating(0);
    }

    return (
        <>
            {id &&
                <div>
                    <h1>Album Page</h1>
                </div>}

            {userData && (
                <div>
                    <p>Listened: {userData.listened ? "Yes" : "No"}</p>
                    <p>
                        Rating:{" "}
                        {userData.rating !== null
                            ? `${userData.rating}/10`
                            : "Not rated"}
                    </p>
                    <p>
                        Review: {userData.review ?? "No review"}
                    </p>
                </div>
            )}
            <button onClick={handleMarkAsListened}>
                Mark as listened
            </button>
            <button onClick={handleUnlisten}>
                Unlisten
            </button>
            <div>
                <label htmlFor="rating">Rating: </label>
                <select
                    id="rating"
                    value={rating}
                    onChange={(event) => setRating(Number(event.target.value))}
                >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                </select>

                <button onClick={handleRateAlbum}>
                    Rate
                </button>
            </div>
            <div>
                <label htmlFor="review">Review: </label>
                <textarea
                    id="review"
                    value={review}
                    onChange={(event) => setReview(event.target.value)}
                    rows={8}
                />
                <button onClick={handleReviewAlbum}>
                    Submit Review
                </button>
            </div>
        </>
    );
}

export default AlbumPage;