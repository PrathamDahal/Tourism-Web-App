import { useParams } from "react-router-dom";
import { useState } from "react";
import dummyPackages from "../../../Data/DummyPackages";


const TravelDeals = () => {
  const { id } = useParams();
  const deal = dummyPackages.find((item) => item.id === parseInt(id));

  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  if (!deal) return <p>Travel deal not found</p>;

  return (
    <div className="font-sans">
      {/* Top Image Banner */}
      <div className="relative">
        <img
          src={deal.image}
          alt={deal.title}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">{deal.title}</h1>
          <span className="mt-2 bg-yellow-400 px-4 py-1 rounded-full font-semibold text-sm">
            ⏳ {deal.duration}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
        {/* Left: Details */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-semibold mb-2">{deal.title}</h2>
          <p className="text-gray-600 mb-6">{deal.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Itinerary:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {deal.itinerary.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">What’s Included:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {deal.included.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">What’s NOT Included:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {deal.notIncluded.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Booking Card */}
        <div className="lg:w-1/3">
          <div className="bg-white border rounded-xl shadow p-6 top-20">
            <h4 className="text-2xl font-semibold mb-4">{deal.price}</h4>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guests
              </label>
              <input
                type="number"
                value={guests}
                min={1}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Price Details */}
            <div className="border-t pt-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Duration</span>
                <span>{deal.duration}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Total</span>
                <span className="font-bold text-black">{deal.price}</span>
              </div>
            </div>

            <button className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded">
              Reserve
            </button>
          </div>
        </div>
      </div>

      {/* Footer Contact */}
      <div className="text-center mt-10 text-sm text-gray-700 border-t py-6">
        <p>
          Have Questions? <span className="text-red-500 font-medium">Contact Us</span>
        </p>
        <p>📞 +977 9871234567</p>
        <p>📧 travelhelper.nepal@gmail.com</p>
      </div>
    </div>
  );
};

export default TravelDeals;
