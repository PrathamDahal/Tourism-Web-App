import { useEffect, useState } from "react";
import { stayOptions } from "../../../Data/stayOptions";
import FeaturedCarousel from "./Carousel/FeaturedCarousel";
import { useNavigate } from "react-router-dom";
import { useGetTravelPackagesQuery } from "../../../Services/travelPackageApiSlice";

const TravelPackagesCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [imagesPerSlide, setImagesPerSlide] = useState(4);
  const navigate = useNavigate();

  // ✅ Fetch travel packages
  const { data: packagesRaw, isLoading, error } = useGetTravelPackagesQuery();

  const stays = packagesRaw?.data || [];

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
    if (!isSliding && stays.length) {
      setIsSliding(true);
      setTimeout(() => {
        setStartIndex((prevIndex) =>
          prevIndex === 0
            ? stays.length - imagesPerSlide
            : prevIndex - imagesPerSlide
        );
        setIsSliding(false);
      }, 300);
    }
  };

  const goToNextSlide = () => {
    if (!isSliding && stays.length) {
      setIsSliding(true);
      setTimeout(() => {
        setStartIndex((prevIndex) =>
          prevIndex + imagesPerSlide >= stays.length
            ? 0
            : prevIndex + imagesPerSlide
        );
        setIsSliding(false);
      }, 300);
    }
  };

  const getStayTypeColor = (stayType) => {
    const option = stayOptions.find((opt) => opt.title === stayType);
    return option?.color || "#000";
  };

  const handleSlideClick = (slug) => {
    navigate(`/travel-packages/travel-deals/${slug}`);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load packages.</p>;

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
            Travel Packages
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
          {stays.map((stay, index) => (
            <div
              key={stay.id || index}
              className="w-full flex-shrink-0 sm:w-1/2 md:w-1/3 lg:w-1/4"
              onClick={() => handleSlideClick(stay.slug)}
            >
              <FeaturedCarousel
                images={Array.isArray(stay.images) ? stay.images : []} // ✅ correct field
                stayType={stay.type}
                getStayTypeColor={getStayTypeColor}
              />

              <div className="py-1">
                <h2 className="font-medium text-[14px] font-Open">
                  {stay.name}
                </h2>
                <p className="text-gray-700 text-xs font-Open">
                  Duration: {stay.durationDays} Days / {stay.durationNights} Nights
                </p>
                <p className="font-bold mt-2 font-Open text-[15px]">
                  NRS {stay.price}{" "}
                  <span className="text-[14px] font-medium font-Open">/ person</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelPackagesCarousel;
