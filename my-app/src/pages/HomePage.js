import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RobotStatus from "../components/RobotStatus";
import logo from "../assets/NarataiLogo.png";
import USERS from "../data/user"; // your user.js

const HomePage = () => {
  const navigate = useNavigate();

  // Assume loggedInUsername is saved in localStorage on login
  const loggedInUsername = localStorage.getItem("username");

  // Find the user object
  const currentUser =
    USERS.find((user) => user.username === loggedInUsername) || USERS[0];

  // Initialize state with currentUser's robot data
  const [battery, setBattery] = useState(currentUser.robot.battery);
  // const [serial, setSerial] = useState(currentUser.robot.serial);
  // const [velocity, setVelocity] = useState(currentUser.robot.velocity);
  const serial = currentUser.robot.serial;
  const velocity = currentUser.robot.velocity;

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to sign out?\nPlease confirm to proceed with signing out of your session."
    );
    if (confirmed) {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("username"); // Also clear username on logout
      navigate("/");
    }
  };

  // Protect page with useEffect fallback
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) {
      navigate("/");
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
    <div style={{ position: "relative", minHeight: "100vh", padding: "40px" }}>
      <img
        src={logo}
        alt="Naratai Logo"
        style={{
          position: "fixed",
          top: "20px",
          left: "10px",
          width: "100px",
          zIndex: 1001,
        }}
      />
      <RobotStatus
        battery={battery}
        serial={serial}
        velocity={velocity}
        onLogout={handleLogout}
      />
      <div
        style={{
          textAlign: "center",
          marginTop: "180px", // increase if needed
          fontFamily: "Arial, sans-serif",
          padding: "0 20px", // some horizontal padding for small screens
        }}
      >
        <h1>🏠 Welcome to the Robot Control Dashboard</h1>
        <p>Here you can monitor and control your robot.</p>
      </div>
    </div>
  );
};

export default HomePage;
