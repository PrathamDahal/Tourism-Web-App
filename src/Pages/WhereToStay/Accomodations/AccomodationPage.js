import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaWifi,
  FaParking,
  FaMountain,
  FaUmbrellaBeach,
  FaSnowflake,
  FaTree,
  FaUser,
  FaDoorClosed,
  FaBed,
  FaBath,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import en from "date-fns/locale/en-US";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./calendar-fix.css";
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

// Calendar Legend Component
const CalendarLegend = () => {
  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <h4 className="font-medium mb-2">Calendar Legend</h4>

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 border rounded-sm border-blue-500 mr-2"></div>
          <span className=" text-xs">Selected dates</span>
        </div>

        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-300 border rounded-sm border-gray-300 mr-2 relative"></div>
          <span className="text-gray-500 text-xs">Blocked by host</span>
        </div>

        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-100 border rounded-sm border-red-300 mr-2 relative"></div>
          <span className="text-red-500 text-xs">Not Available (booked)</span>
        </div>

        <div className="flex items-center">
          <div className="w-3 h-3 border-2 rounded-sm border-blue-500 mr-2"></div>
          <span className="text-gray-500 text-xs">Today</span>
        </div>
      </div>

      <div className="mt-3 p-2 bg-yellow-100 rounded border border-yellow-200">
        <p className="text-xs text-amber-700">
          <span className="font-medium">Tip:</span> Unavailable dates are
          crossed out or marked with ×. Try selecting different dates for your
          stay.
        </p>
      </div>
    </div>
  );
};

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
  const [showQuote, setShowQuote] = useState(false);

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

  // Assuming these fees (you can replace with API data if available)
  const cleaningFee = stay.cleaningFee || 20;
  const serviceFee = stay.serviceFee || 15;
  const taxRate = 0.1; // 10% tax

  // Calculate total price
  const nights =
    Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)) || 1;
  const roomPrice = stay.pricePerNight || 100; // fallback price
  const subtotal = roomPrice * roomCount * nights;
  const taxes = subtotal * taxRate;
  const totalPrice = subtotal + cleaningFee + serviceFee + taxes;

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
          <div className="absolute bottom-6 left-24 z-20 text-white">
            <h1 className="text-5xl font-medium font-redressed mb-2">
              {stay.name}
            </h1>
            <p className="flex items-center gap-2 text-lg text-gray-200">
              <FaMapMarkerAlt /> {stay.address}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row mx-24 gap-4">
        {/* Left Column */}
        <div className="flex-1">
          <div className="border rounded-lg shadow-md mb-4 p-6 font-poppins">
            {/* Property Details */}
            <h2 className="text-2xl font-medium mb-6">Property Details</h2>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-1">{stay.name}</h2>
              <div className="flex items-center text-gray-600 mb-4 space-x-4">
                <div className="flex items-center space-x-1">
                  <FaUser />
                  <span>{stay.maxGuests} guests</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaDoorClosed />
                  <span>{stay.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaBed />
                  <span>{stay.beds} beds</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaBath />
                  <span>{stay.bathrooms} bathrooms</span>
                </div>
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

          {/* Map */}
          <div className="mb-16 rounded-lg overflow-hidden">
            <MapContainer
              center={center}
              zoom={13}
              scrollWheelZoom={false}
              className="rounded-lg"
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

        {/* Right Column - Booking */}
        <div className="lg:w-[520px] space-y-2">
          <div className="border rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-Open">Quote & Book</div>
              <div className="text-lg font-bold text-red-600">
                Rs.{stay.pricePerNight}
                <span className="text-sm font-medium">/night</span>
              </div>
            </div>

            {/* Calendar Section */}
            <div className="border border-gray-300 rounded-xl mb-4 text-sm p-3">
              <h4 className="font-medium mb-2">Select your dates:</h4>
              <div className="w-full">
                <DateRange
                  className="w-full"
                  wrapperClassName="w-full"
                  ranges={[
                    {
                      startDate: checkInDate,
                      endDate: checkOutDate,
                      key: "selection",
                    },
                  ]}
                  onChange={(ranges) => {
                    setCheckInDate(ranges.selection.startDate);
                    setCheckOutDate(ranges.selection.endDate);
                  }}
                  moveRangeOnFirstSelection={false}
                  minDate={new Date()}
                  locale={en}
                />
              </div>

              {/* Calendar Legend */}
              <CalendarLegend />

              <div className="flex justify-between mt-4 text-sm text-gray-600">
                <span>
                  Check-in:{" "}
                  {checkInDate ? checkInDate.toLocaleDateString() : "-"}
                </span>
                <span>
                  Check-out:{" "}
                  {checkOutDate ? checkOutDate.toLocaleDateString() : "-"}
                </span>
              </div>
            </div>
            {/* Room Selection */}
            <div className="flex justify-between items-center p-3">
              <div>
                <div className="font-medium">Room</div>
              </div>
              <div className="flex items-center border p-1">
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
            <div className="space-y-1 justify-between items-center p-3">
              <div>
                <div className="font-medium">Enter number of guests</div>
              </div>
              <div className="flex items-center border p-1 rounded-md">
                <input
                  type="number"
                  min={1}
                  max={stay.maxGuests}
                  value={guestCount}
                  onChange={(e) => {
                    const value =
                      e.target.value === ""
                        ? ""
                        : Math.min(
                            Math.max(1, Number(e.target.value)),
                            stay.maxGuests
                          );
                    setGuestCount(value);
                  }}
                  className="w-full px-2 text-left outline-none"
                />
              </div>
              <p className="ml-1 text-right text-blue-600 text-sm">
                max {stay.maxGuests} guests
              </p>
            </div>

            {/* Get Quote Button */}
            <div className="my-4">
              <button
                onClick={() => setShowQuote((prev) => !prev)}
                className="w-full py-1 rounded-xl mb-2 border border-gray-200 bg-gray-100 font-poppins"
              >
                {showQuote ? "Hide Quote" : "Get Quote"}
              </button>

              {showQuote && (
                <>
                  <div className="my-4 p-4 border rounded-lg bg-gray-50 text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Price per room / night:</span>
                      <span>Rs.{roomPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Number of rooms:</span>
                      <span>{roomCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nights:</span>
                      <span>{nights}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Subtotal:</span>
                      <span>Rs.{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning Fee:</span>
                      <span>Rs.{cleaningFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee:</span>
                      <span>Rs.{serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes:</span>
                      <span>Rs.{taxes.toFixed(2)}</span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Price:</span>
                      <span>Rs.{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleReserve}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-4 rounded-md mb-4 font-medium"
                  >
                    Reserve
                  </button>
                </>
              )}
            </div>
          </div>

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
    </div>
  );
};

export default AccomodationPage;
