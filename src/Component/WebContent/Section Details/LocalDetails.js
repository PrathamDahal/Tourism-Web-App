import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { useGetProductsQuery } from "../../../Services/productApiSlice";

const LocalDetails = () => {
  const { data: productsResponse = {}, isLoading } = useGetProductsQuery();
  const products = useMemo(
    () => productsResponse.data || [],
    [productsResponse]
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/localproducts/product/${product.slug}`);
  };

  return (
    <div className="absolute flex flex-col items-center justify-center w-auto h-auto xl:top-[200px] lg:top-[150px] md:top-[120px] top-[80px] xl:left-1/3 lg:left-1/4 md:left-[230px] left-[50px] ">
      <div className="text-center p-1 md:p-6">
        <p className="text-base md:text-xl lg:text-4xl font-bold font-Playfair mb-4 text-white">
          Local Products
        </p>

        <div className="flex items-center justify-between gap-1 px-4 mx-auto mt-4 w-[120px] md:w-[220px] lg:w-[320px] xl:w-[420px] bg-gray-50 rounded-3xl overflow-hidden">
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
            className="mt-1 overflow-y-auto bg-white rounded-lg shadow-md w-full md:w-[220px] lg:w-[320px] xl:w-[420px] mx-auto"
            style={{ maxHeight: `${5 * 56}px` }} // 5 items * 56px height
          >
            {isLoading ? (
              <p className="p-2 text-gray-500">Loading...</p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="p-3 cursor-pointer hover:bg-gray-200 transition-all border-b last:border-none"
                >
                  {product.name}
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
