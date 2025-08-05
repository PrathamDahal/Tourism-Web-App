import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import PaginationControls from "./../../PaginationControls";
import ProductCard from "./../Product/ProductCardDisplay";
import { useGetCategoriesQuery } from "../../../Services/categoryApiSlice";
import { useGetProductsQuery } from "../../../Services/productApiSlice";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const LocalProductPage = () => {
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [visibleCategoryItems, setVisibleCategoryItems] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);

  const navigate = useNavigate();

  // Fetch categories
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesErrorData,
  } = useGetCategoriesQuery();

  // Fetch products with pagination
  const {
    data: productsData = { data: [], totalProducts: 0 },
    isLoading: productsLoading,
    isError: productsError,
    error: productsErrorData,
  } = useGetProductsQuery({
    page: currentPage,
    limit: productsPerPage,
  });

  const categories = categoriesData || [];
  const products = productsData?.data || [];
  const totalProducts = productsData?.totalProducts || 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleCategoryClick = (category) => {
    navigate(`/localproducts/category/${category.slug}`);
  };

  const handleProductClick = (product) => {
    navigate(`/localproducts/product/${product.slug}`);
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

    const handleResize = () => {
      const newVisibleCategoryItems = getVisibleCategoryItems();
      const newProductsPerPage = getVisibleProductItems();

      // Only update if values have changed
      setVisibleCategoryItems((prev) =>
        prev !== newVisibleCategoryItems ? newVisibleCategoryItems : prev
      );
      setProductsPerPage((prev) =>
        prev !== newProductsPerPage ? newProductsPerPage : prev
      );

      setShowMoreCategories(false);
      setCurrentPage(1);
    };

    // Initial setup
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (categoriesLoading || productsLoading) return <div>Loading...</div>;
  if (categoriesError)
    return <div>Error loading categories: {categoriesErrorData.message}</div>;
  if (productsError)
    return <div>Error loading products: {productsErrorData.message}</div>;

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
          .slice(
            0,
            showMoreCategories ? categories.length : visibleCategoryItems
          )
          .map((category) => (
            <div
              key={category.id}
              className="border p-2 rounded-md cursor-pointer hover:border hover:text-blue-400 hover:border-blue-400 hover:shadow-md"
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={
                  category.imageUrl
                    ? `${API_BASE_URL}/${category.imageUrl}`
                    : "/assets/Images/default-avatar-image.jpg" // assuming public folder
                }
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
        <span className="text-gray-600">
          {totalProducts} products available
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={{
                ...product,
                images: product.images,
                category: product.category || {
                  _id: "",
                  name: "Uncategorized",
                },
              }}
              handleProductClick={() => handleProductClick(product)}
            />
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalProducts > productsPerPage && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={() =>
            setCurrentPage((prev) => Math.max(prev - 1, 1))
          }
          handleNextPage={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          handlePageClick={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default LocalProductPage;
