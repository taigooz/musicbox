import "./Rating.css"

type RatingProps = {
    rating: number | null;
    onChange: (rating: number | null) => void;
};

function Rating({ rating, onChange }: RatingProps) {
    return (
        <div className="rating">
            <div className="rating-buttons">
                {Array.from({ length: 10 }, (_, index) => {
                    const value = index + 1;

                    return (
                        <button
                            key={value}
                            className={rating === value ? "selected" : ""}
                            onClick={() => onChange(rating === value ? null : value)}
                        >
                            {value}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default Rating;