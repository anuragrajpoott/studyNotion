import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";
const OpenRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default OpenRoute;
