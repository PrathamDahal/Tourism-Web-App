import { useEffect, useState } from "react";
import DestinationCarousel from "./Carousel/DestinationCarousel";
import { useNavigate } from "react-router-dom";
import { useGetPublishedDestinationsQuery } from "../../../Services/destinationApiSlice";
import LoadingSpinner from "./../../LoadingSpinner";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const PopularDestinations = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [imagesPerSlide, setImagesPerSlide] = useState(4);
  const navigate = useNavigate();

  // ✅ Get data from API instead of mock data
  const { data, isLoading, error } = useGetPublishedDestinationsQuery();

  // API response shape: { total, page, limit, data: [...] }
  const destinations = data?.data || [];

  useEffect(() => {
    const updateImagesPerSlide = () => {
      if (window.innerWidth >= 1200) {
        setImagesPerSlide(4);
      } else if (window.innerWidth >= 768) {
        setImagesPerSlide(3);
      } else {
        setImagesPerSlide(1);
      }
    };

    updateImagesPerSlide();
    window.addEventListener("resize", updateImagesPerSlide);
    return () => window.removeEventListener("resize", updateImagesPerSlide);
  }, []);

  const goToPrevSlide = () => {
    if (!isSliding && destinations.length > imagesPerSlide) {
      setIsSliding(true);
      setTimeout(() => {
        setStartIndex((prevIndex) =>
          prevIndex === 0
            ? destinations.length - imagesPerSlide
            : prevIndex - imagesPerSlide
        );
        setIsSliding(false);
      }, 300);
    }
  };

  const goToNextSlide = () => {
    if (!isSliding && destinations.length > imagesPerSlide) {
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

  const handleSlideClick = (slug) => {
    navigate(`/wheretogo/destination/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500">Failed to load destinations</p>
    );
  }

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
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${(startIndex / imagesPerSlide) * 100}%)`,
          }}
        >
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className="w-full flex-shrink-0 sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
              onClick={() => handleSlideClick(destination.slug)}
            >
              <DestinationCarousel
                title={destination.name}
                images={
                  destination.images?.length > 0
                    ? destination.images.map(
                        (img) => `${API_BASE_URL}${img}`
                      )
                    : destination.heroImageUrl
                    ? [
                        `${API_BASE_URL}${destination.heroImageUrl}`,
                      ]
                    : []
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;
