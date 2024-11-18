import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./PassengerDetails.css";

const PassengerDetails = () => {
  const location = useLocation();
  const selectedBus = location.state?.selectedBus;
  const navigate = useNavigate(); // Hook to navigate to the payment page

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);

  if (!selectedBus) {
    return <p>No bus selected. Please go back and select a bus.</p>;
  }

  const calculateTotalFare = () => selectedSeats.length * selectedBus.price;

  const toggleSeatSelection = (seatNo) => {
    let updatedSeats;

    // Toggle seat selection
    if (selectedSeats.includes(seatNo)) {
      updatedSeats = selectedSeats.filter((seat) => seat !== seatNo); // Remove seat
    } else {
      updatedSeats = [...selectedSeats, seatNo]; // Add seat
    }

    setSelectedSeats(updatedSeats);

    // Update passengers to match seat selection
    const updatedPassengers = updatedSeats.map((seat) => {
      const existingPassenger = passengers.find((p) => p.seat === seat) || {};
      return {
        seat,
        name: existingPassenger.name || "",
        email: existingPassenger.email || "",
        phone: existingPassenger.phone || "",
        age: existingPassenger.age || "",
        gender: existingPassenger.gender || "",
        address: existingPassenger.address || "",
      };
    });

    setPassengers(updatedPassengers);
  };

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index][name] = value;
    setPassengers(updatedPassengers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      passengers.some(
        (p) =>
          !p.name ||
          !p.email ||
          !p.phone ||
          !p.age ||
          !p.gender ||
          !p.address ||
          !p.seat
      )
    ) {
      alert("Please fill in all passenger details and assign seats.");
      return;
    }
    navigate("/paymentgateway"); // Navigate to the payment gateway page
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Bus Details
    doc.setFontSize(16);
    doc.text("Bus Reservation Ticket", 10, 10);
    doc.setFontSize(12);
    doc.text(`Bus Name: ${selectedBus.name}`, 10, 20);
    doc.text(`Route: ${selectedBus.source} to ${selectedBus.destination}`, 10, 30);
    doc.text(`Price (per passenger): ₹${selectedBus.price}`, 10, 40);
    doc.text(`Total Fare: ₹${calculateTotalFare()}`, 10, 50);
    doc.text(`Selected Seats: ${selectedSeats.join(", ")}`, 10, 60);

    // Add Passenger Details
    let yOffset = 70;
    passengers.forEach((passenger, index) => {
      doc.text(`Passenger ${index + 1}`, 10, yOffset);
      doc.text(`Name: ${passenger.name}`, 10, yOffset + 10);
      doc.text(`Email: ${passenger.email}`, 10, yOffset + 20);
      doc.text(`Phone: ${passenger.phone}`, 10, yOffset + 30);
      doc.text(`Age: ${passenger.age}`, 10, yOffset + 40);
      doc.text(`Gender: ${passenger.gender}`, 10, yOffset + 50);
      doc.text(`Address: ${passenger.address}`, 10, yOffset + 60);
      doc.text(`Seat: ${passenger.seat}`, 10, yOffset + 70);
      yOffset += 80;
    });

    // Save the PDF
    doc.save("bus-reservation-ticket.pdf");
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Select Your Seats</h3>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 40 }).map((_, index) => {
              const seatNo = index + 1;
              const isSelected = selectedSeats.includes(seatNo);

              return (
                <button
                  key={seatNo}
                  className={`seat-button ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleSeatSelection(seatNo)}
                >
                  {seatNo}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Selected Seats</h3>
          <div className="flex flex-col items-start space-y-2">
            {selectedSeats.length > 0 ? (
              <p>Seats: {selectedSeats.join(", ")}</p>
            ) : (
              <p>No seats selected</p>
            )}
          </div>
        </div>
      </div>

      <div className="passenger-details-container">
        <h2>Passenger Details</h2>

        <div>
          <p><strong>Bus Name:</strong> {selectedBus.name}</p>
          <p><strong>Route:</strong> {selectedBus.source} to {selectedBus.destination}</p>
          <p><strong>Price (per passenger):</strong> ₹{selectedBus.price}</p>
          <p><strong>Total Fare:</strong> ₹{calculateTotalFare()}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {passengers.map((passenger, index) => (
            <div key={index} className="passenger-form">
              <h3>Passenger {index + 1} (Seat {passenger.seat})</h3>
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
              <textarea
                name="address"
                placeholder="Address"
                value={passenger.address}
                onChange={(e) => handlePassengerChange(index, e)}
              />
            </div>
          ))}
          <button type="submit" className="submit-button bg-blue-600 text-white px-4 py-2 rounded-lg">
            Book
          </button>
        </form>

        <button
          onClick={generatePDF}
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Download Ticket (PDF)
        </button>
      </div>
    </>
  );
};

export default PassengerDetails;
