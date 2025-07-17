import React, { useState, useEffect } from "react";
import RobotStatus from "../components/RobotStatus";
import logo from "../assets/NarataiLogo.png";
import reportForm from "../assets/Problem Report Form.png"; // import your report form image
import USERS from "../data/user";

const HomePage = () => {
  const loggedInUsername = localStorage.getItem("username");
  const currentUser =
    USERS.find((user) => user.username === loggedInUsername) || USERS[0];
  const robots = currentUser.robots || [];

  const [selectedRobotIndex, setSelectedRobotIndex] = useState(0);
  const selectedRobot = robots[selectedRobotIndex] || {
    battery: 0,
    serial: "N/A",
    velocity: 0,
  };
  const [battery, setBattery] = useState(selectedRobot.battery);

  const [selectedTab, setSelectedTab] = useState("Home"); // <-- track tab here

  // New state for report popup
  const [showReportPopup, setShowReportPopup] = useState(false);

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to sign out?\nPlease confirm to proceed with signing out of your session."
    );
    if (confirmed) {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("username");
      window.location.href = "/"; // redirect to login
    }
  };

  const toggleReportPopup = () => {
    setShowReportPopup((prev) => !prev);
  };

  useEffect(() => {
    setBattery(selectedRobot.battery);
    const interval = setInterval(() => {
      setBattery((prev) => Math.max(0, prev - 1));
    }, 10000);
    return () => clearInterval(interval);
  }, [selectedRobotIndex, selectedRobot.battery]);

  const navItems = ["Home", "Dashboard", "All Robot"];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Navigation */}
      <nav
        style={{
          width: "180px",
          background: "#f4f4f4",
          padding: "20px",
          boxSizing: "border-box",
          borderRight: "1px solid #ccc",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <img
            src={logo}
            alt="Naratai Logo"
            style={{
              width: "100px",
              marginBottom: "30px",
              marginTop: "10px",
              display: "block",
              zIndex: 1001,
            }}
          />
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {navItems.map((label) => (
              <li
                key={label}
                onClick={() => setSelectedTab(label)}
                style={{
                  marginBottom: "20px",
                  cursor: "pointer",
                  color: selectedTab === label ? "#007bff" : "#333",
                  fontWeight: selectedTab === label ? "bold" : "normal",
                  userSelect: "none",
                }}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Report Problem button above Sign Out */}
        <div>
          <button
            onClick={toggleReportPopup}
            style={{
              cursor: "pointer",
              backgroundColor: "#0275d8",
              border: "none",
              padding: "8px 16px",
              color: "white",
              borderRadius: "4px",
              width: "100%",
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
            📝 Report Problem
          </button>

          <button
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              backgroundColor: "#e74c3c",
              border: "none",
              padding: "8px 16px",
              color: "white",
              borderRadius: "4px",
              width: "100%",
              textAlign: "left",
            }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main
        style={{
          marginLeft: "180px",
          flexGrow: 1,
          padding: "40px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Show RobotStatus on all pages */}
        <RobotStatus
          battery={battery}
          serial={selectedRobot.serial}
          velocity={selectedRobot.velocity}
          robots={robots}
          onRobotSelect={(robot) => {
            const index = robots.findIndex((r) => r.serial === robot.serial);
            if (index !== -1) {
              setSelectedRobotIndex(index);
              setBattery(robot.battery);
            }
          }}
          onLogout={handleLogout}
        />

        {/* Main tab content */}
        {selectedTab === "Home" && (
          <div
            style={{
              textAlign: "center",
              marginTop: "180px",
              fontFamily: "Arial, sans-serif",
              padding: "0 20px",
            }}
          >
            <h1>🏠 Welcome to the Robot Control Dashboard</h1>
            <p>Here you can monitor and control your robot.</p>
          </div>
        )}

        {selectedTab === "Dashboard" && (
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              padding: "20px",
            }}
          >
            <h1>📊 Dashboard</h1>
            <p>This is the dashboard content area.</p>
          </div>
        )}

        {selectedTab === "All Robot" && (
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              padding: "20px",
            }}
          >
            <h1>🤖 All Robots</h1>
            <p>This is the all robots content area.</p>
          </div>
        )}
      </main>

      {/* Report Problem Popup */}
      {showReportPopup && (
        <div
          onClick={toggleReportPopup}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 3000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px",
              position: "relative",
              maxWidth: "90%",
              maxHeight: "90%",
              overflow: "auto",
              textAlign: "center",
            }}
          >
            <button
              onClick={toggleReportPopup}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ❌
            </button>
            <h3>📋 Problem Report Form</h3>
            <img
              src={reportForm}
              alt="Report Form"
              style={{
                maxWidth: "50%",
                height: "auto",
                margin: "10px 0",
                borderRadius: "6px",
              }}
            />
            <p>
              <a
                href="https://narataitech.sg.larksuite.com/share/base/form/shrlg39q4zyiy4VDq3EEOH2hZyg"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0275d8", fontWeight: "bold" }}
              >
                🔗 Complete the report form/กรอกแบบฟอร์มรายงาน
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
