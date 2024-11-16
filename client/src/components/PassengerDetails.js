import { useState,useNavigate } from "react";
import axios from "axios";
const PassengerDetails = ({ selectedBus = {} }) => {
    const [passengerName, setPassengerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [numPassengers, setNumPassengers] = useState(1); // State to handle number of passengers
    const [passengers, setPassengers] = useState([{}]); // Store passengers details
    const navigate = useNavigate(); // Updated hook
  
    // Handle change in the number of passengers
    const handleNumPassengersChange = (e) => {
      const num = e.target.value;
      setNumPassengers(num);
      setPassengers(
        Array.from({ length: num }, (_, i) => ({ name: "", email: "", phone: "" }))
      );
    };
  
    // Handle individual passenger field change
    const handlePassengerChange = (index, e) => {
      const { name, value } = e.target;
      const newPassengers = [...passengers];
      newPassengers[index][name] = value;
      setPassengers(newPassengers);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validate all passengers' fields
      const invalidPassenger = passengers.some(
        (passenger) => !passenger.name || !passenger.email || !passenger.phone
      );
  
      if (invalidPassenger) {
        alert("Please fill in all fields.");
        return;
      }
  
      try {
        // Send passenger details to the mock API (json-server)
        for (const passenger of passengers) {
          const passengerData = {
            ...passenger,
            bus: selectedBus,
          };
  
          await axios.post("http://localhost:3000/passengers", passengerData);
        }
  
        // Navigate to the confirmation page
        navigate("/confirmation"); // Redirect after successful booking
      } catch (error) {
        console.error("Error while saving passenger data:", error);
        alert("An error occurred. Please try again.");
      }
    };
  
    return (
      <div className="passenger-details-container">
        <h2>Passenger Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Number of Passengers:</label>
            <input
              type="number"
              min="1"
              value={numPassengers}
              onChange={handleNumPassengersChange}
            />
          </div>
  
          {passengers.map((_, index) => (
            <div key={index} className="passenger-form">
              <h3>Passenger {index + 1}</h3>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={passengers[index].name}
                  onChange={(e) => handlePassengerChange(index, e)}
                  placeholder="Enter passenger name"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={passengers[index].email}
                  onChange={(e) => handlePassengerChange(index, e)}
                  placeholder="Enter passenger email"
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={passengers[index].phone}
                  onChange={(e) => handlePassengerChange(index, e)}
                  placeholder="Enter passenger phone number"
                />
              </div>
            </div>
          ))}
  
          <button type="submit" className="submit-button">Book Bus</button>
        </form>
  
        <div className="bus-summary">
          <h3>Selected Bus</h3>
          <p>{selectedBus?.name || "No bus selected"}</p>
          <p>{selectedBus?.source} to {selectedBus?.destination}</p>
          <p>₹{selectedBus?.price}</p>
        </div>
      </div>
    );
  };
  
  export default PassengerDetails;
  