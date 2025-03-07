import React from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const PaginationControls = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  handlePageClick,
}) => {
  // Function to get pagination buttons
  const getPaginationButtons = () => {
    // Define visible page count based on screen size
    const visiblePages = {
      sm: 4, // Small screens (default)
      md: 6, // Medium screens
      lg: 8, // Large screens
      xl: 12, // Extra large screens
    };

    let visiblePageCount = visiblePages.sm;

    // Check screen sizes
    const ismd = window.matchMedia("(min-width: 768px)").matches;
    const islg = window.matchMedia("(min-width: 1024px)").matches;
    const isxl = window.matchMedia("(min-width: 1280px)").matches;

    if (isxl) {
      visiblePageCount = visiblePages.xl;
    } else if (islg) {
      visiblePageCount = visiblePages.lg;
    } else if (ismd) {
      visiblePageCount = visiblePages.md;
    }

    // Calculate range of pages to show
    let startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
    let endPage = Math.min(totalPages, startPage + visiblePageCount - 1);

    // Adjust start page if end page is at maximum
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - visiblePageCount + 1);
    }

    const pages = [];

    // Add first page and ellipsis if necessary
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2">
            ...
          </span>
        );
      }
    }

    // Add visible page buttons
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 rounded ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    // Add last page and ellipsis if necessary
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-2">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-around items-center gap-4 mt-8">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="flex items-center gap-1 text-blue-500 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        <FaArrowCircleLeft className="text-3xl" />
      </button>
      <div className="flex gap-2 p-1">{getPaginationButtons()}</div>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 text-blue-500 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        <FaArrowCircleRight className="text-3xl" />
      </button>
    </div>
  );
};

export default PaginationControls;