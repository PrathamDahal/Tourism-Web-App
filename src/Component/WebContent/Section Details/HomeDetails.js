import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchUserProfileQuery } from "../../../Services/userApiSlice";

const HomeDetails = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [isLoggedIn] = useState(!!accessToken);

  const {
    data,
    isLoading,
    isError,
  } = useFetchUserProfileQuery(undefined, {
    skip: !accessToken,
  });

  const handleAddAccommodation = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (isLoading) {
      alert("Checking your profile...");
      return;
    }

    if (isError || !data || !data.role) {
      alert("Unable to fetch profile information.");
      return;
    }

    if (data.role === "HOST") {
      navigate("/dashboard/home");
    } else {
      alert("Unauthorized entry. Only HOSTs can access this section.");
    }
  };

  return (
    <div className="justify-center xl:p-3 md:p-1 absolute xl:top-[300px] lg:top-[250px] md:top-[200px] top-[150px] left-[20px] w-[250px] md:w-[350px] lg:w-[450px] xl:w-[580px]">
      <p className="xl:text-4xl lg:text-2xl md:text-xl text-sm font-bold font-Playfair xl:mb-4 lg:mb-2 md:mb-1 text-white">
        Journey Beyond the Ordinary:
        <br /> Discover Panchpokhari
      </p>
      <p className="xl:text-xl lg:text-base md:text-sm text-xs xl:mb-4 lg:mb-2 md:mb-1 text-slate-300 font-medium font-Open">
        Experience Nepal's untouched beauty, whether you're exploring from afar
        or from nearby.
      </p>
      <div className="justify-between flex">
        <button className="bg-yellow-500 text-white font-Open xl:text-base lg:text-sm md:text-xs text-[8px] px-1 md:py-1 md:px-1.5 lg:py-1 lg:px-3 xl:py-2 xl:px-6 rounded-full hover:bg-red-600 transition-all">
          START YOUR ADVENTURE
        </button>
        <button
          onClick={handleAddAccommodation}
          className="border-solid border-2 border-white font-Open xl:text-base lg:text-sm md:text-xs text-[8px] text-white px-1 md:py-1 md:px-1.5 lg:py-1 lg:px-3 xl:py-2 xl:px-6 rounded-full hover:bg-red-600 transition-all"
        >
          ADD YOUR ACCOMMODATION
        </button>
      </div>
    </div>
  );
};

export default HomeDetails;
