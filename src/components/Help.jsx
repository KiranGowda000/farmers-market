// src/pages/Help.jsx
import React from 'react';
import './Help.css';
import { Link } from 'react-router-dom';

const Help = () => {
  return (
    <div className="help-container">
      <h1>Help & FAQs</h1>
      <p>Need help using FarmFresh Market? Here are some frequently asked questions and answers.</p>

      <div className="faq-section">
        <h3>1. How do I register as a farmer?</h3>
        <p>You can register by clicking the "Farmer Login" button on the homepage and signing up.</p>

        <h3>2. How can I buy crops?</h3>
        <p>Click on "Consumer Login" to sign in as a buyer and explore available crops.</p>

        <h3>3. How do I contact support?</h3>
        <p>You can reach us via email at support@farmfreshmarket.com or call +91-8296030802.</p>

        <h3>4. How often is inventory updated?</h3>
        <p>Farmers update their crop availability in real time, so you always see the latest info.</p>
      </div>

      <Link to="/" className="back-home-button">Back to Home</Link>
    </div>
  );
};

export default Help;
