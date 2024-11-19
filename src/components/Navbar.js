import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./Usercontext.js";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useContext(UserContext); // Access user from context

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          {/* Logo */}
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="navbar-link">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="navbar-link">
              Contact
            </Link>
          </li>
        </ul>
        <div className="navbar-auth">
          {user ? (
            <div className="navbar-user">
              <span className="user-icon">👤</span>
              <span className="user-name">{user.username}</span>
            </div>
          ) : (
            <>
              <Link to="/login" className="navbar-button">
                Login
              </Link>
              <Link to="/signup" className="navbar-button">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
