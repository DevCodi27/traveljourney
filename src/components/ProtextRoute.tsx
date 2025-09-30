import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";


interface ProtectedRouteProps{
    children : ReactNode;
}

const ProtectRoute: React.FC<ProtectedRouteProps>  = ({children})=>{
     const isLoggedIn = sessionStorage.getItem("username") === "Abishek";
    

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export default ProtectRoute;