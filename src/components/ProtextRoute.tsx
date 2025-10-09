import axios from "axios";
import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";


interface ProtectedRouteProps {
  children: ReactNode;
}


const ProtectRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isValid, setIsValid] = useState<boolean|null>(null);
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token)
    {
      setIsValid(false);
      return;
    }

    axios.get("http://localhost:5000/api/auth/protected",{
      headers:{Authorization:`Bearer ${token}`}
    })
    .then(()=>setIsValid(true))
    .catch(()=>setIsValid(false));
  },[])

  if (isValid === null) return<LoadingSpinner />;
  
  if (!isValid) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectRoute;
