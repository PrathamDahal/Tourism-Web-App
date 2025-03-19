import React from "react";
import { useLocation } from "react-router-dom";
import { useFetchUserProfileQuery } from "../../../Services/auth/userApiSlice";

const Header = () => {
  const location = useLocation();

  const isSiteSetting = location.pathname.startsWith(
    "/dashboard/site-settings"
  );
  const isCategory = location.pathname.startsWith(
    "/dashboard/category"
  );
  const isProduct = location.pathname.startsWith(
    "/dashboard/product"
  );
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

  //   const accessToken = localStorage.getItem("accessToken");
  const { data, isLoading } = useFetchUserProfileQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b-2 border-gray-100">
      <div>
        <p className="font-poppins text-xl">{renderHeaderText()}</p>
      </div>
      <div className="flex px-1 items-center gap-4">
        <img
          src="/assets/Images/carbon_notification.svg"
          alt="Notification"
          className="w-6 h-6"
        />
        <img
          src={data?.user?.images || "/assets/Images/default-avatar-image.jpg"}
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;
