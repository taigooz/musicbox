import { useEffect, useState } from "react";
import "./Review.css";

type ReviewProps = {
    review: string | null;
    reviewedAt: string | null;
    onSave: (review: string) => void;
    onDelete: () => void;
};

function Review({ review, reviewedAt, onSave, onDelete }: ReviewProps) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(review ?? "");

    useEffect(() => {
        setText(review ?? "");
    }, [review]);

    function handleSave() {
        onSave(text);
        setEditing(false);
    }

    function handleEdit() {
        setText(review ?? "");
        setEditing(true);
    }

    if (editing) {
        return (
            <div className="review">
                <textarea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Write your review..."
                />

                <div className="review-actions">
                    <button onClick={handleSave}>
                        Save
                    </button>

                    <button onClick={() => setEditing(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    if (!review) {
        return (
            <div className="review">
                <p>No review yet.</p>

                <button onClick={() => setEditing(true)}>
                    Write a Review
                </button>
            </div>
        );
    }

    return (
        <div className="review">
            <p className="review-text">
                {review}
            </p>

            <div className="review-actions">
                <button onClick={handleEdit}>
                    Edit
                </button>

                <button onClick={() => {
                    const confirmed = window.confirm(
                        "Are you sure you want to delete your review?"
                    );

                    if (confirmed) {
                        onDelete();
                    }
                }}>
                    Delete
                </button>
            </div>
            {reviewedAt && (
                <p className="review-date">
                    Reviewed {new Date(reviewedAt).toLocaleDateString()}, at {new Date(reviewedAt).toLocaleTimeString()}
                </p>
            )}
        </div>
    );
}

export default Review;