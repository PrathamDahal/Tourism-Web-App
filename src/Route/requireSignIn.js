// ProtectedRoute.js
import React, { useState, useEffect } from "react";
import { Outlet,Navigate  } from "react-router-dom";
import { useCheckAdminAuthQuery } from "../Services/auth/admin-authApi";

const RequireSignIn = () => {
  const [ok, setOk] = useState(false);
  const { data, isLoading, isError } = useCheckAdminAuthQuery();
  console.log("data",data);

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
    return <Navigate to="/login" />; 
  }

  return ok ? <Outlet /> : <h1>Unauthorized Access</h1>;
};

export default RequireSignIn;