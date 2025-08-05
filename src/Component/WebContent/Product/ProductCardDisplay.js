import { HiOutlineShoppingBag } from "react-icons/hi";
import RatingStars from "./../../RatingStars";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ProductCard = ({ product, handleProductClick }) => {
  const navigate = useNavigate();

  const handleAddToCartClick = () => {
    navigate(`/localproducts/cart`);
  };

  // Safely access product properties with fallbacks
  const productImages = product?.images || [];
  const firstImage = productImages.length > 0 
    ? `${API_BASE_URL}/${productImages[0]}`
    : '/placeholder-image.jpg'; // Default placeholder image path

  const productName = product?.name || 'Unnamed Product';
  const productPrice = product?.price || 0;
  const productReviews = product?.reviews || [];

  return (
    <div
      key={product?._id}
      className="border p-2 rounded-md cursor-pointer hover:border hover:text-blue-400 hover:border-blue-400 hover:shadow-lg"
      onClick={() => handleProductClick(product)}
    >
      <div className="w-full h-40 flex items-center justify-center mb-2 bg-gray-100 rounded-sm">
        <img
          src={firstImage}
          alt={productName}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder-image.jpg';
          }}
        />
      </div>
      <div className="grid grid-cols-3 items-center">
        <div className="flex flex-col col-span-2 justify-center">
          <h2 className="text-gray-700 text-[12px] overflow-hidden font-semibold font-poppins">
            {productName}
          </h2>
          <p className="text-black text-base font-bold font-poppins">
            Nrs. {productPrice.toLocaleString()}
          </p>
          <RatingStars rating={productReviews} />
        </div>
        <div className="flex items-center m-3 justify-center">
          <button 
            className="items-center bg-blue-500 text-white px-3 py-2 rounded-full shadow-sm hover:bg-blue-700 transition"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCartClick();
            }}
          >
            <HiOutlineShoppingBag className="text-base" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;