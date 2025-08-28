import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets"; // make sure this exists and is correctly exporting the icons

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrtState] = useState("Login");

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-popup-input">
          {currState === "Login" ? null : (
            <input type="text" placeholder="Enter Your Name" required />
          )}
          <input type="email" placeholder="Enter Your Email" required />
          <input type="password" placeholder="Enter Password" required />
        </div>
        <button>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new Account?{" "}
            <span onClick={() => setCurrtState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrtState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
