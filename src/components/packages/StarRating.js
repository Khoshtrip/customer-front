import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // Import star icons from react-icons

const StarRating = ({ packageId, onRate }) => {
    const [rating, setRating] = useState(0); // Current selected rating
    const [hover, setHover] = useState(0); // Rating being hovered over

    // Handle when a star is clicked
    const handleClick = async (e, selectedRating) => {
        e.stopPropagation();
        setRating(selectedRating);
        onRate(packageId, selectedRating);
    };

    return (
        <div>
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={starValue}
                            onClick={(e) => handleClick(e, starValue)}
                            style={{ display: "none" }} // Hide the radio button
                        />
                        <FaStar
                            className="star"
                            color={
                                starValue <= (hover || rating)
                                    ? "#ffc107"
                                    : "#e4e5e9"
                            }
                            size={24}
                            onMouseEnter={() => setHover(starValue)}
                            onMouseLeave={() => setHover(0)}
                            style={{ cursor: "pointer" }}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
