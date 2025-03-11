import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useCheckAdminAuthQuery } from "../Services/auth/admin-authApi";

const ProtectedRoute = () => {
  const [ok, setOk] = useState(false);
  const { data, isLoading, isError, error } = useCheckAdminAuthQuery();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    console.log("Data:", data);
    if (data?.ok) {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [data, error]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (token && ok) {
    return <Outlet />;
  } else {
    <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
