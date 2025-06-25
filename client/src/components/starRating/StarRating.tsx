import React from "react";

type StarRatingProps = {
  rating: number;
};

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div style={{ fontSize: 25, color: "#FF7700" }}>
      {"★".repeat(fullStars)}
      {halfStar ? "⯪" : ""}
      {"☆".repeat(emptyStars)}
    </div>
  );
};

export default StarRating;
