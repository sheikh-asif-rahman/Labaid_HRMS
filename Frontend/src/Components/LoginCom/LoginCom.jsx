import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginCom.css";

const LoginCom = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/homepage"); // Navigate to homepage on login
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
            />
          </div>
          <div className="logincom-form-group">
            <input
              type="password"
              id="password"
              name="password"
              className="logincom-form-input"
              placeholder="Password"
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
