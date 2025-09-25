import { useLocation } from "react-router-dom";
import AdminRoomsCreate from './Hotels-Resorts/RoomType/CreateRoomTypes';
import AdminAddStay from "./Hotels-Resorts/AdminAddHotelsOrResorts";
import ForAdminBookings from "./Bookings/AllBookings";
import AdminAccomodationsOverview from './AccomodationsOverview';
import AdminAccomodationTable from "./AdminAccomodationTable";



const AllAccomodations = () => {
  const location = useLocation();
  const view = new URLSearchParams(location.search).get("view") || "overview";
  const stayView = new URLSearchParams(location.search).get("stay");
  const showRooms = new URLSearchParams(location.search).get("room");

  const renderView = () => {
    switch (view) {
      case "stays":
        if (stayView === "add") {
          return showRooms ? <AdminRoomsCreate /> : <AdminAddStay />;
        }
        return <AdminAccomodationTable />;
      case "bookings":
        return <ForAdminBookings />;
      default:
        return <AdminAccomodationsOverview />;
    }
  };

  return <div className="w-full">{renderView()}</div>;
};

export default AllAccomodations;
