// ProtectedRoute.js
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useCheckAdminAuthQuery } from "../Services/auth/admin-authApi";

const ProtectedRoute = () => {
  const [ok, setOk] = useState(false);
  const { data, isLoading, isError } = useCheckAdminAuthQuery();

  useEffect(() => {
    if (data?.ok) {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [data]);

  if (isLoading) {
    return <h1>Loading...</h1>; 
  }

  if (isError) {
    return <h1>Error: Unauthorized Access</h1>; 
  }

  return ok ? <Outlet /> : <h1>Unauthorized Access</h1>;
};

export default ProtectedRoute;