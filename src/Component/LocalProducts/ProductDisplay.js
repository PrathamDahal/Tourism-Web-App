import { useRef, useState } from "react";
import {
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import CustomerFeedback from "./CustomerFeedback"; // Import the CustomerFeedback component
import { customerFeedback } from "../../Data/CustomerFeedback";

const ProductDetails = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(
    product.productImage[0]?.url || "Image"
  );
  const [activeTab, setActiveTab] = useState("description"); // State to manage active tab

  // Ref for the gallery container
  const galleryContainerRef = useRef(null);

  // Function to scroll the gallery up
  const scrollUp = () => {
    if (galleryContainerRef.current) {
      galleryContainerRef.current.scrollBy({ top: -100, behavior: "smooth" });
    }
  };

  // Function to scroll the gallery down
  const scrollDown = () => {
    if (galleryContainerRef.current) {
      galleryContainerRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
  };

  if (!product) {
    return (
      <div className="p-6 text-center text-gray-600">
        Product details are not available.
      </div>
    );
  }

  return (
    <div className="p-4 my-5 bg-gray-100 font-poppins">
      <div className="flex gap-4">
        <div className="flex space-x-4 w-1/2">
          {/* Left Section: Product Image Gallery with Scroll Arrows */}
          <div className="flex flex-col items-center p-2">
            {/* Up Arrow */}
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

            {/* Scrollable Gallery Container */}
            <div
              ref={galleryContainerRef}
              className="flex flex-col px-1 space-y-1 overflow-y-auto max-h-[275px]" // Height for 4 images (64px + 8px spacing)
            >
              {product.productImage?.length > 0 ? (
                product.productImage.map((img, index) => (
                  <img
                    key={img.id || index}
                    src={img.url}
                    alt="Gallery"
                    className="w-20 h-22 object-contain border cursor-pointer hover:opacity-75"
                    onClick={() => setSelectedImage(img.url)}
                  />
                ))
              ) : (
                <p className="text-gray-500">No gallery images</p>
              )}
            </div>

            {/* Down Arrow */}
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
          <div className="p-1">
            <img
              src={selectedImage}
              alt={product.name || "No Image"}
              className="w-96 h-96 object-contain"
            />
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">
            {product.name || "No Product Name"}
          </h1>

          {/* Rating and Reviews */}
          <div className="flex items-center mt-2">
            {Array.from({ length: 5 }, (_, index) => {
              if (!product.reviews) return null; // Avoid rendering if no reviews exist
              if (index < Math.floor(product.reviews)) {
                return (
                  <FaStar key={index} className="text-yellow-500 text-xs" />
                );
              } else if (
                index < Math.ceil(product.reviews) &&
                product.reviews % 1 !== 0
              ) {
                return (
                  <FaStarHalfAlt
                    key={index}
                    className="text-yellow-500 text-xs"
                  />
                );
              } else {
                return (
                  <FaRegStar key={index} className="text-yellow-500 text-xs" />
                );
              }
            })}
            <span className="ml-2 text-xs text-gray-600">
              {product.reviews || "0"} Review
            </span>
          </div>

          <p className="text-xl font-medium text-blue-500 my-3">
            Nrs {product.price || "N/A"}
          </p>

          <hr className=" my-2 border-t-2" />

          <div className="flex items-center justify-between p-1">
            <p className="text-gray-700 text-sm">
              <span className="font-bold">Seller :</span>{" "}
              {product.seller?.name
                ? `${product.seller.name}, ${
                    product.seller.contact || "No contact"
                  }`
                : "No seller info"}
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center text-sm gap-1">
              <span className="text-gray-600">Share item:</span>
              <FaFacebookF className="text-gray-600 rounded-full px-2 text-[26px] cursor-pointer hover:bg-blue-600 hover:text-white" />
              <FaTwitter className="text-gray-600 rounded-full px-1 text-[26px] cursor-pointer hover:bg-blue-600 hover:text-white" />
              <FaPinterestP className="text-gray-600 rounded-full px-2 text-[26px] cursor-pointer hover:bg-blue-600 hover:text-white" />
              <FaInstagram className="text-gray-600 rounded-full px-2 text-[27px] cursor-pointer hover:bg-blue-600 hover:text-white" />
            </div>
          </div>
          {/* Seller Info */}

          {/* Description */}
          <p className="my-3 w-3/4 text-sm ml-1 text-gray-600">
            {product.description || "No description available."}
          </p>

          {/* Add to Cart Button */}
          <div className="border-2 my-2 py-2">
            <div className="border-y-2  p-2">
              <button className="w-full text-sm flex items-center justify-center gap-2 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700">
                Add to Cart <HiOutlineShoppingBag />
              </button>
            </div>
          </div>

          <hr className=" my-2 border-t-2 " />

          {/* Category & Tags */}
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

      <div className="items-center justify-center">
        {/* Tabs: Description | Customer Feedback */}
        <div className="mt-6 border-b flex gap-6 items-center justify-center">
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

        {/* Content based on active tab */}
        {activeTab === "description" ? (
          // Long Description
          <p className="mt-4 text-center text-gray-600">
            {product.longDescription || "No additional information available."}
          </p>
        ) : (
          // Customer Feedback
          <CustomerFeedback feedback={customerFeedback}/>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;