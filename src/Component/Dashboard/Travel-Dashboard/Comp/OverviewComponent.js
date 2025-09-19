import { Package, Calendar, Users, Clock } from "lucide-react";
import { useGetTravelPackageMetricsQuery } from "../../../../Services/travelPackageApiSlice";

const OverviewComponent = ({ navigateTo }) => {
  // ✅ Fetch metrics from API
  const { data: metrics, isLoading, isError } = useGetTravelPackageMetricsQuery();

  if (isLoading) {
    return <p className="text-gray-500">Loading metrics...</p>;
  }

  if (isError || !metrics) {
    return <p className="text-red-500">Failed to load travel package metrics.</p>;
  }

  const { totalPackages, upcomingDepartures, totalBookings } = metrics;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-red-600">
            Travel Packages Overview
          </h1>
          <p className="text-gray-600">
            Monitor your travel package performance and bookings
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => navigateTo("packages")}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            View All Packages
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Packages */}
        <button
          type="button"
          onClick={() => navigateTo("packages")}
          className="w-full bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-left hover:bg-gray-50 transition flex items-center justify-between"
        >
          <div>
            <p className="text-gray-600 text-sm">All Packages</p>
            <p className="text-2xl font-bold text-gray-900">{totalPackages}</p>
          </div>
          <Package className="h-8 w-8 text-blue-600 flex-shrink-0" />
        </button>

        {/* Total Bookings */}
        <button
          type="button"
          onClick={() => navigateTo("bookings")}
          className="w-full bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-left hover:bg-gray-50 transition flex items-center justify-between"
        >
          <div>
            <p className="text-gray-600 text-sm">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
          </div>
          <Users className="h-8 w-8 text-orange-600 flex-shrink-0" />
        </button>

        {/* Upcoming Departures */}
        <button
          type="button"
          onClick={() => navigateTo("departures")}
          className="w-full bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-left hover:bg-gray-50 transition flex items-center justify-between"
        >
          <div>
            <p className="text-gray-600 text-sm">Upcoming Departures</p>
            <p className="text-2xl font-bold text-gray-900">
              {upcomingDepartures}
            </p>
          </div>
          <Calendar className="h-8 w-8 text-green-600 flex-shrink-0" />
        </button>

        {/* Pending Actions (no data in API, just show 0 for now) */}
        <button
          type="button"
          onClick={() => navigateTo("pending-actions")}
          className="w-full bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-left hover:bg-gray-50 transition flex items-center justify-between"
        >
          <div>
            <p className="text-gray-600 text-sm">Pending Actions</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
          <Clock className="h-8 w-8 text-purple-600 flex-shrink-0" />
        </button>
      </div>

      {/* Recent Bookings — You could fetch separately or remove this section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-red-600 mb-4">
          Recent Bookings
        </h3>
        <p className="text-gray-500">
          (You can add a recent bookings API here later)
        </p>
      </div>
    </div>
  );
};

export default OverviewComponent;
