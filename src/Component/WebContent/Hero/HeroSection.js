import React from "react";
import { useLocation } from "react-router-dom";

const HeroSection = () => {
  const location = useLocation();

  // Determine the current page
  const isHomePage = location.pathname === "/";
  const isSignUpPage = location.pathname === "/SignUp";
  const isLogInPage = location.pathname === "/login";
  const isResetPage = location.pathname.startsWith("/reset-password");
  const isProductPage = location.pathname.startsWith("/localproducts/product");
  const isDestinationPage = location.pathname.startsWith("/wheretogo/destination");
  const isAccomodationPage = location.pathname.startsWith("/wheretostay/accomodation");
  const isTravelDealsPage = location.pathname.startsWith("/travel-packages/travel-deals");
  const isCartPage = location.pathname.startsWith("/localproducts/cart");

  // Check if the current route is the home page
  const isActive = (path) => location.pathname === path;

  return (
    <section
      className={`${
        isHomePage
          ? "xl:h-[600px] lg:h-[500px] md:h-[450px] sm:h-[350px] h-[300px]"
          : "xl:h-[500px] lg:h-[400px] md:h-[350px] sm:h-[250px] h-[200px]"
      } ${
        isSignUpPage || isLogInPage || isResetPage || isProductPage || isDestinationPage || isAccomodationPage || isTravelDealsPage || isCartPage
          ? "hidden"
          : "hero relative bg-cover bg-center text-white flex items-center justify-center"
      }`}
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
  );
};

export default HeroSection;