import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../utils/constants";
import React from "react";

const InstructorRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.accountType !== ACCOUNT_TYPE.INSTRUCTOR) {
    return <Navigate to="/dashboard/my-profile" replace />;
  }

  return children;
};

export default InstructorRoute;
