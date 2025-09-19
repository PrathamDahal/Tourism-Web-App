import { useState } from 'react';
import { useGetDeparturesQuery } from '../../../../../../Services/departuresApiSlice';
import EditDepartureModal from '../Edit/EditDepartureModal';

const DeparturesTab = ({ packageSlug }) => {
  const { data: response, isLoading, isError } = useGetDeparturesQuery(packageSlug);
  const departures = response?.data || [];

  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (departure) => {
    setSelectedDeparture(departure);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDeparture(null);
    setIsModalOpen(false);
  };

  if (isLoading) return <p>Loading departures...</p>;
  if (isError) return <p>Error loading departures.</p>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Departure Schedules</h3>

      {departures.length === 0 ? (
        <p className="text-gray-600">No departures scheduled for this package.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departures.map((departure) => (
            <div
              key={departure.id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(departure.date).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Available Seats</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {departure.capacityRemaining}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p
                    className={`font-semibold ${
                      departure.status === 'ACTIVE' ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {departure.status === 'ACTIVE' ? 'Available' : 'Closed'}
                  </p>
                </div>

                <button
                  onClick={() => openModal(departure)}
                  className="mt-4 px-4 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDeparture && (
        <EditDepartureModal
          packageSlug={packageSlug}
          departure={selectedDeparture}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default DeparturesTab;
