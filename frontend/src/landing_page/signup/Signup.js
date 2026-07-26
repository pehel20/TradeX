import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
      });

      alert("Signup successful");
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>Sign Up</button>

        <p>
          Already have an account?{" "}
          <span onClick={() => (window.location.href = "/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;