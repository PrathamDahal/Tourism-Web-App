import React from "react";
import FeaturedActivities from "./../../Component/WebContent/Home/FeaturedActivities";
import PopularDestinations from "./../../Component/WebContent/Home/PopularDestinations";
import FeaturedAccomodations from "./../../Component/WebContent/Home/FeaturedAccomodations";
import Contact from "./../../Component/WebContent/ContactUs/Contact";

const Home = () => {
  return (
    <>
      <div className="sm:my-[50px] items-center justify-center bg-gray-50 px-3">
        <FeaturedActivities />
      </div>
      <div className="sm:my-[50px] items-center justify-center bg-gray-50 px-3">
        <PopularDestinations />
      </div>
      <div className="sm:my-[50px] items-center justify-center bg-gray-50 px-3">
        <FeaturedAccomodations />
      </div>
      <div className="sm:my-[50px] items-center justify-center bg-gray-50 px-3">
        <Contact />
      </div>
    </>
  );
};

export default Home;
