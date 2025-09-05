import SideBar from "../../../Component/Dashboard/SideBar";
import Header from "../../../Component/Dashboard/Header";
import AllTravelPackages from "../../../Component/Dashboard/Admin-Dashboard/Travel Package/AllTravelPackages";
import { useFetchUserProfileQuery } from "../../../Services/userApiSlice";
import AgencyTravelPackage from "../../../Component/Dashboard/Travel-Dashboard/AllTravelPackage";
import LoadingSpinner from "../../../Component/LoadingSpinner";

const TravelPackages = () => {
  const { data, isLoading } = useFetchUserProfileQuery();
  const role = data?.role;

  if (isLoading) return <LoadingSpinner fullScreen />;

  return (
    <div className="flex h-full">
      <SideBar />
      <div className="flex-1 px-4">
        <Header />
        {role === "ADMIN" && <AllTravelPackages />}
        {role === "TRAVELAGENCY" && <AgencyTravelPackage />}
        {!["ADMIN", "TRAVELAGENCY"].includes(role) && (
          <p className="text-center mt-6 text-red-500">
            You do not have permission to view this page.
          </p>
        )}
      </div>
    </div>
  );
};

export default TravelPackages;
