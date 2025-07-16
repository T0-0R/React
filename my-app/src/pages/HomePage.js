import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RobotStatus from '../components/RobotStatus';
import logo from '../assets/NarataiLogo.png';

const HomePage = () => {
  const navigate = useNavigate();

  const [robot, setRobot] = useState({ battery: 0, serial: '', velocity: 0 });

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to sign out?\nPlease confirm to proceed with signing out of your session."
    );
    if (confirmed) {
      localStorage.clear();  // clear all saved data on logout
      navigate('/');
    }
  };

  // Load robot data once on component mount
  useEffect(() => {
    const savedRobot = localStorage.getItem('robot');
    if (savedRobot) {
      setRobot(JSON.parse(savedRobot));
    } else {
      // If no robot data, redirect to login page
      navigate('/');
    }
  }, [navigate]);

  // Battery drop simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRobot(prev => ({
        ...prev,
        battery: Math.max(0, prev.battery - 1),
      }));
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
      <RobotStatus
        battery={robot.battery}
        serial={robot.serial}
        velocity={robot.velocity}
        onLogout={handleLogout}
      />
      <div style={{ textAlign: 'center', marginTop: '150px', fontFamily: 'Arial, sans-serif' }}>
        <h1>🏠 Welcome to the Robot Control Dashboard</h1>
        <p>Here you can monitor and control your robot.</p>
      </div>
    </div>
  );
};

export default HomePage;
