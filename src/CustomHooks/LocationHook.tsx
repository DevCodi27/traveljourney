import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Role = () => {
  const [role, setRole] = useState<number>(0);
  const location = useLocation();
  useEffect(() => {
    const storedRole = Number(sessionStorage.getItem("userRole") ?? 0);
    setRole(storedRole);
  }, [location]);

  return role;
};
