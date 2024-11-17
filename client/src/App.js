import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import BusList from "./components/BusList";
import PassengerDetails from "./components/PassengerDetails";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Router>
        <button onClick={toggleMode}>
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
        <Routes>
          <Route path="/" element={<BusList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/passenger-details" element={<PassengerDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
