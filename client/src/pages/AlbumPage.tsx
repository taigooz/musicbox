import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Album } from "../types/album";
import "./AlbumPage.css";
import { Headphones, HeadphoneOff, Star, Edit3 } from "lucide-react";
import Rating from "../components/Rating";
import Review from "../components/Review";

function AlbumPage() {
    const { id } = useParams();

    const [album, setAlbum] = useState<Album | null>(null);

    const [userData, setUserData] = useState<{
        listened: boolean;
        rating: number | null;
        review: string | null;
        reviewedAt: string | null;
    } | null>(null);

    useEffect(() => {
        async function fetchUserData() {
            const response = await fetch(
                `http://localhost:3000/api/albums/${id}/user-data`
            );
            
            const data = await response.json();

            setUserData(data);
        }

        fetchUserData();
    }, [id]);

    useEffect(() => {
        async function fetchAlbum() {
            const response = await fetch(
                `http://localhost:3000/api/albums/${id}`
            );
            
            if (!response.ok) {
                throw new Error("Failed to fetch album");
            }

            const data = await response.json();

            setAlbum(data);
        }

        fetchAlbum();
    }, [id]);

    async function handleListenedClick() {
        if (!userData) {
            return;
        }

        if (userData.listened) {
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

            return;
        }

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

    async function handleRating(rating: number | null) {
        if (rating === null) {
            await fetch(
                `http://localhost:3000/api/albums/${id}/rating`,
                {
                    method: "DELETE"
                }
            );

            setUserData((previous) => ({
                ...previous!,
                rating: null
            }));

            return;
        }

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

    async function handleReview(review: string) {
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

    async function handleDeleteReview() {
        await fetch(
            `http://localhost:3000/api/albums/${id}/review`,
            {
                method: "DELETE"
            }
        );

        setUserData((previous) => ({
            ...previous!,
            review: null,
            reviewedAt: null
        }));
    }

    return (
        <>
            {album && (
                <main className="album-page">
                    <section className="album-header">
                        <img
                            src={album.artworkUrl.replace("100x100bb.jpg", "600x600bb.jpg")}
                            alt={album.title}
                        />

                        <div className="album-info">
                            <h1>{album.title}</h1>

                            <h2>{album.artist}</h2>

                            <p>
                                {new Date(album.releaseDate).getFullYear()}
                            </p>

                            <p>
                                {album.trackCount} tracks
                            </p>
                        </div>
                    </section>
                    <section className="user-activity">
                        <h2>Your <em>musicbox</em> Activity</h2>

                        {userData && (
                            <>
                                <div className="listened-section">
                                    <button
                                        className={`listened-button ${
                                            userData.listened ? "listened" : ""
                                        }`}
                                        onClick={handleListenedClick}
                                        aria-label={
                                            userData.listened
                                                ? "Unlisten from album"
                                                : "Mark album as listened"
                                        }
                                    >
                                        {userData.listened ? (
                                            <>
                                                <Headphones className="headphones-icon" />
                                                <HeadphoneOff className="headphones-off-icon" />
                                            </>
                                        ) : (
                                            <Headphones className="headphones-icon" />
                                        )}
                                    </button>

                                    <span>
                                        {userData.listened
                                            ? "Listened"
                                            : "Mark as listened"}
                                    </span>
                                </div>

                                <div className="rating-section">
                                    <h3>Your Rating</h3>

                                    <Rating
                                        rating={userData.rating}
                                        onChange={handleRating}
                                    />
                                </div>

                                <div className="review-section">
                                    <h3>Your Review</h3>

                                        <Review
                                            review={userData.review}
                                            reviewedAt={userData.reviewedAt}
                                            onSave={handleReview}
                                            onDelete={handleDeleteReview}
                                        />
                                </div>
                            </>
                        )}
                    </section>
                </main>
            )}

            
        </>
    );
}

export default AlbumPage;