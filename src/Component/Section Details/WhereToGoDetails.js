import React from "react";
import { MdSearch } from "react-icons/md";

const WhereToGoDetails = () => {
  return (
    <div className="absolute flex flex-col items-center justify-center w-auto h-auto xl:top-[200px] lg:top-[150px] md:top-[120px] top-[80px] xl:left-1/3 lg:left-1/4 md:left-[230px] left-[50px] ">
      <div className="text-center p-1 md:p-6">
        <p className="text-base md:text-xl lg:text-4xl font-bold font-Playfair mb-4 text-white">
          Destinations in Pachpokhari
        </p>
        <div className="flex items-center justify-between gap-1 px-4 mx-auto mt-4 w-[120px] md:w-[220px] lg:w-[320px] xl:w-[420px] bg-gray-50 rounded-3xl overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-[80%] md:p-2 bg-gray-50 text-black focus:outline-none placeholder-sm placeholder-black"
          />
          <button className="text-gray-700 px-2 py-2 rounded-2xl hover:bg-gray-600 transition-all">
            <MdSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhereToGoDetails;
