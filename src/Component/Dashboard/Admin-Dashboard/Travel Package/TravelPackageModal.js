import React, { useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const TravelPackageModal = ({ pkg, onClose }) => {
  const [currentImage, setCurrentImage] = useState(0);

  if (!pkg) return null;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % pkg.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + pkg.images.length) % pkg.images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-y-auto max-h-[90vh] p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          {pkg.name}
        </h2>

        {/* Image Carousel */}
        {pkg.images?.length > 0 && (
          <div className="relative w-full h-64 mb-6 flex items-center justify-center rounded-lg shadow-md bg-gray-100">
            <img
              src={`${API_BASE_URL}${pkg.images[currentImage]}`}
              alt={`${pkg.name} - ${currentImage + 1}`}
              className="max-h-full max-w-full object-contain rounded-lg"
            />
            {pkg.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 shadow"
                >
                  ◀
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 shadow"
                >
                  ▶
                </button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {pkg.images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        idx === currentImage ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Package Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-gray-700">
          <div><strong>Price:</strong> Rs. {pkg.price}</div>
          <div><strong>Duration:</strong> {pkg.durationDays}d / {pkg.durationNights}n</div>
          <div><strong>Total Capacity:</strong> {pkg.capacityTotal}</div>
          <div><strong>Remaining Capacity:</strong> {pkg.capacityRemaining}</div>
          <div><strong>Departures:</strong> {pkg.usesDepartures ? "Yes" : "No"}</div>
          <div><strong>Created At:</strong> {new Date(pkg.createdAt).toLocaleString()}</div>
          <div><strong>Updated At:</strong> {new Date(pkg.updatedAt).toLocaleString()}</div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Description</h3>
          <p className="text-gray-700 leading-relaxed">{pkg.description}</p>
        </div>

        {/* Included / Not Included */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Included</h4>
            <ul className="list-disc list-inside text-gray-700">
              {pkg.included?.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Not Included</h4>
            <ul className="list-disc list-inside text-gray-700">
              {pkg.notIncluded?.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
        </div>

        {/* Destination Info */}
        {pkg.destinationsRelation?.[0] && (
          <div className="mb-4 border-t pt-4">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Destination Details</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="mb-2"><strong>Name:</strong> {pkg.destinationsRelation[0].name}</div>
                <div className="mb-2"><strong>Summary:</strong> {pkg.destinationsRelation[0].summary}</div>
                <div className="mb-2"><strong>Description:</strong> {pkg.destinationsRelation[0].description}</div>
                <div className="mb-2"><strong>Tags:</strong> {pkg.destinationsRelation[0].tags.join(", ")}</div>
              </div>
              {pkg.destinationsRelation[0].heroImageUrl && (
                <div className="flex-1">
                  <img
                    src={`${API_BASE_URL}${pkg.destinationsRelation[0].heroImageUrl}`}
                    alt={pkg.destinationsRelation[0].name}
                    className="w-full h-48 object-contain rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPackageModal;
