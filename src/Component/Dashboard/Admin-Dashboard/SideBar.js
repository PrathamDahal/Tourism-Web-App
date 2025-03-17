import React from "react";
import { FaClock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../Features/slice/authSlice";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getLinkClasses = (isActive) =>
    `py-2 pl-4 flex gap-2 mx-2 mb-2 items-center rounded-md transition duration-200 ${
      isActive
        ? "text-white bg-gradient-to-r from-[#780E0E] to-[#FF5757]"
        : "text-gray-700 hover:bg-gray-200 hover:text-red-500"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("accessToken", "refreshToken");
    dispatch(logout());
    navigate(`/login`);
  };

  return (
    <div className="w-[220px] bg-gray-100 px-4 py-2 flex flex-col relative font-sans shadow-lg">
      <h2 className="text-center py-3 lg:text-lg font-light md:text-sm font-redressed text-red-600 mb-3">
        PanchPokhari Tourism
      </h2>
      <div className="mb-3">
        <h3 className="pl-2 text-left mb-2 text-gray-600 font-semibold">
          Dashboard
        </h3>
        <div className="py-1">
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            <FaClock className="text-lg" /> Overview
          </NavLink>
          <NavLink
            to="/dashboard/site-settings"
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            Site Settings
          </NavLink>
        </div>
      </div>
      <hr className="bg-gray-300 my-4 -mx-2" />
      <div className="mb-3">
        <h3 className="pl-2 text-left mb-3 text-gray-600 font-semibold">
          Web Content
        </h3>
        <div className="py-1">
          <NavLink
            to="/dashboard/category"
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            Category
          </NavLink>
          <NavLink
            to="/dashboard/products"
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/general"
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            General
          </NavLink>
          <NavLink
            to="/dashboard/contact"
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            Contact
          </NavLink>
        </div>
      </div>
      <hr className="bg-gray-300 my-4 -mx-2" />

      <NavLink
        to="/"
        onClick={handleLogout}
        className={({ isActive }) => getLinkClasses(isActive)}
      >
        Logout
      </NavLink>
    </div>
  );
};

export default SideBar;
