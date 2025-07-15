// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/NarataiLogo.png'; // Adjust path if your logo is elsewhere

function HomePage() {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('loggedIn'); // Remove the 'loggedIn' flag from localStorage
        navigate('/', { replace: true }); // Redirect to the login page and replace history entry
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="Naratai Logo" />
                <h2>Welcome to Naratai Home Page!</h2>
                <p>You have successfully logged in.</p>
                <button onClick={handleLogout} style={{ padding: '10px 20px', marginTop: '20px' }}>Logout</button>
            </header>
        </div>
    );
}

export default HomePage;