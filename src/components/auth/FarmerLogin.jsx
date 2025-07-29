 import React, { useState } from 'react';
import './FarmerLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FarmerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("farmerUser"));

    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome Farmer 👨‍🌾',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/farmer-dashboard');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: 'Invalid username or password.',
        showCancelButton: true,
        confirmButtonText: 'Go to Admin Panel',
        cancelButtonText: 'Try Again',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/admin-panel');
        }
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Farmer Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
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

          <p>
            <button
              onClick={() => navigate('/admin-panel')}
              className="admin-link-button"
              type="button"
            >
              🔧 Admin Access
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default FarmerLogin;
