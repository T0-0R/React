import React, { useState } from 'react';
import { Joystick } from 'react-joystick-component';

const RobotStatus = ({ battery, serial, velocity, onLogout }) => {
  const [showJoystick, setShowJoystick] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [joystickData, setJoystickData] = useState({ x: 0, y: 0 });

  const toggleJoystick = () => {
    setShowJoystick((prev) => !prev);
  };

  const toggleCamera = () => {
    setShowCamera((prev) => !prev);
  };

  const handleMove = (stickData) => {
    setJoystickData({ x: stickData.x, y: stickData.y });
  };

  const handleStop = () => {
    setJoystickData({ x: 0, y: 0 });
  };

  return (
    <>
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '20px',
          position: 'fixed',
          top: '20px',
          right: '40px',
          backgroundColor: '#f5f5f5',
          padding: '10px 20px',
          borderRadius: '8px',
          boxShadow: '0 0 8px rgba(0,0,0,0.1)',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          zIndex: 1000,
        }}
      >
        {/* Joystick Toggle Button */}
        <button
          onClick={toggleJoystick}
          style={{
            padding: '6px 10px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            color: showJoystick ? '#5cb85c' : '#0275d8',
          }}
          title={showJoystick ? 'Hide joystick' : 'Show joystick'}
        >
          {showJoystick ? '❌' : '🎮'}
        </button>

        {/* Camera Toggle Button */}
        <button
          onClick={toggleCamera}
          style={{
            padding: '6px 10px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            color: showCamera ? '#f0ad4e' : '#5bc0de',
          }}
          title={showCamera ? 'Hide camera' : 'Show camera'}
        >
          {showCamera ? '❌' : '📷'}
        </button>

        <div>🔋 Battery: {battery}%</div>
        <div>🆔 Serial: {serial}</div>
        <div>⚡ Velocity: {velocity} m/s</div>

        <button
          onClick={onLogout}
          style={{
            padding: '6px 12px',
            backgroundColor: '#d9534f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Sign Out
        </button>
      </div>

      {/* Joystick Panel (Bottom Left) */}
      {showJoystick && (
        <div
          style={{
            position: 'fixed',
            bottom: '40px',
            left: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            userSelect: 'none',
            zIndex: 1000,
            padding: '20px',
            backgroundColor: '#eee',
            borderRadius: '16px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          }}
        >
          <Joystick
            size={120}
            stickSize={60}
            baseColor="#ccc"
            stickColor="#232532ff"
            throttle={100}
            move={handleMove}
            stop={handleStop}
          />
        </div>
      )}

      {/* Camera Panel (Bottom Right) */}
      {showCamera && (
        <div
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            width: '300px',
            height: '220px',
            backgroundColor: '#000',
            borderRadius: '16px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: 'bold',
            zIndex: 1000,
          }}
        >
          📷 Camera Panel
          {/* Replace this with <video> or webcam stream later */}
        </div>
      )}
    </>
  );
};

export default RobotStatus;
