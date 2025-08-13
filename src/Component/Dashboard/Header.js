import { useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useFetchUserProfileQuery } from "../../Services/userApiSlice";
import HomeButton from "../HomeButton";

const Header = ({ onMenuToggle }) => {
  const location = useLocation();

  const isSiteSetting = location.pathname.startsWith(
    "/dashboard/site-settings"
  );
  const isCategory = location.pathname.startsWith("/dashboard/category");
  const isProduct = location.pathname.startsWith("/dashboard/product");
  const isOverview = location.pathname.startsWith("/dashboard/home");

  const renderHeaderText = () => {
    if (isOverview) {
      return "Welcome to the Overview Page";
    } else if (isSiteSetting) {
      return "Site Settings";
    } else if (isCategory) {
      return "Product Categories";
    } else if (isProduct) {
      return "Products";
    }
  };

  const { data, isLoading } = useFetchUserProfileQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2 border-b-2 border-gray-100">
      <div className="w-full flex justify-between mb-2">
        {/* Header Text */}
        <div className="text-center md:text-left md:mb-0">
          <p className="font-poppins text-lg md:text-xl">
            {renderHeaderText()}
          </p>
        </div>

        {/* Menu Button for Mobile */}
        <button className="md:hidden p-2" onClick={onMenuToggle}>
          <FiMenu className="w-4 h-4" />
        </button>
      </div>

      {/* Notification, Home, and User Profile */}
      <div className="flex items-center gap-4">
        {/* Home Button */}
        <HomeButton />
        <img
          src="/assets/Images/carbon_notification.svg"
          alt="Notification"
          className="w-6 h-6"
        />
        <img
          src={data?.images || "/assets/Images/default-avatar-image.jpg"}
          alt="User"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;
