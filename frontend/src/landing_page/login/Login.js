import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";
const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        alert("Login successful");

        window.location.href = `${DASHBOARD_URL}?token=${res.data.token}`;
      } else {
        alert(res.data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Welcome Back</h2>

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don’t have an account?{" "}
          <span onClick={() => (window.location.href = "/signup")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;