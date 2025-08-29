import SuccessToast from "../../../Component/SuccessToast";
import { useGetTravelPackageBySlugQuery } from "../../../Services/travelPackageApiSlice";
import { Upload, ChevronDown, Check, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingConfirmationModal from "../../../Component/WebContent/Accomodations/BookingModal";
import CustomerFeedbackContainer from "../../../Component/WebContent/Product/CustomerFeedbackContainer";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const TravelDeals = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    data: deal,
    isLoading,
    isError,
  } = useGetTravelPackageBySlugQuery(slug);

  const [departureDate, setDepartureDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [receipt, setReceipt] = useState(null);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (!isLoading && (isError || !deal)) {
      navigate("/travel-packages");
    }
  }, [isLoading, isError, deal, navigate]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (!deal) return <div>Redirecting...</div>;

  const handleBookNow = () => {
    if (!departureDate) {
      alert("Please select a departure date");
      return;
    }
    setShowConfirmationModal(true);
  };

  const handleConfirmBooking = () => {
    console.log("Booking confirmed:", {
      dealId: deal.id,
      departureDate,
      travelers,
      paymentMethod,
      receipt: receipt?.name,
    });
    setShowConfirmationModal(false);
    setShowSuccessToast(true);
  };

  const handleReceiptUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setReceipt(file);
    }
  };

  const mainImage = deal.images?.[0] && `${API_BASE_URL}${deal.images[0]}`;
  const subtotal = travelers * (deal.price || 1799);
  const total = subtotal;

  // Mock available departures if not in API data
  const availableDepartures = deal.availableDepartures || [
    {
      date: "Wednesday, February 28, 2024",
      spotsAvailable: "9/12 spots available",
      price: deal.price || 1799,
      available: true,
    },
    {
      date: "Wednesday, March 13, 2024",
      spotsAvailable: "8/12 spots available",
      price: deal.price || 1799,
      available: true,
    },
  ];

  return (
    <div className="mx-32 -mt-3">
      {/* Top Banner */}
      <div className="relative mb-16 w-screen -ml-[calc(50vw-50%)]">
        <img
          src={mainImage}
          alt={deal.name}
          className="w-full h-auto max-h-[500px] object-cover"
        />

        {/* Overlay container */}
        <div className="absolute bottom-6 gap-4 left-24 right-24 z-20 flex justify-normal items-center px-6 py-3 rounded">
          {/* Deal Name */}
          <h1 className="text-5xl font-redressed text-white">{deal.name}</h1>

          {/* Duration */}
          <div className="flex items-center gap-2 px-2 py-1 font-poppins bg-white text-black rounded-tl-lg rounded-br-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              {deal.durationDays}D/{deal.durationNights}N
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
        {/* Left Column - Updated Design */}
        <div className="flex-1 flex flex-col h-full">
          <div className="flex flex-col space-y-8 h-full">
            {/* About This Package */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 flex-grow">
              <h2 className="text-2xl font-semibold mb-4">
                About This Package
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {deal.description ||
                  "Chase the aurora borealis in Iceland's dramatic landscapes. Explore glaciers, geysers, and waterfalls while staying in cozy lodges."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* What's Included */}
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {(
                      deal.included || [
                        "Accommodation",
                        "Breakfast",
                        "Aurora tours",
                        "Blue Lagoon",
                        "Transportation",
                      ]
                    ).map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Not Included */}
                <div>
                  <h3 className="text-lg font-semibold text-orange-600 mb-4 flex items-center">
                    <X className="h-5 w-5 mr-2" />
                    Not Included
                  </h3>
                  <ul className="space-y-2">
                    {(
                      deal.notIncluded || [
                        "International flights",
                        "Lunch & dinner",
                        "Optional excursions",
                      ]
                    ).map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <X className="h-4 w-4 text-orange-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Available Departures */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 flex-grow">
              <h2 className="text-2xl font-semibold mb-6">
                Available Departures
              </h2>
              <div className="space-y-4">
                {availableDepartures.map((departure, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">
                        {departure.date}
                      </div>
                      <div className="text-sm text-gray-600">
                        {departure.spotsAvailable}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-xl font-bold text-gray-900">
                        Rs.{departure.price.toLocaleString()}
                      </div>
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
                        Available
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div className="lg:w-96 border rounded-lg shadow-md bg-white self-start lg:sticky lg:top-6">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                Book This Package
              </h2>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
                Available
              </span>
            </div>
            <div className="text-2xl font-bold text-red-500">
              Rs.{deal.price || 0}
              <span className="text-sm font-normal text-gray-500 ml-1">
                per person
              </span>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {/* Select Departure */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Departure *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 relative z-10"
                />
                {!departureDate && (
                  <div className="absolute inset-0 flex items-center px-3 pointer-events-none z-0">
                    <span className="text-gray-400">
                      Choose a departure date
                    </span>
                    <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Number of Travelers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Travelers *
              </label>
              <div className="relative">
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {[...Array(deal.capacityTotal || 10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} person{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`p-3 border rounded-md text-sm font-medium transition-colors ${
                    paymentMethod === "cash"
                      ? "bg-red-50 border-red-500 text-red-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="text-left">
                    <div className="font-semibold">Cash on Departure</div>
                    <div className="text-xs text-gray-500">
                      Pay when you arrive
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("qr")}
                  className={`p-3 border rounded-md text-sm font-medium transition-colors ${
                    paymentMethod === "qr"
                      ? "bg-red-50 border-red-500 text-red-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="text-left">
                    <div className="font-semibold">QR Payment</div>
                    <div className="text-xs text-gray-500">Pay now with QR</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Payment Receipt Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Receipt *
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <div className="text-sm text-gray-600 mb-2">
                  Click to upload receipt
                </div>
                <input
                  type="file"
                  onChange={handleReceiptUpload}
                  accept="image/*,.pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {receipt && (
                  <div className="text-xs text-green-600 font-medium mt-2">
                    ✓ {receipt.name}
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Subtotal ({travelers} × Rs.{deal.price || 0})
                </span>
                <span>Rs.{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
                <span>Total</span>
                <span className="text-red-500">
                  Rs.{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleBookNow}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-md font-semibold transition-colors"
            >
              Book Now
            </button>
          </div>

          <BookingConfirmationModal
            isOpen={showConfirmationModal}
            onClose={() => setShowConfirmationModal(false)}
            onConfirm={handleConfirmBooking}
            stay={deal}
            checkInDate={new Date(departureDate)}
            checkOutDate={
              deal.durationDays
                ? new Date(
                    new Date(departureDate).setDate(
                      new Date(departureDate).getDate() + deal.durationDays
                    )
                  )
                : new Date(departureDate)
            }
            roomCount={1}
            guestCount={travelers}
          />
          {showSuccessToast && (
            <div className="fixed top-4 right-4 z-50">
              <SuccessToast
                message="Your booking has been confirmed! We will contact you soon."
                onClose={() => setShowSuccessToast(false)}
                duration={5000}
              />
            </div>
          )}
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      <CustomerFeedbackContainer type="product" id={deal.id} />
    </div>
  );
};

export default TravelDeals;
