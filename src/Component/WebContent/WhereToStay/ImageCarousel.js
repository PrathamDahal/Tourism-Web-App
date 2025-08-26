import { useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ArrowButton = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute z-10 top-1/2 -translate-y-1/2 ${
      direction === "prev" ? "left-2" : "right-2"
    } bg-white px-2.5 py-1 font-bold rounded-full shadow-lg hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    aria-label={direction === "prev" ? "Previous Slide" : "Next Slide"}
  >
    {direction === "prev" ? "<" : ">"}
  </button>
);

const ImageCarousel = ({ images = [], stayType, getStayTypeColor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageError = (e) => {
    console.error("Image failed to load:", e.target.src);
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "flex";
  };

  return (
    <div className="relative group overflow-hidden rounded-lg hover:border-gray-400 hover:border">
      {/* Image Container */}
      <div className="relative w-full h-80 overflow-hidden transition-transform duration-300 group-hover:scale-105">
        {images?.length > 0 ? (
          <>
            <img
              src={
                images[currentIndex]?.startsWith("http")
                  ? images[currentIndex]
                  : `${API_BASE_URL}${images[currentIndex]}`
              }
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 w-full h-full items-center justify-center text-gray-500 bg-gray-100 hidden">
              Image not available
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
            No images available
          </div>
        )}
      </div>

      {/* Custom Arrow Buttons */}
      {images?.length > 1 && (
        <>
          <ArrowButton direction="prev" onClick={goToPrevSlide} />
          <ArrowButton direction="next" onClick={goToNextSlide} />
        </>
      )}

      {/* Stay Type Label */}
      {stayType && (
        <p
          className="absolute z-10 top-0 right-0 px-3 py-1 text-white text-sm font-medium rounded-bl-md"
          style={{ backgroundColor: getStayTypeColor(stayType) }}
        >
          {stayType}
        </p>
      )}

      {/* Pagination Dots */}
      {images?.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
