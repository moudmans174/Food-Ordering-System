import React from "react";
import "./Footer.css";

import logo from "../../assets/logo.png";
import facebookIcon from "../../assets/facebook_icon.png";
import twitterIcon from "../../assets/twitter_icon.png";
import linkedinIcon from "../../assets/linkedin_icon.png";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={logo} alt="Logo" />
          <p>Your Home of good taste</p>
          <div className="footer-social-icons">
            <img src={facebookIcon} alt="Facebook" />
            <img src={twitterIcon} alt="Twitter" />
            <img src={linkedinIcon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+23278354576</li>
            <li>contact@moudmans26.gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 @ Moudmans Restaurant. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
