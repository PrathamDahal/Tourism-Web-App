import { FaStar, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating = 0, onChange, interactive = false }) => {
  const handleClick = (index) => {
    if (interactive && onChange) {
      onChange(index + 1); // Rating is 1-based
    }
  };

  return (
    <div className="flex items-center md:justify-normal justify-center mt-2">
      {Array.from({ length: 5 }, (_, index) => {
        const isFilled = index < Math.round(rating);
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            className="focus:outline-none"
          >
            {isFilled ? (
              <FaStar className="text-yellow-500 text-base" />
            ) : (
              <FaRegStar className="text-yellow-500 text-base" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;
