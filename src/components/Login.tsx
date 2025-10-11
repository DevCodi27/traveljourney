import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import users from "../Data/User";
import axios from 'axios';


type LoginResponse = {
  token:string,
  username:string,
  role:"user"|"admin"
  message?:string
}
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  // const user = users;
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("User Name and Pasword is Required ");
      return;
    }

    // const matchuser = user.find(
    //   (user) => userName === user.user && password === user.password
    // );
    try{
         const response =  await axios.post<LoginResponse>("http://localhost:5000/api/auth/login",{username,password},{
          headers: {
            "Content-Type": "application/json",
          },
        })

         const data:LoginResponse = response.data


        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);

        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setError("");
        navigate("/home", { replace: true });
    }
    catch(err:any)
    {
      if (err.response) {
        setError(err.response.data.message);
  } else {
       setError("Server error");
  }
    }

    // if (matchuser) {
    //   localStorage.setItem("userName", matchuser.user);
    //   localStorage.setItem("userRole", String(matchuser.role));
    //   setError("");
    //   navigate("/home", { replace: true });
    // } else {
    //   setError("Invalid Credentials");
    // }
  };
  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <label htmlFor="">Enter User Name</label>
            <input
              type="text"
              name="user_name"
              id="user_name"
              placeholder="Enter User Name"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <label htmlFor="">Enter Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="new-password"
              />
              <span
                className="toggle-icon"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </span>
            </div>
            <br />
            <br />
            <button type="submit">Login</button>
            <Link to="/register">Register</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
