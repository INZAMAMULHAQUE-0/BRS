import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import BusList from "./components/BusList";
import Home from "./components/Home";
import PassengerDetails from "./components/PassengerDetails";
import Contact from "./components/Contact";

import About from "./components/About";
import PaymentGateway from "./components/PaymentGateway";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Router>
        
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/buses" element={<BusList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/passenger-details" element={<PassengerDetails />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/About" element={<About />} />
          <Route path="/paymentgateway" element={<PaymentGateway/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
