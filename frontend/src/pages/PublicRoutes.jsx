import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoutes({ children }) {
  const { user } = useSelector((state) => state.userReducer);

  // if a user tries to access landing page even if he is loggedin, navigate to home
  if (user) {
    return <Navigate to={"/"} />;
  }

  return children;
}

export default PublicRoutes;
