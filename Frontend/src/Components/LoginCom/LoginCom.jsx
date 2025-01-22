import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginCom.css";

const LoginCom = () => {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: formData.userId,
          Password: formData.password,
        }),
      });

      const message = await response.text();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true"); // Store login status
        if (message === "Welcome") {
          navigate("/homepage"); // Navigate to homepage on successful login
        }
      } else {
        alert(message); // Error message
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <div className="logincom-page">
      <div className="logincom-bubbles">
        <div className="logincom-bubble"></div>
        <div className="logincom-bubble"></div>
        <div className="logincom-bubble"></div>
        <div className="logincom-bubble"></div>
        <div className="logincom-bubble"></div>
      </div>
      <div className="logincom-container">
        <h2 className="logincom-heading">Login</h2>
        <form className="logincom-form" onSubmit={handleLogin}>
          <div className="logincom-form-group">
            <input
              type="text"
              id="userId"
              name="userId"
              className="logincom-form-input"
              placeholder="User ID"
              value={formData.userId}
              onChange={handleInputChange}
            />
          </div>
          <div className="logincom-form-group">
            <input
              type="password"
              id="password"
              name="password"
              className="logincom-form-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="logincom-login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCom;
