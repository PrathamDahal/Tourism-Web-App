
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBell, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout, setCredentials } from "./../../../Features/slice/authSlice";
import { useFetchUserProfileQuery } from "../../../Services/userApiSlice";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const MainNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropDown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const isActive = (path) => {
    // Implement your logic to determine if the current path is active
    return window.location.pathname === path;
  };

  const isSignUpPage = location.pathname.startsWith("/signup");
  const isLoginPage = location.pathname.startsWith("/login");
  const isResetPage = location.pathname.startsWith("/reset-password");
  const isStayPage = location.pathname.startsWith("/wheretostay");
  const isTravelPage = location.pathname.startsWith("/travel-packages");

  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  // Conditionally fetch user profile only if accessToken is available
  const { data, isLoading } = useFetchUserProfileQuery(undefined, {
    skip: !accessToken,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);

  useEffect(() => {
    if (accessToken && data) {
      dispatch(setCredentials({ user: data }));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [accessToken, data, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(logout());
    setIsLoggedIn(false);
    navigate(`/login`);
  };

  if (isLoading) return <div>Loading...</div>;

  const normal = data?.role;
  const images = data?.images;

  return (
    <nav
      className={`${
        isLoginPage || isSignUpPage || isResetPage || isStayPage || isTravelPage
          ? "hidden"
          : "absolute top-0 left-0 w-full z-20 bg-transparent flex justify-between items-center px-4 py-2"
      }`}
    >
      <p className="text-red-700 font-redressed lg:text-[24px] md:text-[14px] md:px-2 lg:px-5">
        Panchpokhari Tourism
      </p>

      <ul
        className={`absolute top-16 left-0 w-full bg-gray-800 md:bg-transparent 
              md:flex md:relative md:top-0 md:w-auto 
              space-y-2 md:space-y-0 
              text-xs md:text-[10px] lg:text-xs md:gap-x-1
              transition-all duration-300 ease-in-out 
              shadow-md md:shadow-none rounded-b-lg md:rounded-none 
              ${menuOpen ? "block p-3" : "hidden"}
              `}
      >
        {[
          { name: "Home", path: "/" },
          { name: "Where To Go", path: "/wheretogo" },
          { name: "Where To Stay", path: "/wheretostay" },
          { name: "Local Products", path: "/localproducts" },
          { name: "Travel Pack", path: "/travel-packages" },
          { name: "Contact Us", path: "/contactus" },
        ].map((item) => (
          <li key={item.path} className="text-center md:text-left">
            <Link
              to={item.path}
              className={`block px-4 py-1 md:px-3 md:py-1 rounded-md transition-colors duration-200 
                    ${
                      isActive(item.path)
                        ? "text-yellow-400 bg-gray-900 md:bg-transparent"
                        : "text-white"
                    } 
                    hover:text-yellow-400 hover:bg-gray-700 md:hover:bg-transparent`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Icons and Auth Links */}
      <div className="flex items-center xl:space-x-3 lg:space-x-2 md:space-x-0 space-x-2">
        {/* Icons */}
        <div className="flex items-center xl:space-x-6 lg:space-x-4 md:space-x-2 space-x-2">
          <Link to="/notifications" className="hover:text-blue-300 text-white">
            <FaBell className="lg:text-xl md:text-lg" />
          </Link>
          <Link to="/cart" className="hover:text-blue-300 text-white">
            <FaShoppingCart className="lg:text-xl md:text-lg" />
          </Link>
          {/* <Link to="/cart" className="hover:text-blue-300 text-white">
            <MdTranslate className="lg:text-xl font-semibold md:text-lg" />
          </Link> */}
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex xl:space-x-4 lg:space-x-2 md:space-x-0">
          {!isLoggedIn ? (
            <>
              <button className="lg:py-1.5 lg:px-4 md:py-0.5 md:px-2 hover:bg-red-700 rounded-2xl">
                <Link
                  to="/signup"
                  className="text-white text-base underline xl:text-[18px] lg:text-[14px] md:text-[12px]"
                >
                  SIGN UP
                </Link>
              </button>
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
                className="flex items-center space-x-2 bg-transparent hover:bg-gray-100 hover:text-black text-white rounded-full py-2 px-1 transition-all duration-200"
              >
                {/* User Image */}
                <img
                  src={
                    `${API_BASE_URL}/${images}` ||
                    "/assets/Images/default-avatar-image.jpg"
                  }
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-gray-400 object-cover"
                />
                <div className="hidden md:block text-left">
                  <p className="font-medium text-sm">
                    {data?.username || "Username"}
                  </p>
                  <p className="text-xs">
                    {data?.email || "user@example.com"}
                  </p>
                </div>
                {/* Dropdown Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-gray-300 transition-transform duration-200"
                  style={{
                    transform: isDropdownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
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
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-lg overflow-hidden z-10 border border-gray-100">
                  {/* User Info Header */}
                  <div className="bg-gray-50 p-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <img
                        src={
                          `${API_BASE_URL}/${images}` ||
                          "/assets/Images/default-avatar-image.jpg"
                        }
                        alt="User"
                        className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                      />
                      <div className="ml-3">
                        <p className="font-semibold">
                          {data?.username || "Username"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {data?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="py-2">
                    {/* My Profile Option */}
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      My Profile
                    </button>

                    {/* My Cart Option */}
                    <button
                      onClick={() => navigate("/localproducts/cart")}
                      className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      My Cart
                    </button>

                    {/* Dashboard Option - Only for Admins */}
                    {["ADMIN", "SELLER", "HOST", "TRAVELAGENCY"].includes(
                      normal
                    ) && (
                      <button
                        onClick={() => navigate("/dashboard/home")}
                        className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          />
                        </svg>
                        {normal === "ADMIN"
                          ? "Dashboard"
                          : normal === "SELLER"
                          ? "Add a product"
                          : normal === "HOST"
                          ? "Add a Accommodation"
                          : "Add a Travel Package"}
                      </button>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100"></div>

                  {/* Log Out Button */}
                  <div className="p-3">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center px-4 py-2 text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-md transition-colors shadow-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
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

export default MainNavBar;
 