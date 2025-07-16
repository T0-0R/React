import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/NarataiLogo.png"; // <-- updated relative path
import USERS from "../data/user.js"; // go up one folder, into data

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear(); // clear any old session data on page load
    if (localStorage.getItem("loggedIn") === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", user.username);
      localStorage.setItem("robot", JSON.stringify(user.robot));
      setTimeout(() => navigate("/home"), 100);
    } else {
      alert("Invalid username or password");
      setPassword("");
    }
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <header className="App-header">
        <img
          src={logo}
          alt="Naratai Logo"
          style={{ width: "400px", marginBottom: "20px" }}
        />
        <h2>Login</h2>
        <form
          onSubmit={handleLogin}
          style={{ display: "inline-block", textAlign: "left" }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: "10px", margin: "5px 0", width: "250px" }}
            autoComplete="username"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "10px", margin: "5px 0", width: "250px" }}
            autoComplete="current-password"
          />
          <br />
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button
              type="submit"
              style={{ padding: "10px 20px", width: "50%" }}
            >
              Login
            </button>
          </div>
        </form>
      </header>
    </div>
  );
};

export default LoginPage;
