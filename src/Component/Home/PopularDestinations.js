import React, { useEffect, useState } from "react";
import DestinationCarousel from "./Carousel/DestinationCarousel";
import { destinations } from "../../Data/DestinationCarousel";

const PopularDestinations = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [imagesPerSlide, setImagesPerSlide] = useState(4);

  useEffect(() => {
    const updateImagesPerSlide = () => {
      if (window.innerWidth >= 1200) {
        setImagesPerSlide(4); // XL screen
      } else if (window.innerWidth >= 768) {
        setImagesPerSlide(3); // MD screen
      } else {
        setImagesPerSlide(1); // Mobile screen
      }
    };

    updateImagesPerSlide(); // Initial setup
    window.addEventListener("resize", updateImagesPerSlide); // Listen for resizing

    return () => window.removeEventListener("resize", updateImagesPerSlide); // Cleanup listener
  }, []);

  const goToPrevSlide = () => {
    if (!isSliding) {
      setIsSliding(true);
      setTimeout(() => {
        setStartIndex((prevIndex) =>
          prevIndex === 0 ? destinations.length - imagesPerSlide : prevIndex - imagesPerSlide
        );
        setIsSliding(false);
      }, 300); 
    }
  };

  const goToNextSlide = () => {
    if (!isSliding) {
      setIsSliding(true);
      setTimeout(() => {
        setStartIndex((prevIndex) =>
          prevIndex + imagesPerSlide >= destinations.length
            ? 0
            : prevIndex + imagesPerSlide
        );
        setIsSliding(false);
      }, 300); 
    }
  };

  return (
    <div className="py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex md:space-x-4 items-center gap-2 md:gap-16 justify-center mx-auto">
          <button
            onClick={goToPrevSlide}
            className="bg-yellow-500 px-3 py-1 font-semibold rounded-full text-[22px] text-white shadow-md hover:bg-yellow-600"
          >
            &lt;
          </button>
          <h2 className="text-center font-Playfair font-semibold sm:text-2xl">
            Popular Destinations
          </h2>
          <button
            onClick={goToNextSlide}
            className="bg-yellow-500 px-3 py-1 font-semibold rounded-full text-[22px] text-white shadow-md hover:bg-yellow-600"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        {/* Slide Container */}
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${(startIndex / imagesPerSlide) * 100}%)`,
          }}
        >
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <DestinationCarousel
                key={index}
                title={destination.title}
                images={destination.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;
