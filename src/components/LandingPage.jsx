import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { FaTractor, FaShoppingBasket, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';



const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">FarmFresh Market</div>
        <ul className="nav-links">
          <li><a href="#">HOME</a></li>
          <li><Link to="/about-us">ABOUT US</Link></li>
          <li><Link to = "/contact-us">CONTACT US</Link></li>
          <li><Link to = "/help">HELP</Link></li>
          <li><Link to = "/news">NEWS</Link></li>
          


      
        </ul>
      </nav>

      <div className="overlay">
        <h1>Welcome to FarmFresh Market</h1>
        <p>Buy Fresh Crops Directly from Farmers!</p>

        <div className="login-options">
          <Link to="/farmer-login" className="login-button">
            <FaTractor className="icon" />
            Farmer Login
          </Link>
          <Link to="/consumer-login" className="login-button">
            <FaShoppingBasket className="icon" />
            Consumer Login
          </Link>
        </div>

         
      </div>

      {/* Footer */} 
       


    </div>
  );
};

export default LandingPage;
