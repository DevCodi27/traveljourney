import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";


interface ProtectedRouteProps{
    children : ReactNode;
}

const ProtectRoute: React.FC<ProtectedRouteProps>  = ({children})=>{
     const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
}

export default ProtectRoute;