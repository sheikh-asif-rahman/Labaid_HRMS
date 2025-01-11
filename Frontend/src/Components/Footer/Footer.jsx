import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="socialmedia">
        <h5>Facebook</h5>
        <h5>Twitter</h5>
        <h5>Youtube</h5>
      </div>
      <hr />
      <div className="footer-text">
        <p>@{new Date().getFullYear()} CodeInn. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
