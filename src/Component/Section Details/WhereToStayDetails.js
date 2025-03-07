import React, { useState } from "react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { MdSearch } from "react-icons/md";

const WhereToStayDetails = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="absolute z-10 flex flex-col items-center justify-center w-auto h-auto xl:top-[200px] lg:top-[150px] md:top-[120px] top-[80px] 2xl:left-1/3 xl:left-[400px] lg:left-[220px] md:left-[130px] left-[50px]">
      <div className="text-center p-4 md:p-6">
        <p className="xl:text-[40px] md:text-[28px] lg:text-[36px] font-bold font-Playfair mb-4 text-white">
          Accomodation in Pachpokhari
        </p>
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-center w-[220px] bg-orange-400 text-white px-4 py-2 rounded-md md:hidden"
        >
          <MdSearch className="text-xl mr-2" /> Search
        </button>
        <div
          className={`${
            isDropdownOpen ? "block" : "hidden"
          } z-10 md:flex flex-col md:flex-row items-center justify-center w-full max-w-[220px] sm:max-w-[320px] md:max-w-[450px] lg:max-w-[680px] rounded-md bg-orange-400 overflow-hidden space-y-2 md:space-y-0 md:space-x-1 mt-2 md:mt-0`}
        >
          <div className="flex items-center w-full bg-gray-50 relative rounded-sm">
            <FaMapMarkerAlt className="absolute left-3 text-black text-xl" />
            <input
              type="text"
              placeholder="Where are you going..."
              className="w-full p-3 pl-10 bg-gray-50 font-Open text-black focus:outline-none placeholder-xs placeholder-black rounded-sm"
            />
          </div>
          <div className="flex items-center w-full bg-gray-50 relative rounded-sm">
            <FaUser className="absolute left-3 text-black text-xl" />
            <input
              type="text"
              placeholder="Number of travellers..."
              className="w-full p-3 pl-10 bg-gray-50 font-Open text-black focus:outline-none placeholder-xs placeholder-black rounded-sm"
            />
          </div>
          <button className="w-full md:w-auto text-white px-7 py-[13px] rounded-md bg-red-700 transition-all">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhereToStayDetails;
