import React, { useState } from "react";
import axios from "axios";
import "./Signup.css"; // Add the CSS file for styling

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/users", { username, email, password });
      alert("Signup successful!");
      setError(""); // Clear the error message
    } catch (err) {
      setError("An error occurred during signup.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-header">Create an Account</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>} {/* Display error */}
        <button type="submit" className="signup-button">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
