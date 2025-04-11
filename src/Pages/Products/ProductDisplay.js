import { useNavigate, useParams } from "react-router-dom";
import CustomerFeedback from "./../../Component/WebContent/Product/CustomerFeedback";
import { useRef, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { customerFeedback } from "./../../Data/CustomerFeedback";
import RatingStars from "./../../Component/RatingStars";
import { useGetProductByIdQuery } from "../../Services/auth/productApiSlice";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProductByIdQuery(id); // Fetch data using your API
  const product = data?.product;

  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const galleryContainerRef = useRef(null);

  // Scroll functions
  const scrollUp = () => {
    if (galleryContainerRef.current) {
      galleryContainerRef.current.scrollBy({ top: -100, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (galleryContainerRef.current) {
      galleryContainerRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
  };

  const handleAddToCartClick = () => {
    navigate(`/localproducts/cart`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Product details are not available.</div>;

  const images = product.images || [];

  return (
    <div className="lg:p-4 md:p-1 my-2 font-poppins">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex flex-col md:flex-row md:space-x-1 w-full md:w-1/2">
          {/* Horizontal scroll (mobile) */}
          <div className="md:hidden flex overflow-x-auto bg-white space-x-2 p-2">
            {images.length > 0 ? (
              images.map((img, index) => (
                <img
                  key={index}
                  src={`${API_BASE_URL}/${img}`}
                  alt="Gallery"
                  className="w-12 h-12 object-contain border cursor-pointer hover:opacity-75"
                  onClick={() => setSelectedImage(`${API_BASE_URL}/${img}`)}
                />
              ))
            ) : (
              <p className="text-gray-500">No gallery images</p>
            )}
          </div>

          {/* Vertical scroll (desktop) */}
          <div className="hidden md:flex flex-col items-center">
            <button
              onClick={scrollUp}
              className="p-2 my-2 hover:bg-gray-200 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>

            <div
              ref={galleryContainerRef}
              className="flex flex-col px-1 space-y-1 overflow-y-auto max-h-[275px]"
            >
              {images.length > 0 ? (
                images.map((img, index) => (
                  <img
                    key={index}
                    src={`${API_BASE_URL}/${img}`}
                    alt="Gallery"
                    className="w-20 h-22 object-contain border cursor-pointer hover:opacity-75"
                    onClick={() => setSelectedImage(`${API_BASE_URL}/${img}`)}
                  />
                ))
              ) : (
                <p className="text-gray-500">No gallery images</p>
              )}
            </div>

            <button
              onClick={scrollDown}
              className="p-2 my-2 hover:bg-gray-200 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Main Image */}
          <div className="w-full p-1">
            <img
              src={selectedImage || `${API_BASE_URL}/${images[0]}`}
              alt={product.name || "No Image"}
              className="w-64 h-64 md:w-96 md:h-96 lg:object-cover object-contain"
            />
          </div>
        </div>

        {/* Right Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-xl md:text-left text-center md:text-2xl font-semibold">
            {product.name}
          </h1>
          <RatingStars rating={4} />{" "}
          {/* Static or replace with real rating if available */}
          <p className="text-lg md:text-xl md:text-left text-center font-medium text-blue-500 my-3">
            Nrs {product.price}
          </p>
          <hr className="my-2 border-t-2" />
          <div className="flex flex-col md:flex-row items-center justify-between p-1">
            <p className="text-gray-700 text-sm">
              <span className="font-bold">Seller:</span>{" "}
              {product.seller.name || "No seller info"}
            </p>
            <div className="flex items-center text-sm gap-1 mt-2 md:mt-0">
              <span className="text-gray-600">Share item:</span>
              <FaFacebookF className="text-gray-600 rounded-full px-2 text-[26px] cursor-pointer hover:bg-blue-600 hover:text-white" />
              <FaTwitter className="text-gray-600 rounded-full px-1 text-[26px] cursor-pointer hover:bg-blue-600 hover:text-white" />
              <FaPinterestP className="text-gray-600 rounded-full px-2 text-[26px] cursor-pointer hover:bg-blue-600 hover:text-white" />
              <FaInstagram className="text-gray-600 rounded-full px-2 text-[27px] cursor-pointer hover:bg-blue-600 hover:text-white" />
            </div>
          </div>
          <p className="my-3 w-full md:w-3/4 text-sm text-gray-600">
            <span dangerouslySetInnerHTML={{ __html: product.description }} />
          </p>
          <div className="border-2 my-2 py-2">
            <div className="border-y-2 p-2">
              <button
                className="w-full text-sm flex items-center justify-center gap-2 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
                onClick={handleAddToCartClick}
              >
                Add to Cart <HiOutlineShoppingBag />
              </button>
            </div>
          </div>
          <hr className="my-2 border-t-2" />
          <p className="mt-4 text-gray-600 text-sm">
            <span className="font-bold">Category:</span>{" "}
            {product.category.name || "Uncategorized"}
          </p>
          <p className="mt-1 text-gray-600 text-sm">
            <span className="font-bold">Tags:</span>{" "}
            {product.tags?.length > 0 ? product.tags.join(", ") : "No tags"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="items-center justify-center mt-6">
        <div className="border-b flex gap-6 items-center justify-center">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-2 text-lg font-semibold ${
              activeTab === "description"
                ? "border-b-2 border-blue-500"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`pb-2 text-lg font-semibold ${
              activeTab === "feedback"
                ? "border-b-2 border-blue-500"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Customer Feedback
          </button>
        </div>

        {activeTab === "description" ? (
          <p className="mt-4 text-center text-gray-600">
            {/* Show more HTML description if needed */}
            <span dangerouslySetInnerHTML={{ __html: product.description }} />
          </p>
        ) : (
          <CustomerFeedback feedback={customerFeedback} />
        )}
      </div>
    </div>
  );
};

export default ProductPage;
