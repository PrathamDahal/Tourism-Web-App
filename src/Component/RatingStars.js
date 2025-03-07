import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center md:justify-normal justify-center mt-2">
      {Array.from({ length: 5 }, (_, index) => {
        if (index < Math.floor(rating)) {
          return <FaStar key={index} className="text-yellow-500 text-xs" />;
        } else if (index < Math.ceil(rating) && rating % 1 !== 0) {
          return <FaStarHalfAlt key={index} className="text-yellow-500 text-xs" />;
        } else {
          return <FaRegStar key={index} className="text-yellow-500 text-xs" />;
        }
      })}
    </div>
  );
};

export default RatingStars;