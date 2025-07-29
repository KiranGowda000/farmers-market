import React from 'react';
import './AboutUs.css';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1>Welcome to FarmFresh Market</h1>
      <p>Your vibrant hub for fresh, locally-grown produce and handcrafted goods in India. Since 2020, we’ve connected our community with passionate farmers, artisans, and food creators who share a love for quality and sustainability.</p>

      <h2>Our Story</h2>
      <p>Founded by a group of local agricultural enthusiasts, FarmFresh Market began as a small gathering of neighbors and farmers who wanted to revive the tradition of fresh, seasonal eating. Today, we’re proud to host over 50 vendors and serve thousands of families each week.</p>

      <h2>Our Mission & Values</h2>
      <ul>
        <li><strong>Community:</strong> Supporting local growers and small businesses.</li>
        <li><strong>Sustainability:</strong> Promoting eco-friendly farming and packaging.</li>
        <li><strong>Quality:</strong> Offering the freshest, seasonal produce and artisanal goods.</li>
      </ul>

      <h2>Meet the Vendors</h2>
      <p>Behind every stall is a story. Meet Sarah, our organic apple farmer who’s been pesticide-free for 10 years, or José, the baker crafting sourdough with heirloom grains. Our community is filled with dedicated, inspiring individuals making a difference in food quality.</p>

      <h2>Contact Us</h2>
      <p><FaMapMarkerAlt /> Address: 123 Greenfield Lane, Bangalore, India</p>
      <p><FaEnvelope /> Email: support@farmfreshmarket.com</p>

      <div className="social-media-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
        <a href="https://www.twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
      </div>
      <div className="back-home">
  <Link to="/" className="home-button">← Back to Home</Link>
</div>

    </div>
  );
};

export default AboutUs;
