import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import axios from "axios";

interface RegisterRequest {
  username: string;
  password: string;
  role: "user" | "admin";
  message?: string;
}

function Registration() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post<RegisterRequest>(
        "http://localhost:5000/api/auth/register",
        { username, password, role },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response.status);

      if (response.status === 201) {
        setError("");
        navigate("/login");
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Server error");
      }
    }
  };

  // ✅ JSX return must be here, in the component function
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "user" | "admin")}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Register</button>
          <Link to = "/login">Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Registration;
