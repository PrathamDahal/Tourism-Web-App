import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { useGetProductsQuery } from "../../../Services/productApiSlice";
import LoadingSpinner from "./../../LoadingSpinner";

const LocalDetails = () => {
  const { data: productsResponse = {}, isLoading } = useGetProductsQuery();
  const products = useMemo(() => productsResponse.data || [], [productsResponse]);
  const [searchTerm, setSearchTerm] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProducts = useMemo(() => {
    if (searchTerm.trim() === "") return [];
    return products.filter((product) =>
      product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  const handleProductClick = (product) => {
    navigate(`/localproducts/product/${product.slug}`);
  };

  // Dynamically set width based on window size
  const getInputWidth = () => {
    if (windowWidth >= 1280) return 420;
    if (windowWidth >= 1024) return 320;
    if (windowWidth >= 768) return 320; // 👈 maintains lg size until md breakpoint
    return 120;
  };

  return (
    <div className="absolute flex flex-col items-center justify-center w-auto h-auto xl:top-[200px] lg:top-[150px] md:top-[120px] top-[80px] xl:left-1/3 lg:left-1/3 md:left-[230px] left-[80px] ">
      <div className="text-center p-1 md:p-6">
        <p className="text-base md:text-xl lg:text-4xl font-bold font-Playfair mb-4 text-white">
          Local Products
        </p>

        {/* Dynamic width applied here */}
        <div
          className="flex items-center justify-between gap-1 px-4 mx-auto mt-4 bg-gray-50 rounded-3xl overflow-hidden"
          style={{ width: `${getInputWidth()}px` }}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[80%] md:p-2 bg-gray-50 text-black focus:outline-none placeholder-sm placeholder-black"
          />
          <button className="text-gray-700 px-2 py-2 rounded-2xl hover:bg-gray-600 transition-all">
            <MdSearch />
          </button>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div
            className="mt-1 overflow-y-auto bg-white rounded-lg shadow-md mx-auto"
            style={{
              width: `${getInputWidth()}px`,
              maxHeight: `${5 * 56}px`,
            }}
          >
            {isLoading ? (
              <p className="p-2 text-gray-500">
                <LoadingSpinner />
              </p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="flex items-center gap-3 py-1 mb-1 px-3 cursor-pointer hover:bg-gray-200 transition-all border-b last:border-none"
                >
                  {windowWidth > 425 && (
                    <img
                      src={
                        product.images?.[0] ||
                        "/assets/Images/default-avatar-image.jpg"
                      }
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                  )}
                  <span className="font-medium justify-center text-gray-800">
                    {product.name}
                  </span>
                </div>
              ))
            ) : (
              <p className="p-2 text-gray-500">No products found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalDetails;
