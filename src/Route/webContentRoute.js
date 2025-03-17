import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import WhereToGo from "../Pages/WhereToGo/WhereToGo";
import WhereToStay from "../Pages/WhereToStay/WhereToStay";
import ContactUs from "../Pages/ContactUs/ContactUs";
import SignUp from "../Pages/Sign Up/SignUp";
import Login from "../Pages/Login/Login";
import ResetPassword from "../Pages/Reset Password/ResetPassword";
import Home from "./../Pages/Home/Home";
import CategoryPage from './../Pages/Category/CategoryDisplay';
import ProductPage from './../Pages/Products/ProductDisplay';
import LocalProducts from './../Pages/Local Products/LocalProducts';
import DestinationPage from "../Pages/WhereToGo/Destinations/Destinations";
import AccomodationPage from "../Pages/WhereToStay/Accomodations/AccomodationPage";
import TravelPackages from "../Pages/Travel Packages/TravelPackages";
import TravelDeals from "../Pages/Travel Packages/Travel Deals/TravelDeals";

const WebContentRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Home />} />

        <Route path="wheretoGo" element={<Outlet />}>
          <Route index element={<WhereToGo />} />
          <Route path="destination/:id" element={<DestinationPage />} />
        </Route>

        <Route path="wheretoStay" element={<Outlet />}>
          <Route index element={<WhereToStay />} />
          <Route path="accomodation/:id" element={<AccomodationPage />} />
        </Route>

        <Route path="travel-packages" element={<Outlet />}>
          <Route index element={<TravelPackages />} />
          <Route path="travel-deals/:id" element={<TravelDeals />} />
        </Route>

        <Route path="contactus" element={<ContactUs />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />

        <Route path="reset-password/:token" element={<ResetPassword />} />

        <Route path="localproducts" element={<Outlet />}>
          <Route index element={<LocalProducts />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="product/:id" element={<ProductPage />} />
        </Route>
      </Route>

      {/* Fallback route for unauthorized access */}
      <Route path="/unauthorized" element={<div>Unauthorized Access!</div>} />
    </Routes>
  );
};

export default WebContentRoute;