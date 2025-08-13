import { useGetProductsByUserIdQuery, useGetProductsQuery } from "../../Services/productApiSlice";
import { useFetchUserProfileQuery } from "../../Services/userApiSlice";


const DashboardOverview = ({ role }) => {
  // Fetch user profile
  const { data: userProfile, isLoading: loadingUser } = useFetchUserProfileQuery();
  const userId = userProfile?.id;

  // Fetch seller's products
  const {
    data: sellerProducts,
    isLoading: loadingSellerProducts,
  } = useGetProductsByUserIdQuery(userId, {
    skip: !userId || role !== "seller",
  });

  // Fetch all products for admin
  const {
    data: allProducts,
    isLoading: loadingAllProducts,
  } = useGetProductsQuery(undefined, {
    skip: role !== "admin",
  });

  const totalSellerProducts = sellerProducts?.totalProducts || 0;
  const totalAdminProducts = allProducts?.totalProducts || 0;

  // Define role-based data
  const dataByRole = {
    admin: {
      stats: [
        {
          title: "Total Products",
          value: loadingAllProducts ? "..." : totalAdminProducts,
          icon: "📦",
        },
        { title: "Users", value: 120, icon: "👥" },
        { title: "Orders", value: 300, icon: "🛒" },
        { title: "Revenue", value: "$55,000", icon: "💰" },
      ],
      features: [
        "Manage all products and users",
        "Access detailed reports",
        "Approve seller requests",
      ],
    },
    seller: {
      stats: [
        {
          title: "My Products",
          value: loadingUser || loadingSellerProducts ? "..." : totalSellerProducts,
          icon: "📦",
        },
        { title: "Orders Received", value: 80, icon: "🛒" },
        { title: "Pending Shipments", value: 10, icon: "🚚" },
      ],
      features: [
        "Add and edit your products",
        "View order status",
        "Update shipment details",
      ],
    },
    guest: {
      stats: [
        { title: "Available Products", value: 100, icon: "📦" },
        { title: "Registered Users", value: 1000, icon: "👥" },
      ],
      features: [
        "Browse products",
        "Create an account to purchase",
        "Contact support",
      ],
    },
  };

  const { stats, features } = dataByRole[role] || dataByRole.guest;

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="flex flex-wrap gap-6 mb-12">
        {stats.map(({ title, value, icon }) => (
          <div
            key={title}
            className="flex items-center bg-gray-100 rounded-lg p-5 shadow-md flex-1 min-w-[200px]"
          >
            <div className="text-4xl mr-4">{icon}</div>
            <div>
              <h3 className="text-2xl font-semibold">{value}</h3>
              <p className="text-gray-600">{title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardOverview;
