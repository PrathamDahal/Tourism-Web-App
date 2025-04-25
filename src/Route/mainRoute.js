import { Route, Routes } from "react-router-dom";
import Layout from './../Component/Main/Layout';
import WebContentRoute from './webContentRoute';
import ProtectedRoute from "./ProtectedRoute";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import SiteSettings from "../Pages/Dashboard/Settings/SiteSettings";
import NoPage from './../NoPage';
import Category from "../Pages/Dashboard/Category/Category";
import Product from "../Pages/Dashboard/Products/Product";
import Profile from './../Pages/Profile/Profile';

function MainRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/*" element={<WebContentRoute />} />
      </Route>

      {/* Dashboard Routes */}
      <Route path="dashboard" element={<ProtectedRoute />}>
        <Route index element={<DashboardHome />} />
        <Route path="home" element={<DashboardHome />} />
        <Route path="site-settings" element={<SiteSettings />} />
        <Route path="category" element={<Category />} />
        <Route path="product" element={<Product />} />
      </Route>

      {/* Profile */}
      <Route path="profile" element={<Profile />} />
      
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default MainRoute;
