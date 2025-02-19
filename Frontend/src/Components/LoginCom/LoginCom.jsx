import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginCom.css";
import Logo from "../../assets/LabaidLogo.png";
import { BASE_URL } from "/src/constants/constant.jsx";

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
      const response = await fetch(`${BASE_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: formData.userId,
          Password: formData.password,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        alert(message); // Show error message
        return;
      }

      const data = await response.json(); // Parse JSON response

      // Store UserId and Permission in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", data.UserId);
      
      // Convert permission string into an array and store it
      const permissionArray = data.Permission ? data.Permission.split(",") : [];
      localStorage.setItem("permission", JSON.stringify(permissionArray));

      navigate("/homepage"); // Navigate to homepage on successful login
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <div className="logincom-page">
      <div className="logincom-container">
        <h2 className="logincom-heading">
          <img src={Logo} alt="Labaid" />
        </h2>
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  document.getElementById("password").focus();
                }
              }}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  document.querySelector(".logincom-login-button").click();
                }
              }}
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
