import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated import
import "./BusList.css";
import Navbar from "./Navbar";
import "font-awesome/css/font-awesome.min.css";

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sort, setSort] = useState("");
  const [isNightMode, setIsNightMode] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const navigate = useNavigate(); // Updated hook

  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/buses");
      let filteredBuses = res.data;

      if (source) {
        filteredBuses = filteredBuses.filter((bus) =>
          bus.source.toLowerCase().includes(source.toLowerCase())
        );
      }

      if (destination) {
        filteredBuses = filteredBuses.filter((bus) =>
          bus.destination.toLowerCase().includes(destination.toLowerCase())
        );
      }

      if (sort === "price-asc") {
        filteredBuses.sort((a, b) => a.price - b.price);
      } else if (sort === "price-desc") {
        filteredBuses.sort((a, b) => b.price - a.price);
      }

      setBuses(filteredBuses);
    } catch (err) {
      alert("Failed to fetch buses.");
    }
  };

  useEffect(() => {
    fetchBuses();
  }, [source, destination, sort]);

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
    document.body.classList.toggle("night-mode");
  };

  const handleSelectBus = (bus) => {
    setSelectedBus(bus);
    navigate("/passenger-details"); // Updated navigation
  };

  return (
    <>
      <Navbar />
      <div className={`container ${isNightMode ? "night-mode" : ""}`}>
        <div className="mode-toggle">
          <i
            className={`fas ${isNightMode ? "fa-sun" : "fa-moon"}`}
            onClick={toggleNightMode}
            style={{ fontSize: "32px", color: "#ff6f00", cursor: "pointer" }}
          ></i>
        </div>

        <h1>Bus Reservation</h1>

        <div className="filters">
          <input
            type="text"
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort By</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
          <button onClick={fetchBuses}>Search</button>
        </div>

        <ul className="bus-list">
          {buses.length > 0 ? (
            buses.map((bus) => (
              <li
                key={bus.id}
                className={`bus-item ${isNightMode ? "night-mode" : ""}`}
                onClick={() => handleSelectBus(bus)}
              >
                <div className="bus-details">
                  <div className={`bus-name ${isNightMode ? "night-mode" : ""}`}>
                    {bus.name}
                  </div>
                  <div className="bus-route">
                    {`${bus.source} to ${bus.destination}`}
                  </div>
                </div>
                <div className={`bus-price ${isNightMode ? "night-mode" : ""}`}>
                  ₹{bus.price}
                </div>
              </li>
            ))
          ) : (
            <p className="no-results">No buses available.</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default BusList;
