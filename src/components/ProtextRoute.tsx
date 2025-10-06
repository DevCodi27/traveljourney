import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";


interface ProtectedRouteProps {
  children: ReactNode;
}


const ProtectRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectRoute;
