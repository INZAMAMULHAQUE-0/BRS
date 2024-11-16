import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          BusReservation
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/buses" className="navbar-link">
              Buses
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
          <Link to="/login" className="navbar-button">
            Login
          </Link>
          <Link to="/signup" className="navbar-button">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
