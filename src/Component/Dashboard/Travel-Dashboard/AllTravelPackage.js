import { useState, useEffect } from "react";
import { BiFilterAlt, BiSearch } from "react-icons/bi";
import { FaEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { ErrorMessage } from "formik";
import {
  useCreateTravelPackageMutation,
  useDeleteTravelPackageMutation,
  useGetTravelPackagesByCreatorQuery,
  useUpdateTravelPackageMutation,
} from "../../../Services/travelPackageApiSlice";
import { useFetchUserProfileQuery } from "../../../Services/userApiSlice";
import LoadingSpinner from "../../LoadingSpinner";
import SuccessToast from "../../SuccessToast";
import ErrorToast from "../../ErrorToast";
import TravelPackageModal from "../Admin-Dashboard/Travel Package/TravelPackageModal";
import CreateTravelPackageModal from "./CreateTravelPackageModal";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const AgencyTravelPackages = () => {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Fetch current user profile
  const { data: userProfile, isLoading: isUserLoading } =
    useFetchUserProfileQuery();

  // Fetch packages created by the current user (skip until userProfile is available)
  const {
    data: response,
    isLoading: isPackagesLoading,
    isError,
    error,
    refetch,
  } = useGetTravelPackagesByCreatorQuery(userProfile?.id, {
    skip: !userProfile?.id,
  });

  const [createTravelPackage, { isLoading: isCreating }] =
    useCreateTravelPackageMutation();

  const [updateTravelPackage] = useUpdateTravelPackageMutation();
  const [deleteTravelPackage] = useDeleteTravelPackageMutation();

  const packages = response?.data || [];
  const filteredPackages = packages.filter((pkg) =>
    pkg?.name?.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // Cleanup effect
  useEffect(() => {
    return () => {
      document.querySelectorAll("img[src^='blob:']").forEach((img) => {
        URL.revokeObjectURL(img.src);
      });
    };
  }, []);

  const handleToggleDepartures = async (pkg) => {
    try {
      await updateTravelPackage({
        id: pkg.id,
        updates: { usesDepartures: !pkg.usesDepartures },
      }).unwrap();

      setNotification({
        show: true,
        message: `Departures ${pkg.usesDepartures ? "False" : "True"} for ${
          pkg.name
        }`,
        type: "success",
      });
    } catch (err) {
      setNotification({
        show: true,
        message: err.message || "Failed to update departures",
        type: "error",
      });
    }
  };

  const handleEdit = (id) => {
    setNotification({
      show: true,
      message: `Edit clicked for ${id}`,
      type: "success",
    });
  };

  const handleDelete = async (pkg) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (!confirmed) return;

    if (!pkg?.slug) {
      setNotification({
        show: true,
        message: "Package slug not found",
        type: "error",
      });
      return;
    }

    try {
      await deleteTravelPackage(pkg.slug).unwrap(); // use slug instead of id
      setNotification({
        show: true,
        message: "Package deleted successfully!",
        type: "success",
      });
      refetch(); // refresh the list after deletion
    } catch (err) {
      setNotification({
        show: true,
        message: err.message || "Failed to delete package",
        type: "error",
      });
    }
  };

  if (isUserLoading || isPackagesLoading) return <LoadingSpinner fullScreen />;
  if (isError)
    return (
      <ErrorMessage
        message={error?.message || "Error fetching travel packages"}
        onRetry={refetch}
      />
    );

  return (
    <div className="p-4 min-h-full">
      {/* Toast Notifications */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50">
          {notification.type === "success" ? (
            <SuccessToast
              message={notification.message}
              onClose={() => setNotification({ ...notification, show: false })}
            />
          ) : (
            <ErrorToast
              message={notification.message}
              onClose={() => setNotification({ ...notification, show: false })}
            />
          )}
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center py-2 mb-3 space-y-4 md:space-y-0">
        <div className="flex flex-1 space-x-2 md:space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none w-full md:w-64">
            <input
              type="text"
              placeholder="Search travel packages..."
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <BiSearch
              size={18}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <button className="px-3 py-2 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300 w-full md:w-auto">
            Filter <BiFilterAlt size={18} className="ml-2" />
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto mt-2 md:mt-0">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 w-full md:w-auto flex items-center justify-center"
            onClick={() => setIsModalOpen(true)}
            disabled={isCreating}
            aria-label="Add new package"
          >
            {isCreating ? <LoadingSpinner size="small" /> : "+ Add Package"}
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full md:w-auto flex items-center justify-center"
            aria-label="View all bookings"
          >
            <FaEye className="mr-2" /> View All Bookings
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-sm shadow overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Departures
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <tr
                    key={pkg.id}
                    className="hover:bg-gray-50 text-center"
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    <td className="px-4 py-3">
                      {pkg.images?.[0] ? (
                        <img
                          src={`${API_BASE_URL}${pkg.images[0]}`}
                          alt={pkg.name}
                          className="w-14 h-14 rounded-sm object-cover mx-auto"
                          onError={(e) => {
                            e.target.src = "/assets/no-image.png";
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-sm bg-gray-200 flex items-center justify-center mx-auto">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-800">{pkg.name}</td>
                    <td className="px-4 py-3 text-gray-800">
                      {pkg.description.length > 50
                        ? pkg.description.substring(0, 50) + "..."
                        : pkg.description}
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      Rs. {Number(pkg.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      {pkg.capacityTotal}
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      {pkg.destinationsRelation?.[0]?.name || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleDepartures(pkg)}
                        className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none ${
                          pkg.usesDepartures ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block w-6 h-6 transform bg-white rounded-full border border-gray-500 shadow-md shadow-black transition-transform ${
                            pkg.usesDepartures
                              ? "translate-x-6"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2 justify-center">
                        <button
                          className="text-green-500 hover:text-green-600"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent row click
                            handleEdit(pkg.id);
                          }}
                        >
                          <FaPencilAlt className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent row click
                            handleDelete(pkg);
                          }}
                        >
                          <FaTrashAlt className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    {searchTerm
                      ? "No matching travel packages found"
                      : "No travel packages available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {selectedPackage && (
            <TravelPackageModal
              pkg={selectedPackage}
              onClose={() => setSelectedPackage(null)}
            />
          )}
        </div>
      </div>
      {isModalOpen && (
        <CreateTravelPackageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={async (values) => {
            try {
              await createTravelPackage(values).unwrap();
              setNotification({
                show: true,
                message: "Travel package created successfully!",
                type: "success",
              });
              setIsModalOpen(false);
              refetch(); // refresh list
            } catch (err) {
              setNotification({
                show: true,
                message: err?.data?.message || "Failed to create package",
                type: "error",
              });
            }
          }}
        />
      )}
    </div>
  );
};

export default AgencyTravelPackages;
