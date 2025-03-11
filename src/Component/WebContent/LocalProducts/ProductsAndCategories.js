import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Products from "./../../../Data/Products";
import { FaArrowRight } from "react-icons/fa";
import PaginationControls from "./../../PaginationControls"; 
import ProductCard from './../Product/ProductCardDisplay';

const LocalProductPage = () => {
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [visibleCategoryItems, setVisibleCategoryItems] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  
  const navigate = useNavigate(); // Initialize navigate function

  const categories = Array.from(
    new Set(Products.map((product) => product.category.name))
  ).map((categoryName) => {
    return Products.find((product) => product.category.name === categoryName).category;
  });

  const handleCategoryClick = (category) => {
    navigate(`/localproducts/category/${category.id}`); // Only pass the category ID
  };
  
  const handleProductClick = (product) => {
    navigate(`/localproducts/product/${product.id}`); // Only pass the product ID
  };

  useEffect(() => {
    const getVisibleCategoryItems = () => {
      if (window.innerWidth >= 1280) return 10;
      if (window.innerWidth >= 1024) return 5;
      if (window.innerWidth >= 768) return 4;
      return 2;
    };

    const getVisibleProductItems = () => {
      if (window.innerWidth >= 1280) return 20;
      if (window.innerWidth >= 1024) return 15;
      if (window.innerWidth >= 768) return 12;
      return 8;
    };

    setVisibleCategoryItems(getVisibleCategoryItems());
    setProductsPerPage(getVisibleProductItems());

    const handleResize = () => {
      setVisibleCategoryItems(getVisibleCategoryItems());
      setProductsPerPage(getVisibleProductItems());
      setShowMoreCategories(false);
      setCurrentPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(Products.length / productsPerPage);

  return (
    <div className="p-4 items-center justify-center xl:mx-44 lg:mx-32 md:mx-20 mx-2">
      {/* Product Categories Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Categories</h1>
        {categories.length > visibleCategoryItems && (
          <button
            className="text-blue-500 text-sm hover:underline flex items-center gap-1"
            onClick={() => setShowMoreCategories(!showMoreCategories)}
          >
            {showMoreCategories ? "Show Less" : "View All"}
            {!showMoreCategories && <FaArrowRight className="inline-block" />}
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {categories
          .slice(0, showMoreCategories ? categories.length : visibleCategoryItems)
          .map((category) => (
            <div
              key={category.id}
              className="border p-2 rounded-md cursor-pointer hover:border hover:text-blue-400 hover:border-blue-400 hover:shadow-md"
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={category.categoryImage}
                alt={category.name}
                className="w-full h-36 object-cover rounded-sm mb-2"
              />
              <h2 className="text-lg font-medium font-poppins text-center">
                {category.name}
              </h2>
            </div>
          ))}
      </div>

      {/* Products Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleProductClick={() => handleProductClick(product)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {Products.length > productsPerPage && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          handleNextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          handlePageClick={setCurrentPage}
        />
      )}
    </div>
  );
};

export default LocalProductPage;
