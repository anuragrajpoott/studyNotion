import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../utils/constants";

const StudentRoute = ({ children }) => {
  const { user } = useSelector((state) => state.profile);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.accountType !== ACCOUNT_TYPE.STUDENT) {
    return <Navigate to="/dashboard/my-profile" replace />;
  }

  return children;
};

export default StudentRoute;
