import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css"; // Add the CSS file for styling

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("https://brs-2-1lt4.onrender.com/users", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        alert("Signup successful!");
        setError(""); // Clear the error message
        navigate("/buses"); // Navigate to the /buses page
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during signup.");
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
          className="signup-input"
          style={{ color: "black" }} // Inline style for text color
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
          style={{ color: "black" }} // Inline style for text color
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
          style={{ color: "black" }} // Inline style for text color
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="signup-input"
          style={{ color: "black" }} // Inline style for text color
          required
        />
        {error && <p className="error-message">{error}</p>} {/* Display error */}
        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
      <button
        className="back-button"
        onClick={() => navigate("/")} // Navigate to home page
      >
        Back to Home
      </button>
    </div>
  );
};

export default Signup;
