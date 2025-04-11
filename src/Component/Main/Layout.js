import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import "../../App.css"; // Import the CSS file
import MainNavBar from "./../WebContent/NavBar/MainNavBar";
import SideNavBar from "./../WebContent/NavBar/SideNavBar";
import HeroSection from "./../WebContent/Hero/HeroSection";
import HomeDetails from "./../WebContent/Section Details/HomeDetails";
import WhereToGoDetails from "./../WebContent/Section Details/WhereToGoDetails";
import WhereToStayDetails from "./../WebContent/Section Details/WhereToStayDetails";
import LocalDetails from "./../WebContent/Section Details/LocalDetails";
import ContactUsDetails from "./../WebContent/Section Details/ContactUsDetails";
import CategoryDetails from "./../WebContent/Section Details/CategoryDetails";
import TravelPackageDetails from "../WebContent/Section Details/TravelPackageDetails";

const Layout = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isProductPage = location.pathname.startsWith("/localproducts/product");
  const isDestinationPage = location.pathname.startsWith("/wheretogo/destination");
  const isAccomodationPage = location.pathname.startsWith("/wheretostay/accomodation");
  const isTravelDealsPage = location.pathname.startsWith("/travel-packages/travel-deals");
  const isCartPage = location.pathname.startsWith("/localproducts/cart");


  return (
    <div className="w-full">
      {(isProductPage || isDestinationPage || isAccomodationPage || isTravelDealsPage || isCartPage) ? <SideNavBar /> : <MainNavBar />}

      {/* Hero Section */}
      <HeroSection />

      {isActive("/") ? ( //Home
        <HomeDetails />
      ) : isActive("/WhereToGo") ? ( //WhereToGo
        <WhereToGoDetails />
      ) : isActive("/WhereToStay") ? ( //WhereToStay
        <WhereToStayDetails />
      ) : isActive("/LocalProducts") ? ( //LocalProducts
        <LocalDetails />
      ) : isActive("/ContactUs") ? (
        <ContactUsDetails />
      ) : window.location.pathname.startsWith("/localproducts/category") ? (
        <CategoryDetails />
      ) : isActive("/travel-packages") ? (
        <TravelPackageDetails />
      ) : (
        <div className="hidden">
          No Details
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
