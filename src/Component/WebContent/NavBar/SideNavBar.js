import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { MdTranslate } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setCredentials } from "./../../../Features/slice/authSlice";
import { useFetchUserProfileQuery } from "./../../../Services/auth/userApiSlice";

const SideNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const { data, isLoading } = useFetchUserProfileQuery({ accessToken });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (data) {
      dispatch(setCredentials({ user: data.user }));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [data, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(setCredentials({ user: null }));
    setIsLoggedIn(false);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <nav className="top-0 left-0 w-full z-20 bg-white flex justify-between items-center px-4 py-5 shadow-lg">
      <p className="text-red-700 font-redressed lg:text-[24px] md:text-[16px] md:px-2 lg:px-5">
        Panchpokhari Tourism
      </p>

      <ul
        className={`absolute top-16 left-0 w-full bg-gray-800 md:bg-transparent 
              md:flex md:relative md:top-0 md:w-auto 
              space-y-2 md:space-y-0 
              text-xs md:text-[10px] lg:text-xs md:gap-x-1
              transition-all duration-300 ease-in-out 
              shadow-md md:shadow-none rounded-b-lg md:rounded-none 
              ${menuOpen ? "block p-3" : "hidden"}`}
      >
        {[
          { name: "Home", path: "/" },
          { name: "Where To Go", path: "/WhereToGo" },
          { name: "Where To Stay", path: "/WhereToStay" },
          { name: "Local Products", path: "/LocalProducts" },
          { name: "Contact Us", path: "/ContactUs" },
        ].map((item) => (
          <li key={item.path} className="text-center md:text-left">
            <Link
              to={item.path}
              className={`block px-4 py-1 md:px-3 md:py-1 rounded-md transition-colors duration-200 
                   text-black hover:text-yellow-400 hover:bg-gray-700 md:hover:bg-transparent`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Icons and Auth Links */}
      <div className="flex items-center xl:space-x-4 lg:space-x-2 md:space-x-0 space-x-2">
        {/* Icons */}
        <div className="flex items-center xl:space-x-6 lg:space-x-4 md:space-x-2 space-x-2">
          <Link to="/notifications" className="hover:text-blue-300 text-black">
            <FaBell className="lg:text-xl md:text-lg" />
          </Link>
          <Link to="/cart" className="hover:text-blue-300 text-black">
            <FaShoppingCart className="lg:text-xl md:text-lg" />
          </Link>
          <Link to="/cart" className="hover:text-blue-300 text-black">
            <MdTranslate className="lg:text-xl font-semibold md:text-lg" />
          </Link>
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex xl:space-x-4 lg:space-x-2 md:space-x-0">
          {!isLoggedIn ? (
            <>
              <button className="lg:py-1.5 lg:px-4 md:py-0.5 md:px-2 bg-red-500 hover:bg-red-700 rounded-2xl">
                <Link
                  to="/login"
                  className="text-white text-base xl:text-[18px] lg:text-[14px] md:text-[12px]"
                >
                  LOG IN
                </Link>
              </button>
            </>
          ) : (
            <div className="relative">
              {/* Profile Button */}
              <button
                onClick={toggleDropDown}
                className="flex items-center space-x-2 bg-transparent text-black rounded-2xl py-1.5 px-4"
              >
                {/* User Image */}
                <img
                  src={
                    data?.user?.images ||
                    "/assets/Images/default-avatar-image.jpg"
                  }
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                {/* Dropdown Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 px-2 z-10">
                  {/* Dashboard Button */}
                  {data?.user?.role === "admin" && (
                    <button
                      onClick={() => navigate("/dashboard")} // Use navigate for programmatic routing
                      className="w-full text-center px-4 py-2 mb-2 text-white bg-gradient-to-r from-[#FF5757] to-[#780E0E] hover:from-[#780E0E] hover:to-[#FF5757] rounded-md transition duration-200"
                    >
                      Dashboard
                    </button>
                  )}

                  {/* Log Out Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-full transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <button
        className="md:hidden text-white text-xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <FaTimes className="text-white lg:text-xl md:text-lg" />
        ) : (
          <FaBars className="text-white lg:text-xl md:text-lg" />
        )}
      </button>
    </nav>
  );
};

export default SideNavBar;