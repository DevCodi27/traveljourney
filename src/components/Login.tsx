import { useNavigate } from "react-router-dom";
import "../index.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user1 = "Abishek";
  const user1password = "Abishek27";
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName.trim() || !password.trim) {
      setError("User Name and Pasword is Required ");
      return;
    }

    if (!(userName === user1) || !(password === user1password)) {
      setError("Invalid Credentials");
      return;
    }

    setError("");
    sessionStorage.setItem("username", userName);
    navigate("/home", { replace: true });
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
              value={userName}
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
            <button onClick={() => {}} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
