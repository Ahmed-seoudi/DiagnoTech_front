import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"
import "../style.css";


const HomePage = () => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  return (
    <>
    <div className={`auth-container ${"Home-bg"}`}>
          <img className="Home-img" src="/img/home.jpeg" alt=""/>
      <div className="home-img-cover"></div>
      <div className="home-main-content">
          <h1>Welcome to our website</h1>
          <button onClick={() => navigate("/symptom-form")}>Enter Symptom</button>
          <button onClick={() => navigate("/disease-report")}>Disease Report</button>
          <button onClick={() => navigate("/forgot")}>Forgot Password</button>
          <button onClick={() => navigate("/verify-code")}>Verify Code</button>
          <button onClick={() => navigate("/reset-password")}>Reset Password</button>
      </div>
    </div>
    </>
  );
};

export default HomePage;
