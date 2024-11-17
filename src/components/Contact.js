import React, { useState } from "react";
import axios from "axios";
import "./Contact.css"; // Importing CSS for styling

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateInputs = () => {
    if (!name || !email || !message) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(""); // Clear previous errors
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      // Replace with the API endpoint for handling the contact form submission
      await axios.post("https://brs-2-1lt4.onrender.com/users", {
        name,
        email,
        message,
      });
      setSuccess("Your message has been sent successfully.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError("There was an error sending your message.");
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;
