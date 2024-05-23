import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const { user } = useSelector((state) => state.userReducer);

  if (!user) {
    return <Navigate to={"/landing"} />;
  }

  return children;
}

export default ProtectedRoutes;
