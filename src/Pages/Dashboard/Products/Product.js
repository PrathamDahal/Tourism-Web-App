import SideBar from '../../../Component/Dashboard/SideBar';
import Header from '../../../Component/Dashboard/Header';
import LoadingSpinner from '../../../Component/LoadingSpinner';
import MyProducts from './../../../Component/Dashboard/Admin-Dashboard/Product/MyProducts';
import SellerProducts from './../../../Component/Dashboard/Seller-Dashboard/Product/SellerProducts';
import { useFetchUserProfileQuery } from '../../../Services/userApiSlice';

const Product = () => {
  const { data, isLoading } = useFetchUserProfileQuery();
  const role = data?.role;

  if (isLoading) return <LoadingSpinner fullScreen />;

  return (
    <div className="flex h-full">
      <SideBar />
      <div className="flex-1 px-4">
        <Header />
        {role === 'ADMIN' && <MyProducts />}
        {role === 'SELLER' && <SellerProducts />}
        {!['ADMIN', 'SELLER'].includes(role) && (
          <p className="text-center mt-6 text-red-500">
            You do not have permission to view this page.
          </p>
        )}
      </div>
    </div>
  );
};

export default Product;
