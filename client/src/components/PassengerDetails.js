// PassengerDetails.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PassengerDetails.css";

const PassengerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedBus = location.state?.selectedBus;

  const [passengers, setPassengers] = useState([{ name: "", email: "", phone: "" }]);

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: "", email: "", phone: "" }]);
  };

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index][name] = value;
    setPassengers(updatedPassengers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const invalidPassenger = passengers.some(
      (passenger) => !passenger.name || !passenger.email || !passenger.phone
    );
    if (invalidPassenger) {
      alert("Please fill in all passenger details.");
      return;
    }

    try {
      for (const passenger of passengers) {
        const passengerData = { ...passenger, bus: selectedBus };
        await axios.post("http://localhost:3000/passengers", passengerData);
      }
      navigate("/confirmation");
    } catch (error) {
      console.error("Error booking passengers:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!selectedBus) {
    return <p>No bus selected. Please go back and select a bus.</p>;
  }

  return (
    <div className="passenger-details-container">
      <h2>Passenger Details</h2>
      <form onSubmit={handleSubmit}>
        {passengers.map((passenger, index) => (
          <div key={index} className="passenger-form">
            <h3>Passenger {index + 1}</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={passenger.name}
              onChange={(e) => handlePassengerChange(index, e)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={passenger.email}
              onChange={(e) => handlePassengerChange(index, e)}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={passenger.phone}
              onChange={(e) => handlePassengerChange(index, e)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddPassenger}>
          Add Passenger
        </button>
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default PassengerDetails;
