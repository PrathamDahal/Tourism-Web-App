import { useState } from "react";
import { MapPin, Clock, Users, Calendar } from "lucide-react";
import PackageDetailsTab from "./Tab Component/PackageDetails";
import ReviewsTab from "./Tab Component/ReviewsTab";
import BookingTab from "./Tab Component/BookingTab";
import DeparturesTab from "./Tab Component/DeparturesTab";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const PackageDetailsComponent = ({
  selectedPackage,
  handleToggleDepartures,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "departure", label: "Departure", component: DeparturesTab },
    { id: "details", label: "Package Details", component: PackageDetailsTab },
    { id: "booking", label: "Booking", component: BookingTab },
    { id: "reviews", label: "Reviews", component: ReviewsTab },
  ];

  const ActiveTabComponent = tabs.find(
    (tab) => tab.id === activeTab
  )?.component;

  return (
    <div className="space-y-6">
      {/* Package Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Package Image */}
            <div className="flex-shrink-0">
              {selectedPackage.images?.[0] ? (
                <img
                  src={`${API_BASE_URL}${selectedPackage.images[0]}`}
                  alt={selectedPackage.name}
                  className="w-full lg:w-64 h-64 rounded-lg object-cover shadow-md"
                  onError={(e) => {
                    e.target.src = "/assets/no-image.png";
                  }}
                />
              ) : (
                <div className="w-full lg:w-80 h-64 rounded-lg bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image Available</span>
                </div>
              )}
            </div>

            {/* Package Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {selectedPackage.name}
                </h1>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-lg">₹</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-semibold text-gray-900">
                      Rs. {Number(selectedPackage.price).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Calendar size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">
                      {selectedPackage.duration || "5"} Days /{" "}
                      {(selectedPackage.duration || 5) - 1} Nights
                    </p>
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <Users size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="font-semibold text-gray-900">
                      {selectedPackage.capacity || "20"} People
                    </p>
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <MapPin size={18} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Destination</p>
                    <p className="font-semibold text-gray-900">
                      {selectedPackage.destinationsRelation?.[0]?.name || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  Lead Time: {selectedPackage.bookingLeadHours || 0} hours
                </div>
                <div className="flex items-center">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      selectedPackage.usesDepartures
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  Departures:{" "}
                  {selectedPackage.usesDepartures ? "Scheduled" : "On Demand"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-4 border border-gray-300 bg-gray-200 rounded-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 text-center py-2 font-medium text-sm transition-all ${
              activeTab === tab.id
                ? "text-red-600 m-1 rounded-lg bg-gray-100 border-b-2 border-gray-400"
                : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tab Content */}
        <div className="p-6">
          {ActiveTabComponent && (
            <ActiveTabComponent
              packageSlug={selectedPackage.slug}
              packageData={selectedPackage}
              handleToggleDepartures={handleToggleDepartures}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsComponent;
