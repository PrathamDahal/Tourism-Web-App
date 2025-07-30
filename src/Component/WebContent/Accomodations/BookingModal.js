import React from "react";
import { AiFillStar } from "react-icons/ai";

const BookingConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  stay,
  checkInDate,
  checkOutDate,
  roomCount,
  guestCount,
}) => {
  if (!isOpen) return null;

  // Format date to match the example (e.g., "Sunday, March 18, 2022")
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleClose = () => {
    onClose();
  };

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = new Date(checkOutDate) - new Date(checkInDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-black shadow-2xl max-w-80 relative w-full max-h-[90vh] overflow-y-auto overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-6 right-2 text-gray-600 hover:text-gray-700 focus:outline-none"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-poppins">Confirm Booking</h2>
        </div>

        {/* Property Image */}
        <div className="h-48 mx-2 bg-gray-200 overflow-hidden">
          <img
            src={stay.image[0]} // Using the first image from the stay's image array
            alt={stay.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Property Info */}
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">{stay.title}</h3>
          <p className="text-gray-600 text-sm mb-1">{stay.type}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <AiFillStar
                key={i}
                className={`${
                  i < 4 ? "text-yellow-400" : "text-gray-300"
                } text-sm`}
              />
            ))}
            <span className="text-xs text-gray-600 ml-1">
              4.5 (1300 Reviews)
            </span>
          </div>
        </div>

        {/* Booking Details */}
        <div className="p-4 border-b space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Check In:</span>
            <span>{formatDate(checkInDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Check Out:</span>
            <span>{formatDate(checkOutDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              {calculateNights()} night stay
            </span>
            <span>{roomCount} room</span>
            <span>{guestCount} guests</span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="p-4 border-b">
          <h4 className="font-semibold mb-2">Price Details</h4>
          <div className="flex justify-between mb-1">
            <span>1 room × {calculateNights()} nights</span>
            <span>$ 120.32</span>
          </div>
          <div className="flex justify-between">
            <span>Tax and service fees</span>
            <span>$ 5.32</span>
          </div>
        </div>

        {/* Total Price */}
        <div className="p-4 border-b">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>$1,200</span>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="p-4">
          <button
            onClick={onConfirm}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md font-medium"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
