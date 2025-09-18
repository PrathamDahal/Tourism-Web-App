import { AiFillStar } from "react-icons/ai";

const BookingConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  stay,
  checkInDate,
  checkOutDate,
  guestCount,
  paymentMethod,
}) => {
  if (!isOpen) return null;

  const formatDate = (date) => {
    if (!date) return "";
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = new Date(checkOutDate) - new Date(checkInDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const mainImage = stay?.images?.[0] ? `${process.env.REACT_APP_API_URL}${stay.images[0]}` : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">{stay?.name || "Booking Confirmation"}</h2>
        </div>

        {/* Image */}
        {mainImage ? (
          <div className="h-48 w-full overflow-hidden">
            <img src={mainImage} alt={stay?.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="h-48 w-full flex items-center justify-center bg-gray-300 text-gray-700">
            No Image Available
          </div>
        )}

        {/* Stay Info */}
        <div className="p-4 border-b space-y-1">
          <h3 className="font-semibold text-lg">{stay?.name || "Unnamed Package"}</h3>
          {stay?.durationDays != null && stay?.durationNights != null && (
            <p className="text-sm text-gray-600">
              {stay.durationDays}D / {stay.durationNights}N
            </p>
          )}
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <AiFillStar key={i} className={`text-sm ${i < 4 ? "text-yellow-400" : "text-gray-300"}`} />
            ))}
            <span className="text-xs text-gray-600 ml-1">4.5 (1300 Reviews)</span>
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
            <span className="text-gray-600">{calculateNights()} night stay</span>
            <span>{guestCount} guest{guestCount > 1 ? "s" : ""}</span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="p-4 border-b space-y-1">
          <h4 className="font-semibold">Price Details</h4>
          <div className="flex justify-between">
            <span>{calculateNights()} nights</span>
            <span>Rs.{stay?.price?.toLocaleString() || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax & service fees</span>
            <span>Rs.0</span>
          </div>
          <div className="flex justify-between font-bold pt-2">
            <span>Total</span>
            <span>Rs.{(stay?.price || 0) * calculateNights()}</span>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="p-4">
          <button
            onClick={onConfirm}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md font-medium"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
