import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { stays } from "../../../Data/stayOptions";
import { stayOptions } from "../../../Data/stayOptions";
import { FaWifi, FaParking } from "react-icons/fa";
import { MdPets, MdAcUnit } from "react-icons/md";
import ImageCarousel from "./../../../Component/WebContent/WhereToStay/ImageCarousel";
import BookingConfirmationModal from "../../../Component/WebContent/Accomodations/BookingModal";
import SuccessToast from "../../../Component/SuccessToast";
// import CustomerFeedbackContainer from "../../../Component/WebContent/Product/CustomerFeedbackContainer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const AccomodationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stay, setStay] = useState(null);
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(2);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const center = [27.7172, 85.324]; // Example: Kathmandu

  const handleReserve = () => {
    // Validate required fields before showing modal
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates");
      return;
    }
    setShowConfirmationModal(true);
  };

  const handleConfirmBooking = () => {
    // Here you would typically send the booking data to your backend
    console.log("Booking confirmed with details:", {
      stayId: stay.id,
      checkInDate,
      checkOutDate,
      roomCount,
      guestCount,
    });

    // Close the modal and show success message or redirect
    setShowConfirmationModal(false);
    setShowSuccessToast(true);
  };

  // Mock nearby attractions
  const nearbyAttractions = [
    {
      id: 1,
      name: "Tsegro View Point",
      distance: "4km away",
      image: "/api/placeholder/80/60",
    },
    {
      id: 2,
      name: "Tsegro View Point",
      distance: "4km away",
      image: "/api/placeholder/80/60",
    },
    {
      id: 3,
      name: "Tsegro View Point",
      distance: "4km away",
      image: "/api/placeholder/80/60",
    },
    {
      id: 4,
      name: "Tsegro View Point",
      distance: "4km away",
      image: "/api/placeholder/80/60",
    },
  ];

  useEffect(() => {
    // Find the stay with matching ID
    const foundStay = stays.find((s) => s.id.toString() === id);
    if (foundStay) {
      setStay(foundStay);
    } else {
      // Redirect if stay not found - goes back to wheretostay main page
      navigate("/wheretostay");
    }
  }, [id, navigate]);

  const getStayTypeColor = (stayType) => {
    const option = stayOptions.find((opt) => opt.title === stayType);
    return option?.color || "#000";
  };

  const incrementCount = (setter, value) => {
    setter((prev) => prev + 1);
  };

  const decrementCount = (setter, value, min = 1) => {
    if (value > min) {
      setter((prev) => prev - 1);
    }
  };

  const amenitiesList = [
    { icon: <FaWifi />, name: "Wifi" },
    { icon: null, name: "Tv" },
    { icon: null, name: "Utensils" },
    { icon: null, name: "Mountain View" },
    { icon: <MdAcUnit />, name: "A/C" },
    { icon: <FaParking />, name: "Free Parking" },
    { icon: <MdPets />, name: "Pet Friendly" },
    { icon: null, name: "High-Speed Internet" },
    { icon: null, name: "Laundry Services" },
  ];

  if (!stay) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="md:mx-32 items-center justify-center  px-4 py-4">
      {/* Header with Title and Reserve Button */}
      <div className="flex justify-between items-center mb-8 font-Playfair">
        <h1 className="text-3xl font-bold">
          {stay.title || "Ram Bahadurs Bangala"}
        </h1>
        {/* <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-8 rounded-md">
          RESERVE
        </button> */}
      </div>

      {/* Image Gallery with Type Badge */}
      <div className="rounded-lg overflow-hidden mb-8">
        <ImageCarousel
          images={stay.image}
          stayType={stay.type}
          getStayTypeColor={getStayTypeColor}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col border-b lg:flex-row gap-8 pb-8 mb-8">
        {/* Left Column - Property Info */}
        <div className="flex-1">
          <h2 className="text-lg font-medium mb-1">
            Entire home in Panchpokhari
          </h2>
          <div className="text-sm text-gray-600 mb-4">
            10 guests · 4 bedrooms · 5 beds · 5 baths
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Pawna Lake's glassy surface stretches beyond this Lonavala villa
            while the Western Ghats punctuate the horizon. Earthy tones and a
            clean, cozy design scheme are drenched in sunlight inside the
            sprawling living space. Follow a stone path through the lush garden
            as you sip a glass of champagne. A sleek infinity pool melts into
            the panoramic view. Hike to the scenic plateau at nearby Mangi
            Tungi.
          </p>

          <button className="flex items-center text-blue-600 hover:text-blue-800 mb-8">
            Show more <span className="ml-1">›</span>
          </button>

          {/* Amenities */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">What this place offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
              {amenitiesList.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-lg mr-2">{amenity.icon}</span>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-50">
                Show all 12 features
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Widget */}
        <div className="lg:w-80">
          <div className="border rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold">
                NRS {stay.price || "1,437"}{" "}
                <span className="text-sm font-normal text-gray-500">
                  /night
                </span>
              </div>
            </div>

            {/* Date Selection */}
            <div className="border border-black rounded-xl mb-4 text-sm">
              <div className="grid grid-cols-2 gap-2 border-b border-black">
                <div className="my-2 border-r border-black p-2">
                  <div className="text-xs text-gray-500">CHECK-IN</div>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full border-none p-0 focus:outline-none"
                  />
                </div>
                <div className="rounded p-2">
                  <div className="text-xs text-gray-500">CHECK-OUT</div>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full border-none p-0 focus:outline-none"
                  />
                </div>
              </div>

              {/* Room Selection */}
              <div>
                <div className="flex justify-between items-center p-3 border-b border-black">
                  <div>
                    <div className="font-medium">Room</div>
                  </div>
                  <div className="flex items-center border p-1 shadow-lg">
                    <button
                      onClick={() => decrementCount(setRoomCount, roomCount)}
                      className="w-6 h-6 flex items-center justify-center text-blue-600"
                    >
                      -
                    </button>
                    <span className="mx-3">{roomCount}</span>
                    <button
                      onClick={() => incrementCount(setRoomCount)}
                      className="w-6 h-6 flex items-center justify-center text-blue-600"
                    >
                      +
                    </button>
                  </div>
                  <p className="ml-1 text-blue-600 text-sm">3 rooms left</p>
                </div>

                {/* Guest Selection */}
                <div className="flex justify-between items-center p-3">
                  <div>
                    <div className="font-medium">Guests</div>
                  </div>
                  <div className="flex items-center border p-1 shadow-lg">
                    <button
                      onClick={() => decrementCount(setGuestCount, guestCount)}
                      className="w-6 h-6 flex items-center justify-center text-blue-600"
                    >
                      -
                    </button>
                    <span className="mx-3">{guestCount}</span>
                    <button
                      onClick={() => incrementCount(setGuestCount)}
                      className="w-6 h-6 flex items-center justify-center text-blue-600"
                    >
                      +
                    </button>
                  </div>
                  <p className="ml-1 text-blue-600 text-sm">max 3 guest</p>
                </div>
              </div>
            </div>

            {/* Price Details */}
            <div className="bg-gray-50 border border-gray-200 mb-4 rounded">
              <h4 className="font-medium mb-2 bg-gray-200 p-2">
                Price Details
              </h4>
              <div className="flex justify-between mb-1 p-2">
                <span>1 room × 2 nights</span>
                <span>$ 120.32</span>
              </div>
              <div className="flex justify-between p-2 pb-2 border-b mb-4">
                <span>Tax and service fees</span>
                <span>$ 8.32</span>
              </div>
              <div className="flex justify-between font-bold p-2">
                <span>Total</span>
                <span>$1,200</span>
              </div>
            </div>

            {/* Reserve Button */}
            <button
              onClick={handleReserve}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md mb-2"
            >
              Reserve
            </button>

            {/* Booking Confirmation Modal */}
            <BookingConfirmationModal
              isOpen={showConfirmationModal}
              onClose={() => setShowConfirmationModal(false)}
              onConfirm={handleConfirmBooking}
              stay={stay}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              roomCount={roomCount}
              guestCount={guestCount}
            />

            {/* Success Toast */}
            {showSuccessToast && (
              <div className="fixed top-4 right-4 z-50">
                <SuccessToast
                  message="Your booking has been confirmed! The host will contact you soon."
                  onClose={() => setShowSuccessToast(false)}
                  duration={5000}
                />
              </div>
            )}

            <p className="text-center text-sm text-gray-500">
              Host will contact you soon
            </p>
          </div>
        </div>
      </div>

      <div>
        {/* Map and Nearby Attractions */}
        <div className="mb-8 flex flex-col md:flex-row gap-6">
          <div className="md:w-7/12 h-[300px] rounded-lg overflow-hidden">
            <MapContainer
              center={center}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={center}>
                <Popup>We are here!</Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className="md:w-5/12">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Nearby Points of Interest</h3>
              <div className="space-y-3">
                {nearbyAttractions.map((attraction) => (
                  <div key={attraction.id} className="flex items-center gap-3">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-16 h-12 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium">{attraction.name}</div>
                      <div className="text-sm text-gray-500">
                        {attraction.distance}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section
        <div className="mb-10 font-Playfair">
          <CustomerFeedbackContainer type="product" id={product.id} />
        </div> */}
      </div>
    </div>
  );
};

export default AccomodationPage;
