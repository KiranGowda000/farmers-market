 // src/pages/FarmerRegister.jsx
import React, { useState } from 'react';
import './FarmerRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa';

const FarmerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    //Save user credentials to localStorage
    const farmerUser = {
      username: formData.username,
      password: formData.password,
      name: formData.name,
      email: formData.email,
      address: formData.address
    };

    localStorage.setItem("farmerUser", JSON.stringify(farmerUser));
    alert('Registration successful!');
    navigate('/farmer-login');
  };

  return (
    <div className="register-container">
      <h2>Farmer Sign Up</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Full Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Address:</label>
        <textarea name="address" value={formData.address} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

        <button type="submit">Sign Up</button>

        <p>Already have an account? <Link to="/farmer-login">Sign In</Link></p>

        <div className="social-icons">
          <FaFacebook className="icon" />
          <FaGoogle className="icon" />
          <FaLinkedin className="icon" />
        </div>
      </form>
    </div>
  );
};

export default FarmerRegister;
