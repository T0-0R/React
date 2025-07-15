// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import logo from './assets/NarataiLogo.png';

// Hardcoded users
const USERS = [{ username: 'aadmin', password: '12345678' }];

// Login Page
function LoginPage() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const match = USERS.find((user) => user.username === username && user.password === password);
    if (match) {
      localStorage.setItem('loggedIn', 'true');
      navigate('/home');
    } else {
      alert('Invalid username or password');
      setPassword('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Naratai Logo" />
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: '10px', margin: '5px', width: '250px' }}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '10px', margin: '5px', width: '250px' }}
            autoComplete="current-password"
          />
          <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>Login</button>
        </form>
      </header>
    </div>
  );
}

// Protected Route
function ProtectedRoute({ children }) {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  return loggedIn ? children : <Navigate to="/" />;
}

// App Component
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
