import SideBar from './../../Component/Dashboard/SideBar';
import Header from './../../Component/Dashboard/Header';

const DashboardHome = () => {
  return (
    <div className="flex h-full">
      <SideBar />
      <div className="flex-1 px-4">
        <Header />
      </div>
    </div>
  );
};

export default DashboardHome;
