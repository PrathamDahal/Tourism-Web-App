import React, { useState, useEffect } from "react";
import { stays } from "./../../../Data/stayOptions";
import { stayOptions } from "./../../../Data/stayOptions";
import ImageCarousel from "./ImageCarousel";
import { useNavigate } from "react-router-dom";
import PaginationControls from './../../PaginationControls';
import FilterComponent from "../Category/FilterComponent";

const Stays = () => {
  const [sort, setSort] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const navigate = useNavigate();

  // Initialize filter state
  const [filters, setFilters] = useState({
    selectedSubCategories: [],
    priceRange: [0, Math.max(...stays.map(stay => stay.price))],
    minRating: null,
    selectedTags: [],
  });

  // Extract all unique subcategories from stays
  const subcategories = [...new Set(stays.map(stay => stay.type))];

  // Extract all unique tags from stays (assuming each stay has a tags property)
  const allTags = [...new Set(stays.flatMap(stay => stay.tags || []))];

  const handleSort = (items) => {
    if (sort === "price-low-high") {
      return items.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high-low") {
      return items.sort((a, b) => b.price - a.price);
    }
    return items;
  };

  // Apply all filters to stays
  const applyFilters = () => {
    let filtered = [...stays];
    
    // Apply subcategory filter
    if (filters.selectedSubCategories.length > 0) {
      filtered = filtered.filter(stay => 
        filters.selectedSubCategories.includes(stay.type)
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(stay => 
      stay.price >= filters.priceRange[0] && stay.price <= filters.priceRange[1]
    );
    
    // Apply rating filter
    if (filters.minRating) {
      filtered = filtered.filter(stay => 
        stay.rating >= filters.minRating
      );
    }
    
    // Apply tags filter
    if (filters.selectedTags.length > 0) {
      filtered = filtered.filter(stay => 
        filters.selectedTags.some(tag => stay.tags?.includes(tag))
      );
    }
    
    return filtered;
  };

  const filteredStays = applyFilters();
  const sortedStays = handleSort([...filteredStays]);

  const getStayTypeColor = (stayType) => {
    const option = stayOptions.find((opt) => opt.title === stayType);
    return option?.color || "#000";
  };

  // Update itemsPerPage based on screen width
  const updateItemsPerPage = () => {
    const width = window.innerWidth;

    if (width >= 1280) {
      setItemsPerPage(8);
    } else if (width >= 1024) {
      setItemsPerPage(6);
    } else if (width >= 768) {
      setItemsPerPage(4);
    } else {
      setItemsPerPage(4);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(sortedStays.length / itemsPerPage);
  const displayedStays = sortedStays.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStayClick = (stayId) => {
    navigate(`/wheretostay/accomodation/${stayId}`);
  };

  const gridColumnsClass = "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className="flex flex-col md:flex-row py-2 px-4">
      {/* Filter Component */}
      <div className="w-full md:w-1/4 lg:w-1/5 pr-0 md:pr-4">
        <FilterComponent 
          subcategories={subcategories}
          allTags={allTags}
          filters={filters}
          setFilters={setFilters}
          handleFilterApply={() => {}} // No need for separate apply in this case
        />
      </div>
      
      {/* Stays List */}
      <div className="w-full md:w-3/4 lg:w-4/5">
        {/* Sort Controls (optional) */}
        <div className="flex justify-end mb-4">
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded p-2 text-sm"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>
        
        <div className={`grid gap-4 ${gridColumnsClass}`}>
          {displayedStays.map((stay) => (
            <div
              className="relative p-2 mb-4 cursor-pointer"
              key={stay.id}
              onClick={() => handleStayClick(stay.id)}
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
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={() => goToPage(currentPage - 1)}
          handleNextPage={() => goToPage(currentPage + 1)}
          handlePageClick={(page) => goToPage(page)}
        />
      </div>
    </div>
  );
};

export default Stays;