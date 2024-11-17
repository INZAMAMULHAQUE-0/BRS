import React from 'react';
import './About.css'; // Import the CSS file

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="header-section">
        <h1>About QuickRoutes</h1>
        <p>Your trusted travel partner for safe and fast bus reservations.</p>
      </div>

      <div className="content-section">
        <div className="mission-vision">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>
              At QuickRoutes, our mission is to make travel easier, faster, and more reliable. We strive to provide seamless
              bus reservation services to ensure that every trip is hassle-free, safe, and affordable.
            </p>
          </div>
          <div className="vision">
            <h2>Our Vision</h2>
            <p>
              Our vision is to be the leading provider of bus travel services worldwide, known for our commitment to customer
              satisfaction, innovation, and safety.
            </p>
          </div>
        </div>

        <div className="company-values">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Customer Satisfaction:</strong> We put our customers first in everything we do.</li>
            <li><strong>Innovation:</strong> We are committed to continuous improvement and innovation.</li>
            <li><strong>Safety:</strong> We prioritize safety to ensure a worry-free journey.</li>
            <li><strong>Reliability:</strong> We ensure punctuality and reliability in every service.</li>
          </ul>
        </div>
      </div>

      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 1" />
            <p className="name">John Doe</p>
            <p className="role">CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 2" />
            <p className="name">Jane Smith</p>
            <p className="role">Operations Manager</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 3" />
            <p className="name">Bob Williams</p>
            <p className="role">Customer Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
