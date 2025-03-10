import { Routes, Route } from "react-router-dom";
import Layout from "./../Component/Main/Layout";
import WebContentRoute from "./webContentRoute";
import NoPage from "../NoPage";
import DashboardRoute from "./DashboardRoute";

function MainRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/*" element={<WebContentRoute />} />
      </Route>
      <Route path="dashboard/*" element={<DashboardRoute />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default MainRoute;
