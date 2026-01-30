import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
  const { user } = useSelector((state) => state.profile);

  if (user) {
    return <Navigate to="/dashboard/my-profile" replace />;
  }

  return children;
};

export default OpenRoute;
