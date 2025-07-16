import React, { useState } from "react";
import { Joystick } from "react-joystick-component";

const RobotStatus = ({ battery, serial, velocity, onLogout }) => {
  const [showJoystick, setShowJoystick] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const toggleJoystick = () => setShowJoystick((prev) => !prev);
  const toggleCamera = () => setShowCamera((prev) => !prev);
  const toggleSettings = () => setShowSettings((prev) => !prev);
  const toggleStatusDropdown = () => setShowStatusDropdown((prev) => !prev);

  return (
    <>
      {/* Full Width Top Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 40px",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          height: "70px",
          boxSizing: "border-box",
        }}
      >
        {/* Left side placeholder for logo */}
        <div
          style={{
            width: "120px", // match your logo width
            height: "100%",
          }}
        >
          {/* This div just reserves space for the logo */}
        </div>

        {/* Right side: Robot Status and Controls */}
        <div
          className="robot-status-bar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "15px",
            height: "100%",
          }}
        >
          {/* Large screen robot status */}
          <div
            className="robot-status-large"
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            <div>🔋 {battery}%</div>
            <div>🆔 {serial}</div>
            <div>⚡ {velocity} m/s</div>
          </div>

          {/* Small screen dropdown */}
          <div
            className="robot-status-small"
            style={{ display: "none", position: "relative" }}
          >
            <button
              onClick={toggleStatusDropdown}
              style={{
                padding: "6px 10px",
                backgroundColor: "transparent",
                border: "1px solid #ccc",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              📊 {showStatusDropdown ? "▲" : "▼"}
            </button>
            {showStatusDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0 0 8px rgba(0,0,0,0.15)",
                  marginTop: "5px",
                  minWidth: "160px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  zIndex: 1100,
                }}
              >
                <div>🔋 Battery: {battery}%</div>
                <div>🆔 Serial: {serial}</div>
                <div>⚡ Velocity: {velocity} m/s</div>
              </div>
            )}
          </div>

          {/* Control buttons */}
          <button
            onClick={toggleJoystick}
            style={{
              padding: "6px 10px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
              color: showJoystick ? "#5cb85c" : "#0275d8",
            }}
            title={showJoystick ? "Hide joystick" : "Show joystick"}
          >
            {showJoystick ? "❌" : "🎮"}
          </button>

          <button
            onClick={toggleCamera}
            style={{
              padding: "6px 10px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
              color: showCamera ? "#f0ad4e" : "#5bc0de",
            }}
            title={showCamera ? "Hide camera" : "Show camera"}
          >
            {showCamera ? "❌" : "📷"}
          </button>

          <button
            onClick={toggleSettings}
            style={{
              padding: "6px 10px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
              color: showSettings ? "#6f42c1" : "#6610f2",
            }}
            title={showSettings ? "Hide settings" : "Show settings"}
          >
            {showSettings ? "❌" : "⚙️"}
          </button>

          <button
            onClick={onLogout}
            style={{
              padding: "6px 12px",
              backgroundColor: "#d9534f",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>
        {`
          @media (min-width: 768px) {
            .robot-status-large { display: flex !important; }
            .robot-status-small { display: none !important; }
          }
          @media (max-width: 767px) {
            .robot-status-large { display: none !important; }
            .robot-status-small { display: block !important; }
          }
        `}
      </style>

      {/* Joystick Panel */}
      {showJoystick && (
        <div
          style={{
            position: "fixed",
            bottom: "40px",
            left: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            userSelect: "none",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <Joystick
            size={120}
            stickSize={60}
            baseColor="#ccc"
            stickColor="#232532ff"
            throttle={100}
            move={() => {}}
            stop={() => {}}
          />
        </div>
      )}

      {/* Camera Panel */}
      {showCamera && (
        <div
          style={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
            width: "300px",
            height: "220px",
            backgroundColor: "#000",
            borderRadius: "16px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontWeight: "bold",
            zIndex: 1000,
          }}
        >
          📷 Camera Panel
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            border: "2px solid #6610f2",
            borderRadius: "12px",
            padding: "30px",
            zIndex: 1001,
            minWidth: "300px",
            boxShadow: "0 0 12px rgba(0, 0, 0, 0.25)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h3 style={{ marginTop: 0 }}>⚙️ Robot Settings</h3>
          <p>More controls can go here...</p>
          <ul>
            <li>Adjust speed</li>
            <li>Mode select</li>
            <li>Camera resolution</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default RobotStatus;
