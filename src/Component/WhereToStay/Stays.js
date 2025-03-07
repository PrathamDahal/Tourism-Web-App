import React, { useState, useEffect } from "react";
import { stays } from "../../Data/stayOptions";
import { stayOptions } from "./../../Data/stayOptions";
import ImageCarousel from "./ImageCarousel"; // Import the custom component
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Stays = () => {
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default for sm and smaller screens
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSort = (items) => {
    if (sort === "price-low-high") {
      return items.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high-low") {
      return items.sort((a, b) => b.price - a.price);
    }
    return items;
  };

  const filteredStays = filter
    ? stays.filter((stay) => stay.type === filter)
    : stays;

  const sortedStays = handleSort([...filteredStays]);

  const getStayTypeColor = (stayType) => {
    const option = stayOptions.find((opt) => opt.title === stayType);
    return option?.color || "#000";
  };

  // Update itemsPerPage based on screen width
  const updateItemsPerPage = () => {
    const width = window.innerWidth;

    if (width >= 1280) {
      setItemsPerPage(8); // XL screens
    } else if (width >= 1024) {
      setItemsPerPage(6); // LG screens
    } else if (width >= 768) {
      setItemsPerPage(4); // MD screens
    } else {
      setItemsPerPage(4); // SM and smaller screens
    }
  };

  // Call updateItemsPerPage on resize
  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Calculate the number of pages
  const totalPages = Math.ceil(sortedStays.length / itemsPerPage);

  // Get the stays for the current page
  const displayedStays = sortedStays.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Change page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Function to handle stay card click
  const handleStayClick = (stayId) => {
    navigate(`/wheretostay/accomodation/${stayId}`); // Navigate to the stay details page
  };

  // Dynamic grid classes based on number of items per page
  const gridColumnsClass = "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className="py-2 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10 p-2 space-y-4 md:space-y-0">
        <div className="text-center md:text-left font-Playfair font-semibold text-[24px] md:text-[28px]">
          Explore Your Stay Options
        </div>

        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={() => setFilter(null)}
            className="text-gray-700 font-Open font-bold"
          >
            Clear Filters
          </button>

          <div className="w-full md:w-auto rounded-lg border border-gray-300 shadow-sm items-center p-1">
            <p className="mb-1 pl-1 text-xs">Sort by</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="font-Open text-sm w-full md:w-auto"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`grid gap-4 ${gridColumnsClass}`}>
        {displayedStays.map((stay) => (
          <div
            className="relative p-2 mb-4 cursor-pointer" // Add cursor-pointer
            key={stay.id}
            onClick={() => handleStayClick(stay.id)} // Add onClick handler
          >
            <div className="border rounded-lg items-center mb-2 overflow-hidden">
              <ImageCarousel
                images={stay.image}
                stayType={stay.type}
                getStayTypeColor={getStayTypeColor}
              />
            </div>

            <div className="py-1">
              <h2 className="font-medium text-[14px] md:text-[16px] font-Open">
                {stay.title}
              </h2>
              <div className="flex flex-col md:flex-row text-[12px] md:text-[14px]">
                <p className="text-gray-700">{stay.location}</p>
                <p className="text-gray-700 md:pl-2">
                  Mobile: {stay.contact}
                </p>
              </div>
              <p className="font-bold mt-2 font-Open text-[15px] md:text-[17px]">
                NRS {stay.price}{" "}
                <span className="text-[13px] md:text-[15px] font-medium">
                  / night
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 rounded-md"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="font-medium text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 rounded-md"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stays;