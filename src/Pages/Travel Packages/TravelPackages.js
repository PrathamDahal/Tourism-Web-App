import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dummyPackages from "../../Data/DummyPackages";

const TravelPackages = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-10 py-6 gap-6">
      {/* Filter Sidebar */}
      <aside className="w-full md:w-1/4 bg-white p-4 border rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filter</h2>
          <button className="text-sm text-blue-600 font-medium">
            Apply Filter
          </button>
        </div>

        {/* Destinations */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Trek Destinations</h3>
          {[
            "panchpokhari",
            "dhulikhel",
            "hati ban",
            "makalbari",
            "pokhara",
            "chaina",
            "europe",
          ].map((dest, i) => (
            <div key={i}>
              <input type="radio" name="destination" id={dest} className="mr-2" />
              <label htmlFor={dest} className="capitalize">
                {dest}
              </label>
            </div>
          ))}
        </div>

        {/* Duration */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Duration</h3>
          <input type="range" min="1" max="20" className="w-full" />
          <p className="text-sm text-gray-600">Days: 4 – 10</p>
        </div>

        {/* Guests */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Guests</h3>
          <input type="range" min="1" max="10" className="w-full" />
          <p className="text-sm text-gray-600">Guests: 3 – 8</p>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Rating</h3>
          {[5, 4, 3, 2, 1].map((rate) => (
            <div key={rate} className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <div className="flex items-center text-sm text-yellow-500">
                {Array.from({ length: rate }, (_, i) => (
                  <FaStar key={i} />
                ))}
                <span className="ml-1 text-gray-700">{rate}.0 & up</span>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div>
          <h3 className="font-semibold mb-2">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            <button className="bg-gray-200 px-3 py-1 rounded-full text-sm">Wifi</button>
            <button className="bg-gray-200 px-3 py-1 rounded-full text-sm">Breakfast</button>
            <button className="bg-gray-200 px-3 py-1 rounded-full text-sm">Parking</button>
          </div>
        </div>
      </aside>

      {/* Package Grid */}
      <section className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyPackages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => navigate(`travel-deals/${pkg.id}`)}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="relative">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded text-xs font-bold">
                ⏳ {pkg.duration}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-lg">{pkg.title}</h4>
              <p className="text-sm text-gray-500">{pkg.description}</p>
              <p className="font-bold mt-2">
                {pkg.price},{" "}
                <span className="text-gray-700">{pkg.duration}</span>
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TravelPackages;
