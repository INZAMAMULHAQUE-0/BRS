import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Importing the CSS file

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      const res = await axios.get("http://localhost:3000/users", {
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

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>} {/* Display error */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
