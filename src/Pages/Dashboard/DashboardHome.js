import React from 'react';
import SideBar from './../../Component/Dashboard/SideBar';
import Header from '../../Component/Dashboard/Header';

const DashboardHome = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 p-5">
        <Header />
      </div>
    </div>
  );
};

export default DashboardHome;
