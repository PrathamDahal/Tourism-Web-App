import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaWifi,
  FaParking,
  FaMountain,
  FaUmbrellaBeach,
  FaSnowflake,
  FaTree,
} from "react-icons/fa";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  MdPets,
  MdAcUnit,
  MdOutlineWater,
  MdOutlineLandscape,
} from "react-icons/md";
import BookingConfirmationModal from "../../../Component/WebContent/Accomodations/BookingModal";
import SuccessToast from "../../../Component/SuccessToast";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useGetHomestayBySlugQuery } from "../../../Services/homestayApiSlice";

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

const API_BASE_URL = process.env.REACT_APP_API_URL;

const AccomodationPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // 🔥 fetch homestay by slug
  const { data: stay, isLoading, isError } = useGetHomestayBySlugQuery(slug);

  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(2);

  // ✅ store dates as Date objects, not strings
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 1));

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (!isLoading && (isError || !stay)) {
      navigate("/wheretostay");
    }
  }, [isLoading, isError, stay, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!stay) {
    return <div>Redirecting...</div>;
  }

  const handleReserve = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates");
      return;
    }
    setShowConfirmationModal(true);
  };

  const handleConfirmBooking = () => {
    console.log("Booking confirmed with details:", {
      stayId: stay.id,
      checkInDate: checkInDate.toISOString().split("T")[0],
      checkOutDate: checkOutDate.toISOString().split("T")[0],
      roomCount,
      guestCount,
    });

    setShowConfirmationModal(false);
    setShowSuccessToast(true);
  };

  const incrementCount = (setter, value, max) => {
    if (!max || value < max) setter((prev) => prev + 1);
  };
  const decrementCount = (setter, value, min = 1) => {
    if (value > min) setter((prev) => prev - 1);
  };

  // Map amenities to icons
  const amenityIcons = {
    WiFi: <FaWifi />,
    Parking: <FaParking />,
    Pets: <MdPets />,
    AC: <MdAcUnit />,
    Mountain: <FaMountain />,
    Beach: <FaUmbrellaBeach />,
    Snow: <FaSnowflake />,
    Water: <MdOutlineWater />,
    Landscape: <MdOutlineLandscape />,
    Forest: <FaTree />,
  };

  // Safely parse coordinates
  const lat = parseFloat(stay?.lat);
  const lng = parseFloat(stay?.lng);
  const center = !isNaN(lat) && !isNaN(lng) ? [lat, lng] : [27.7172, 85.324];

  const mainImage = stay.images?.[0] && `${API_BASE_URL}${stay.images[0]}`;

  return (
    <div className="mx-auto -mt-3">
      <div className="relative mb-16 w-screen -ml-[calc(50vw-50%)]">
        <div className="w-full overflow-hidden">
          <img
            src={mainImage}
            alt={stay.name}
            className="w-full h-auto max-h-[500px] object-cover"
          />
          <h1 className="absolute bottom-1 left-24 z-20 text-5xl font-medium text-white font-redressed text-center mb-6">
            {stay.name}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row px-32 gap-6">
        {/* Left Column */}
        <div className="flex-1">
          <div className="border rounded-lg shadow-md p-6">
            {/* Property Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Property Details</h2>
              <ul className="list-disc list-inside pl-4 space-y-2 text-gray-700">
                <li>Sample detail 1</li>
                <li>Sample detail 2</li>
                <li>Sample detail 3</li>
              </ul>
            </div>

            {/* Sample Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Highlights:</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Mountain", "Water", "Landscape"].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 px-3 py-2 rounded-md"
                  >
                    <span className="mr-2 text-blue-600">
                      {index === 0 ? <FaMountain /> : index === 1 ? <MdOutlineWater /> : <MdOutlineLandscape />}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-8 border-gray-300" />

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-1">
                Entire home in {stay.address}
              </h2>
              <div className="text-sm text-gray-600 mb-4">
                {stay.maxGuests} guests · {stay.bedrooms} bedrooms · {stay.beds}{" "}
                beds · {stay.bathrooms} baths
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {stay.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                {stay?.amenities?.map((amenity, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="text-lg mr-2">
                      {amenityIcons[amenity] || null}
                    </span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking */}
        <div className="lg:w-96">
          <div className="border rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-Open">Quote & Book</div>
              <div className="text-lg font-bold">
                {stay.pricePerNight}
                <span className="text-sm font-normal text-gray-500">
                  /night
                </span>
              </div>
            </div>

            {/* Calendar Section */}
            <div className="border border-gray-300 rounded-xl mb-4 text-sm p-3">
              <DateRange
                ranges={[
                  {
                    startDate: checkInDate,
                    endDate: checkOutDate,
                    key: "selection",
                  },
                ]}
                onChange={(ranges) => {
                  const { startDate, endDate } = ranges.selection;
                  setCheckInDate(startDate);
                  setCheckOutDate(endDate);
                }}
                moveRangeOnFirstSelection={false}
                minDate={new Date()}
                disabledDates={[
                  new Date(2025, 1, 12),
                  new Date(2025, 1, 13),
                ]}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>
                  Check-in: {checkInDate?.toLocaleDateString() || "-"}
                </span>
                <span>
                  Check-out: {checkOutDate?.toLocaleDateString() || "-"}
                </span>
              </div>
            </div>

            {/* Room Selection */}
            <div className="flex justify-between items-center p-3 border-b border-gray-300">
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
                  onClick={() =>
                    incrementCount(setRoomCount, roomCount, stay.maxRooms)
                  }
                  className="w-6 h-6 flex items-center justify-center text-blue-600"
                >
                  +
                </button>
              </div>
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
                  onClick={() =>
                    incrementCount(setGuestCount, guestCount, stay.maxGuests)
                  }
                  className="w-6 h-6 flex items-center justify-center text-blue-600"
                >
                  +
                </button>
              </div>
              <p className="ml-1 text-blue-600 text-sm">
                max {stay.maxGuests} guests
              </p>
            </div>
          </div>

          {/* Reserve Button */}
          <button
            onClick={handleReserve}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md mb-4 font-medium"
          >
            Reserve
          </button>

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

          {showSuccessToast && (
            <div className="fixed top-4 right-4 z-50">
              <SuccessToast
                message="Your booking has been confirmed! The host will contact you soon."
                onClose={() => setShowSuccessToast(false)}
                duration={5000}
              />
            </div>
          )}
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Map */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Location</h2>
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!isNaN(lat) && !isNaN(lng) && (
            <Marker position={[lat, lng]}>
              <Popup>{stay.name}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default AccomodationPage;
