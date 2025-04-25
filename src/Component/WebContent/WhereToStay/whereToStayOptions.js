import { useState, useEffect } from "react";
import { stayOptions } from "./../../../Data/stayOptions";

const StayOptions = () => {
  const [visibleItems, setVisibleItems] = useState(3);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth >= 1024) {
        setVisibleItems(8);
      } else if (window.innerWidth >= 768) {
        setVisibleItems(6);
      } else if (window.innerWidth >= 425) {
        setVisibleItems(5);
      } else if (window.innerWidth >= 375) {
        setVisibleItems(4);
      } else {
        setVisibleItems(3);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);

    return () => {
      window.removeEventListener("resize", updateVisibleItems);
    };
  }, []);

  const handleToggle = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className="relative bg-gray-200 -mt-[15px] mb-6 py-2 px-8">
      <div className=" flex flex-wrap justify-around gap-4 md:gap-8 p-2 md:p-4">
        {stayOptions
          .slice(0, showMore ? stayOptions.length : visibleItems)
          .map((option, index) => (
            <div
              key={index}
              className="flex flex-col items-center transition-all duration-300"
            >
              <button
                className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full cursor-default focus:outline-none transition-all duration-300"
                style={{ backgroundColor: option.color }}
              >
                <span className="text-white text-[20px] md:text-[24px] lg:text-[28px]">
                  {option.icon()}
                </span>
              </button>
              <span className="mt-2 text-xs md:text-sm lg:text-base font-Open">
                {option.title}
              </span>
            </div>
          ))}
      </div>
        {stayOptions.length > visibleItems && (
          <div className="absolute bottom-0 right-1 text-center mt-4">
            <button
              onClick={handleToggle}
              className="text-blue-500 text-sm hover:underline focus:outline-none"
            >
              {showMore ? "See Less..." : "See More..."}
            </button>
          </div>
        )}
    </div>
  );
};

export default StayOptions;
