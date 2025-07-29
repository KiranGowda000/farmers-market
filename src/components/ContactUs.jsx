import React, { useState } from 'react';
import './ContactUs.css';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message sent:', formData);
    alert("Message sent successfully!");
    setFormData({ fullName: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <div className="contact-details">
        <p><strong>Address:</strong> 123 Fresh Lane, Green City, IN 560001</p>
        <p><strong>Phone:</strong> +91-8296030802</p>
        <p><strong>Email:</strong> support@farmfreshmarket.com</p>
      </div>

      <div className="contact-form">
        <h2>Send us a message</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Type your message..."
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div>
      <Link to="/" className="back-home-button">Back to Home</Link>

      </div>
      

    </div>
  );
};

export default ContactUs;
