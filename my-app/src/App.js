import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import logo from './assets/NarataiLogo.png';

import './App.css';

import HomePage from './pages/HomePage'; // Home Page

// Hardcoded user credentials
const USERS = [
  { username: 'aadmin', password: '12345678' }
];

// Login Page Component
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userMatch = USERS.find(
      (user) => user.username === username && user.password === password
    );

    if (userMatch) {
      localStorage.setItem('loggedIn', 'true');
      navigate('/home');
    } else {
      alert('Invalid username or password');
      setPassword(''); // Clear password field on fail
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Naratai Logo" />
        <h2>Login</h2>
        <form
          onSubmit={handleLogin}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          autoComplete="off"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: '10px', margin: '5px', width: '250px' }}
            aria-label="username"
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '10px', margin: '5px', width: '250px' }}
            aria-label="password"
            autoComplete="current-password"
          />
          <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
            Login
          </button>
        </form>
      </header>
    </div>
  );
}

// Protected Route Wrapper Component
function ProtectedRoute({ children }) {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  return loggedIn ? children : <Navigate to="/" />;
}

// Main App Component with Routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
