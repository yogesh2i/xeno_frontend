import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import { fetchData } from "../../utils/fetchFunction";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetchData("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.token) {
        localStorage.setItem("token", response.token); // Store the token
        navigate("/"); // Redirect to the rule builder page
      } else {
        setError(response.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary w-100 mb-3"
          onClick={handleLogin}
          disabled={!username || !password}
        >
          Login
        </button>
        <div className="text-center">
          <p className="mb-0">Or login with:</p>
         <LoginButton/>
        </div>
      </div>
    </div>
  );
};

export default Login;