// pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RobotStatus from '../components/RobotStatus';
import logo from '../assets/NarataiLogo.png';

const HomePage = () => {
  const navigate = useNavigate();

  const [battery, setBattery] = useState(82);
  const [serial, setSerial] = useState('NR-T2024-001');
  const [velocity, setVelocity] = useState(0.8);

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to sign out?\nPlease confirm to proceed with signing out of your session."
    );
    if (confirmed) {
      localStorage.removeItem('loggedIn');
      navigate('/');
    }
  };

  // Protect page with useEffect fallback
  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!loggedIn) {
      navigate('/');
    }
  }, [navigate]);

  // Optional: battery drop simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBattery((prev) => Math.max(0, prev - 1));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', padding: '40px' }}>
      <img
        src={logo}
        alt="Naratai Logo"
        style={{ position: 'fixed', top: '40px', left: '40px', width: '120px' }}
      />
      <RobotStatus battery={battery} serial={serial} velocity={velocity} onLogout={handleLogout} />
      <div style={{ textAlign: 'center', marginTop: '150px', fontFamily: 'Arial, sans-serif' }}>
        <h1>🏠 Welcome to the Robot Control Dashboard</h1>
        <p>Here you can monitor and control your robot.</p>
      </div>
    </div>
  );
};

export default HomePage;
