import React, { useState } from "react";
import { Joystick } from "react-joystick-component";
import reportForm from "../assets/Problem Report Form.png";

const RobotStatus = ({ battery, serial, velocity, onLogout }) => {
  const [showJoystick, setShowJoystick] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);

  const toggleJoystick = () => setShowJoystick((prev) => !prev);
  const toggleCamera = () => setShowCamera((prev) => !prev);
  const toggleSettings = () => setShowSettings((prev) => !prev);
  const toggleUserMenu = () => setShowUserMenu((prev) => !prev);
  const toggleReportPopup = () => setShowReportPopup((prev) => !prev);

  return (
    <>
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
        <div style={{ width: "120px", height: "100%" }} />

        <div
          className="robot-status-bar"
          style={{ display: "flex", alignItems: "center", gap: "15px", height: "100%" }}
        >
          <div className="robot-status-large" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div>🔋 {battery}%</div>
            <div>🆔 {serial}</div>
            <div>⚡ {velocity} m/s</div>
          </div>

          <div className="robot-status-small" style={{ display: "none", position: "relative" }}>
            <button
              onClick={() => setShowStatusDropdown((prev) => !prev)}
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

          <div style={{ position: "relative" }}>
            <button
              onClick={toggleUserMenu}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "22px",
                cursor: "pointer",
                padding: "6px",
                letterSpacing: "-15px",
              }}
              title="User menu"
            >
              <span role="img" aria-label="user">👤</span>
              <span role="img" aria-label="arrow">🔻</span>
            </button>

            {showUserMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  zIndex: 2000,
                  minWidth: "160px",
                  padding: "8px 0",
                }}
              >
                <button
                  onClick={onLogout}
                  style={{
                    width: "100%",
                    padding: "10px 20px",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  🚪 Logout
                </button>
                <button
                  onClick={toggleReportPopup}
                  style={{
                    width: "100%",
                    padding: "10px 20px",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  📝 Report Problem
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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

      {showJoystick && (
        <div style={{ position: "fixed", bottom: "40px", left: "40px", zIndex: 1000, padding: "20px" }}>
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
              style={{ maxWidth: "50%", height: "auto", margin: "10px 0", borderRadius: "6px" }}
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
    </>
  );
};

export default RobotStatus;