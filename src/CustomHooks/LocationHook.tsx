import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Role = () => {
  const [role, setRole] = useState<string>("user");
  const location = useLocation();
  useEffect(() => {
    const storedRole = sessionStorage.getItem("role") ?? "user";
    setRole(storedRole);
  }, [location]);

  return role;
};
