 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const [accessCode, setAccessCode] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleAccess = () => {
    if (accessCode === 'admin123') {
      setAuthorized(true);
    } else {
      alert('❌ Invalid admin access code!');
    }
  };

  const handleSave = () => {
    if (!username || !password) return alert("⚠️ Fill all fields!");
    localStorage.setItem('farmerUser', JSON.stringify({ username, password }));
    alert('✅ Farmer credentials updated!');
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    setAuthorized(false);
    setAccessCode('');
    navigate('/farmer-login'); // Redirect to Farmer Login
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>🛠️ Admin Panel</h2>
        {!authorized ? (
          <>
            <p>Enter Admin Access Code:</p>
            <input
              type="password"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Access Code"
              className="admin-input"
            />
            <button onClick={handleAccess} className="admin-btn">Unlock</button>
          </>
        ) : (
          <>
            <label>👨‍🌾 Farmer Username</label>
            <input
              type="text"
              className="admin-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter new username"
            />
            <label>🔑 Farmer Password</label>
            <div className="password-container">
              <input
                type={showPass ? 'text' : 'password'}
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <button type="button" className="toggle-btn" onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
            <button onClick={handleSave} className="admin-btn">Save</button>
            <button onClick={handleLogout} className="admin-btn logout-btn">Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
