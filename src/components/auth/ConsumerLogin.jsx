 // src/pages/ConsumerLogin.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ConsumerLogin.css';

const ConsumerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("consumerUser"));

    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      localStorage.setItem("loggedInConsumer", JSON.stringify(storedUser)); // To access later
      alert("Login Successful!");
      navigate('/consumer-dashboard');
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Consumer Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          <p>Don't have an account? <Link to="/consumer-register">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default ConsumerLogin;
