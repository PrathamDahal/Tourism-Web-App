import SideBar from "./../../Component/Dashboard/SideBar";
import Header from "./../../Component/Dashboard/Header";
import { useFetchUserProfileQuery } from "../../Services/userApiSlice";
import DashboardOverview from "../../Component/Dashboard/Overview";

const DashboardHome = () => {
  const { data, isLoading, error } = useFetchUserProfileQuery();

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error loading profile.</div>;

  const role = data?.role || "guest";
  const normalizedRole = role.toLowerCase();

  return (
    <div className="flex h-full">
      <SideBar />
      <div className="flex-1 px-4">
        <Header />
        <DashboardOverview role={normalizedRole} />
      </div>
    </div>
  );
};

export default DashboardHome;
