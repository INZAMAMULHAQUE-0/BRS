import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const validateInputs = () => {
    if (!username || !password) {
      setError("Both fields are required.");
      return false;
    }

    if (username.length < 4) {
      setError("Username must be at least 4 characters.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    setError(""); // Clear any previous errors
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const res = await axios.get("https://brs-2-1lt4.onrender.com/users", {
        params: { username, password },
      });

      const user = res.data.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        alert("Login successful!");
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setError("Invalid credentials!");
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  const handleForgotPassword = () => {
    alert("Password reset instructions have been sent to your email.");
    setShowForgotPassword(false);
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2> {/* Added Login heading */}
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
      
      <div className="forgot-password-container">
        <button
          className="forgot-password-button"
          onClick={() => setShowForgotPassword(!showForgotPassword)}
        >
          Forgot Password?
        </button>

        {showForgotPassword && (
          <div className="forgot-password-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="forgot-password-input"
            />
            <button
              className="reset-password-button"
              onClick={handleForgotPassword}
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
