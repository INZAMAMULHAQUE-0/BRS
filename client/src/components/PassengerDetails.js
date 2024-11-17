import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./PassengerDetails.css";

const PassengerDetails = () => {
  const location = useLocation();
  const selectedBus = location.state?.selectedBus;

  const [passengers, setPassengers] = useState([{ name: "", email: "", phone: "", age: "", gender: "", address: "" }]);

  if (!selectedBus) {
    return <p>No bus selected. Please go back and select a bus.</p>;
  }

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: "", email: "", phone: "", age: "", gender: "", address: "" }]);
  };

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index][name] = value;
    setPassengers(updatedPassengers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passengers.some((p) => !p.name || !p.email || !p.phone || !p.age || !p.gender || !p.address)) {
      alert("Please fill in all passenger details.");
      return;
    }
    generatePDF();
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Bus Details
    doc.setFontSize(16);
    doc.text("Bus Reservation Details", 10, 10);
    doc.setFontSize(12);
    doc.text(`Bus Name: ${selectedBus.name}`, 10, 20);
    doc.text(`Route: ${selectedBus.source} to ${selectedBus.destination}`, 10, 30);
    doc.text(`Price: ₹${selectedBus.price}`, 10, 40);

    // Add Passenger Details
    let yOffset = 50;
    passengers.forEach((passenger, index) => {
      doc.text(`Passenger ${index + 1}`, 10, yOffset);
      doc.text(`Name: ${passenger.name}`, 10, yOffset + 10);
      doc.text(`Email: ${passenger.email}`, 10, yOffset + 20);
      doc.text(`Phone: ${passenger.phone}`, 10, yOffset + 30);
      doc.text(`Age: ${passenger.age}`, 10, yOffset + 40);
      doc.text(`Gender: ${passenger.gender}`, 10, yOffset + 50);
      doc.text(`Address: ${passenger.address}`, 10, yOffset + 60);
      yOffset += 70;
    });

    // Save the PDF
    doc.save("bus-reservation-details.pdf");
  };

  return (
    <div className="passenger-details-container">
      <h2>Passenger Details</h2>

      <div>
        <p><strong>Bus Name:</strong> {selectedBus.name}</p>
        <p><strong>Route:</strong> {selectedBus.source} to {selectedBus.destination}</p>
        <p><strong>Price:</strong> ₹{selectedBus.price}</p>
      </div>

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
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={passenger.age}
              onChange={(e) => handlePassengerChange(index, e)}
            />
            <select
              name="gender"
              value={passenger.gender}
              onChange={(e) => handlePassengerChange(index, e)}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              id="address"
              placeholder="Address"
              value={passenger.address}
              onChange={(e) => handlePassengerChange(index, e)}
            />
          </div>
        ))}

        <div className="buttons-container">
          <button type="button" onClick={handleAddPassenger} className="add-passenger-button">
            Add Passenger
          </button>
          <button type="submit" className="submit-button">Book</button>
        </div>
      </form>
    </div>
  );
};

export default PassengerDetails;
