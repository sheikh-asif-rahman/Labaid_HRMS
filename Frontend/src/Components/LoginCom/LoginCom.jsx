import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginCom.css";
import Logo from "../../assets/LabaidLogo.png";
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
      debugger;

      if (response.ok) {
        debugger;
        localStorage.setItem("isLoggedIn", "true"); // Store login status
        localStorage.setItem("userId", formData.userId); // Store the userId after successful login

        if (message === "Welcome") {
          // Fetch user data and permissions after successful login
          const userResponse = await fetch(
            "http://localhost:3000/api/adminusersearch",
            {
              method: "POST", // Using POST method
              headers: {
                "Content-Type": "application/json", // Sending JSON payload
              },
              body: JSON.stringify({
                UserId: formData.userId, // Sending UserId in the body as an nvarchar string
              }),
            }
          );

          if (userResponse.ok) {
            const userData = await userResponse.json();

            // Store the Permission from the response
            const permission = userData.Permission; // Extracting the Permission field
            localStorage.setItem("permission", permission); // Store permission in localStorage
            debugger;

            navigate("/homepage"); // Navigate to homepage on successful login
          } else {
            alert("Failed to fetch user data.");
          }
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
