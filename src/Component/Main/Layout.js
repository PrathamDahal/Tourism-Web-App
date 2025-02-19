import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Footer from "./Footer";
import {
  FaBars,
  FaBell,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { MdSearch, MdTranslate } from "react-icons/md";
import "../../App.css"; // Import the CSS file

const Layout = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isHomePage = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full">
      <nav className="flex justify-between items-center w-screen absolute top-6 px-4 z-20">
        <p className="text-red-700 font-redressed lg:text-[24px] md:text-[16px] md:px-2 lg:px-5">
          Panchpokhari Tourism
        </p>

        <ul
          className={`absolute top-16 left-0 w-full bg-gray-800 md:bg-transparent 
              md:flex md:relative md:top-0 md:w-auto 
              space-y-2 md:space-y-0 md:space-x-4 lg:space-x-6 
              text-sm md:text-xs lg:text-sm xl:text-base 
              md:gap-x-1 lg:gap-x-2 lg:px-4 md:px-0 
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
        <div className="flex items-center xl:space-x-4 lg:space-x-2 md:space-x-0 space-x-2">
          {/* Icons */}
          <div className="flex items-center xl:space-x-8 lg:space-x-4 md:space-x-2 space-x-2">
            <Link
              to="/notifications"
              className="hover:text-blue-300 text-white"
            >
              <FaBell className="lg:text-xl md:text-lg" />
            </Link>
            <Link to="/cart" className="hover:text-blue-300 text-white">
              <FaShoppingCart className="lg:text-xl md:text-lg" />
            </Link>
            <Link to="/cart" className="hover:text-blue-300 text-white">
              <MdTranslate className="lg:text-xl font-semibold md:text-lg" />
            </Link>
          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:flex xl:space-x-4 lg:space-x-2 md:space-x-0">
            <button className=" lg:py-1.5 lg:px-4 md:py-0.5 md:px-2 hover:bg-red-700 rounded-2xl">
              <Link
                to="/SignUp"
                className="text-white text-base underline xl:text-[18px] lg:text-[14px] md:text-[12px]"
              >
                SIGN UP
              </Link>
            </button>
            <button className=" lg:py-1.5 lg:px-4 md:py-0.5 md:px-2 bg-red-500 hover:bg-red-700 rounded-2xl">
              <Link
                to="/login"
                className="text-white text-base xl:text-[18px] lg:text-[14px] md:text-[12px]"
              >
                LOG IN
              </Link>
            </button>
          </div>
        </div>

        <button
          className="md:hidden text-white text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <FaTimes className=" text-white lg:text-xl md:text-lg" />
          ) : (
            <FaBars className="text-white lg:text-xl md:text-lg" />
          )}
        </button>
      </nav>

      {/* Hero Section */}
      <section
        className={`hero relative bg-cover bg-center ${
          isHomePage
            ? "xl:h-[600px] lg:h-[500px] md:h-[450px] sm:h-[350px] h-[300px]"
            : "xl:h-[500px] lg:h-[400px] md:h-[350px] sm:h-[250px] h-[200px]"
        } text-white flex items-center justify-center`}
        style={{ backgroundImage: `url(/assets/Images/UniversalUpscaler.png)` }}
      >
        {isActive("/") && (
          <>
            <img
              src="/assets/Images/Ellipse 2.png"
              alt="Segment"
              className="absolute bottom-0 right-0 object-contain 
             xl:w-[135px] xl:h-[175px] lg:w-[120px] lg:h-[155px] 
             md:w-[100px] md:h-[130px] sm:w-[80px] sm:h-[120px] w-[40px] h-[50px]"
            />
            <img
              src="/assets/Images/Ellipse 3.png"
              alt="Segment"
              className="absolute bottom-0 right-0 object-contain 
             xl:w-[172px] xl:h-[210px] lg:w-[150px] lg:h-[185px] 
             md:w-[130px] md:h-[160px] sm:w-[110px] sm:h-[150px] w-[60px] h-[70px]"
            />
            <img
              src="/assets/Images/Ellipse 4.png"
              alt="Segment"
              className="absolute bottom-0 right-0 object-contain 
             xl:w-[205px] xl:h-[240px] lg:w-[180px] lg:h-[215px] 
             md:w-[160px] md:h-[190px] sm:w-[140px] sm:h-[180px] w-[90px] h-[105px]"
            />
            <img
              src="/assets/Images/Ellipse 5.png"
              alt="Segment"
              className="absolute bottom-0 right-0 object-contain 
             xl:w-[235px] xl:h-[270px] lg:w-[210px] lg:h-[245px] 
             md:w-[190px] md:h-[220px] sm:w-[170px] sm:h-[210px] w-[120px] h-[135px]"
            />
            <img
              src="/assets/Images/Ellipse 6.png"
              alt="Segment"
              className="absolute bottom-0 right-0 object-contain 
             xl:w-[280px] xl:h-[300px] lg:w-[245px] lg:h-[265px] 
             md:w-[220px] md:h-[235px] sm:w-[200px] sm:h-[220px] w-[145px] h-[155px]"
            />
          </>
        )}
      </section>

      {isActive("/") ? ( //Home
        <div className="justify-center xl:p-3 md:p-1 absolute xl:top-[300px] lg:top-[250px] md:top-[200px] top-[150px] left-[20px] w-[250px] md:w-[350px] lg:w-[450px] xl:w-[580px]">
          <p className="xl:text-4xl lg:text-2xl md:text-xl text-sm font-bold font-Playfair xl:mb-4 lg:mb-2 md:mb-1 text-white">
            Journey Beyond the Ordinary:
            <br /> Discover Panchpokhari
          </p>
          <p className="xl:text-xl lg:text-base md:text-sm text-xs xl:mb-4 lg:mb-2 md:mb-1 text-slate-300 font-medium font-Open">
            Experience Nepal's untouched beauty, whether you're exploring from
            afar or from nearby.
          </p>
          <div className="justify-between flex">
            <button className="bg-yellow-500 text-white font-Open xl:text-base lg:text-sm md:text-xs text-[8px] px-1 md:py-1 md:px-1.5 lg:py-1 lg:px-3 xl:py-2 xl:px-6 rounded-full hover:bg-red-600 transition-all">
              START YOUR ADVENTURE
            </button>
            <button className="border-solid border-2 border-white font-Open xl:text-base lg:text-sm md:text-xs text-[8px] text-white px-1 md:py-1 md:px-1.5 lg:py-1 lg:px-3 xl:py-2 xl:px-6 rounded-full hover:bg-red-600 transition-all">
              ADD YOUR ACCOMMODATION
            </button>
          </div>
        </div>
      ) : isActive("/WhereToGo") ? ( //WhereToGo
        <div className="absolute flex flex-col items-center justify-center w-auto h-auto xl:top-[200px] lg:top-[150px] md:top-[120px] xl:left-1/3 lg:left-1/4 md:left-[150px] ">
          <div className="text-center p-6">
            <p className="text-4xl font-bold font-Playfair mb-4 text-white">
              Destinations in Pachpokhari
            </p>
            <div className="flex items-center justify-between px-4 mx-auto mt-4 w-[300px] bg-gray-50 rounded-3xl overflow-hidden">
              <input
                type="text"
                placeholder="Search"
                className="p-2 flex-1 bg-gray-50 text-black focus:outline-none placeholder-sm placeholder-black"
              />
              <button className="text-gray-700 px-2 py-2 rounded-2xl hover:bg-gray-600 transition-all">
                <MdSearch />
              </button>
            </div>
          </div>
        </div>
      ) : isActive("/WhereToStay") ? ( //WhereToStay
        <div className="absolute flex flex-col items-center justify-center w-auto h-auto left-[320px] top-1/3">
          <div className="text-center p-6">
            <p className="text-[40px] font-bold font-Playfair mb-4 text-white">
              Accomodation in Pachpokhari
            </p>
            <div className="flex items-center h-14 justify-between mx-auto mt-4 w-[680px] rounded-md bg-orange-400 overflow-hidden">
              <div className="flex items-center flex-1 ml-1 bg-gray-50 relative rounded-sm">
                <FaMapMarkerAlt className="absolute left-3 text-black text-xl" />
                <input
                  type="text"
                  placeholder="Where are you going..."
                  className="p-3 pl-10 flex-1 bg-gray-50 font-Open text-black focus:outline-none placeholder-xs placeholder-black"
                />
              </div>
              <div className="flex items-center flex-1 mx-1 bg-gray-50 relative rounded-sm">
                <FaUser className="absolute left-3 text-black text-xl" />
                <input
                  type="text"
                  placeholder="Number of travellers..."
                  className="p-3 pl-10 flex-1 bg-gray-50 font-Open text-black focus:outline-none placeholder-xs placeholder-black"
                />
              </div>
              <button className="text-white px-7 py-[13px] mr-1 rounded-md bg-red-700 transition-all">
                Search
              </button>
            </div>
          </div>
        </div>
      ) : isActive("/LocalProducts") ? ( //LocalProducts
        <div className="absolute flex flex-col items-center justify-center w-auto h-auto left-[400px] top-[300px]">
          <div className="flex items-center justify-between px-4 mx-auto mt-4 w-[550px] bg-gray-50 rounded-3xl overflow-hidden">
            <input
              type="text"
              placeholder="Search for anything..."
              className="p-2 flex-1 bg-gray-50 text-black focus:outline-none placeholder-black placeholder-md"
            />
            <button className="text-gray-800 text-2xl px-2 py-2 rounded-2xl transition-all">
              <MdSearch />
            </button>
          </div>
        </div>
      ) : isActive("/ContactUs") ? (
        <div className="absolute flex flex-col items-center justify-center w-auto h-auto left-[540px] top-1/3">
          <div className="text-center p-6">
            <p className="text-5xl font-bold font-Playfair mb-4 text-white">
              Contact Us
            </p>
          </div>
        </div>
      ) : isActive("/SignUp") ? (
        <div className="absolute flex flex-col items-center justify-center w-auto h-auto left-[540px] top-1/3">
          <div className="text-center p-6">
            <p className="text-5xl font-bold font-Playfair mb-4 text-white">
              Sign Up Page
            </p>
          </div>
        </div>
      ) : (
        <div className="absolute flex flex-col items-center justify-center w-auto h-auto left-[540px] top-1/3">
          <div className="text-center p-6">
            <p className="text-5xl font-bold font-Playfair mb-4 text-white">
              Login Page
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
