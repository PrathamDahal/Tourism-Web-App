import { Outlet, Navigate } from "react-router-dom";
import { useFetchUserProfileQuery } from "../Services/userApiSlice"; // adjust path if different

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");

  // Only call the query if token exists
  const { data, isLoading, isError } = useFetchUserProfileQuery(undefined, {
    skip: !token,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // If there's no token or error fetching user data, redirect to login
  if (!token || isError || !data) {
    return <Navigate to="/login" replace />;
  }

  // If user data is successfully fetched, grant access
  return <Outlet />;
};

export default ProtectedRoute;
