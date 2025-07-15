import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RobotStatus from '../components/RobotStatus';
import logo from '../assets/NarataiLogo.png'; // import logo

const HomePage = () => {
  const navigate = useNavigate();

  // Sample robot status values
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

  // Optional: Simulate battery dropping over time
  useEffect(() => {
    const interval = setInterval(() => {
      setBattery((prev) => Math.max(0, prev - 1));
    }, 10000); // every 10 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', padding: '40px' }}>
      {/* Logo top-left */}
      <img
        src={logo}
        alt="Naratai Logo"
        style={{ position: 'fixed', top: '40px', left: '40px', width: '120px', height: 'auto' }}
      />

      {/* Robot status top-right */}
      <RobotStatus battery={battery} serial={serial} velocity={velocity} onLogout={handleLogout} />

      {/* Main content */}
      <div style={{ textAlign: 'center', marginTop: '150px', fontFamily: 'Arial, sans-serif' }}>
        <h1>🏠 Welcome to the Robot Control Dashboard</h1>
        <p>Here you can monitor and control your robot.</p>
      </div>
    </div>
  );
};

export default HomePage;
