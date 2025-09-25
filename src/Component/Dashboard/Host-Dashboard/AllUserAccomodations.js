import { useLocation } from "react-router-dom";
import AccomodationsOverview from "./AccomodationsOverview";
import Rooms from './Hotels/RoomType/Rooms';
import AddStay from './Hotels/AddUserHotels';
import AccomodationTable from "./AccomodationTable";
import Bookings from './Bookings/AllBookings';

const AllUserAccomodations = () => {
  const location = useLocation();
  const view = new URLSearchParams(location.search).get("view") || "overview";
  const stayView = new URLSearchParams(location.search).get("stay");
  const showRooms = new URLSearchParams(location.search).get("room");

  const renderView = () => {
    switch (view) {
      case "stays":
        if (stayView === "add") {
          return showRooms ? <Rooms /> : <AddStay />;
        }
        return <AccomodationTable />;
      case "bookings":
        return <Bookings />;
      default:
        return <AccomodationsOverview />;
    }
  };

  return <div className="w-full">{renderView()}</div>;
};

export default AllUserAccomodations;
