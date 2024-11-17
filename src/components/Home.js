import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Custom CSS file for additional styles

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleBrowseBuses = () => {
    navigate("/buses");
  };

  return (
    <div className="home-container">
      <div className="overlay">
        <div className="content">
          <h1 className="main-title">Welcome to TraveLEasE</h1>
          <p className="sub-title">Find and book buses easily and conveniently for your next journey.</p>

          <div className="button-group">
            <button onClick={handleLogin} className="btn login-btn">
              Login
            </button>
            <button onClick={handleSignup} className="btn signup-btn">
              Signup
            </button>
          </div>

          <button onClick={handleBrowseBuses} className="btn browse-btn">
            Browse Buses Available
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
