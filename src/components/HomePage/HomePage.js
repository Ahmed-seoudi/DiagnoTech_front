import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"
import "../style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <button variant="primary" className="px-4 fw-semibold shadow" onClick={() => navigate("/symptom-form")}>Enter Symptom</button>
      </div>
    </div>
    </>
  );
};

export default HomePage;
