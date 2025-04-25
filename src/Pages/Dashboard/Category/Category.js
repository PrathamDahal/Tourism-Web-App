import React from "react";
import SideBar from "../../../Component/Dashboard/SideBar";
import Header from "../../../Component/Dashboard/Header";
import CategoryType from "../../../Component/Dashboard/Admin-Dashboard/Category/CategoryType";

const Category = () => {
  return (
    <div className="flex h-full">
      <SideBar />
      <div className="flex-1 px-4">
        <Header />
        <CategoryType />
      </div>
    </div>
  );
};

export default Category;
