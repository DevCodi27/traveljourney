import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import users from "../Data/User";

interface ProtectedRouteProps {
  children: ReactNode;
}

var user = users;

const ProtectRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = user.find(
    (user) => sessionStorage.getItem("userName") === user.user
  );

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectRoute;
