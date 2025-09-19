
const BookingTab = ({ packageData }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Booking Information</h3>
      <p className="text-gray-600">
        Lead Time: {packageData.bookingLeadHours || 0} hours
      </p>
      <p className="text-gray-600">
        Departures: {packageData.usesDepartures ? 'Scheduled' : 'On Demand'}
      </p>

      <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
        Book Now
      </button>
    </div>
  );
};

export default BookingTab;
