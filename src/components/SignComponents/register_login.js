// Sign.js
import React, { useState, useEffect } from "react";
import "../style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import "./Sign.css";
import { useAuth } from "../../context/AuthContext";

const Sign = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    age: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPasswordExpiry = localStorage.getItem("rememberedPasswordExpiry");

    if (rememberedEmail && rememberedPasswordExpiry) {
      if (Date.now() < parseInt(rememberedPasswordExpiry)) {
        setLoginData({
          email: rememberedEmail,
          password: localStorage.getItem("rememberedPassword") || "",
        });
        setRememberMe(true);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        localStorage.removeItem("rememberedPasswordExpiry");
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleRememberMe = (e) => setRememberMe(e.target.checked);

  const handleForgotPassword = () => navigate("/forgot");

  const validateForm = () => {
    let errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full Name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Invalid email format.";
    if (!formData.gender) errors.gender = "Gender is required.";
    if (!formData.age.trim() || isNaN(formData.age)) errors.age = "Valid Age is required.";
    if (formData.password.length < 6) errors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match.";
    if (!formData.agreeToTerms) errors.agreeToTerms = "You must agree to the terms.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateLoginForm = () => {
    let errors = {};
    if (!loginData.email.trim()) errors.email = "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(loginData.email)) errors.email = "Invalid email format.";
    if (!loginData.password.trim()) errors.password = "Password is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Registration failed. Please try again.");

      setMessage({ type: "success", text: "Registration successful!" });
      navigate("/");

      setFormData({
        fullName: "",
        email: "",
        gender: "",
        age: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      });
    } catch (error) {
        setMessage({ type: "error", text: error.message || "An error occurred!" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) throw new Error("Login failed. Please try again.");

      const res = await response.json();
      login(res.data.token); 

      if (rememberMe) {
        const expiryDate = Date.now() + (7 * 24 * 60 * 60 * 1000); 
        localStorage.setItem("rememberedEmail", loginData.email);
        localStorage.setItem("rememberedPassword", loginData.password);
        localStorage.setItem("rememberedPasswordExpiry", expiryDate.toString());
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        localStorage.removeItem("rememberedPasswordExpiry");
      }

      setMessage({ type: "success", text: "Login successful!" });
      navigate("/");

      setLoginData({ email: "", password: "" });
    } catch (error) {
      setMessage({ type: "error", text: error.message || "An error occurred!" });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={`auth-container-sign ${isLogin ? "login-bg" : "register-bg"}`}>
      {isLogin ? (
        <form className="auth-form login-page" onSubmit={handleLoginSubmit}>
          <h2>Login</h2>
          <p className="login-fp">Login to access your account</p>

           {message.text && (
              <div style={{
                color: message.type === "error" ? "red" : "green",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
                textAlign: "center"
              }}>
                {message.text}
              </div>
            )}
          <div className="login-input">
            <label>Email</label>
            <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} required />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div className="login-input">
            <label>Password</label>
            <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} required />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          </div>
          <div>
            <input type="checkbox" checked={rememberMe} onChange={handleRememberMe} />
            <label>Remember me</label>
            <span style={{ color: "red", cursor: "pointer", marginLeft: "10px" }} onClick={handleForgotPassword}>
              Forgot Password?
            </span>
          </div>
          <button className="login-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
          <p className="to-register">
            Don't have an account?{" "}
            <span style={{ color: "#FF8682", cursor: "pointer" }} onClick={() => setIsLogin(false)}>
              Register
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form signup-page">
          <div className="signup-title">
            <h2>Sign up</h2>
            <p>Let's get you all set up so you can access your personal account.</p>
            {message.text && (
              <div style={{
                color: message.type === "error" ? "red" : "green",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
                textAlign: "center"
              }}>
                {message.text}
              </div>
            )}
          </div>
          <div className="input-box">
            <label className="label-signup">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            {errors.fullName && <p style={{ color: "red" }}>{errors.fullName}</p>}
          </div>

          <div className="input-box">
            <label className="label-signup">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>

          <div className="input-box">
            <label className="label-signup">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
          </div>

          <div className="input-box">
            <label className="label-signup">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
          </div>

          <div className="input-box-pass">
            <label className="label-signup">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          </div>

          <div className="input-box-pass">
            <label className="label-signup">Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
          </div>

          <div className="agree-terms">
            <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
            <label>I agree to all the <span style={{ color: "#FF8682" }}>Terms</span> and <span style={{ color: "#FF8682" }}>Privacy Policies</span></label>
            {errors.agreeToTerms && <p style={{ color: "red" }}>{errors.agreeToTerms}</p>}
          </div>

          <button className="signup-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Create account"}
          </button>

          <p className="to-login">Already have an account? <span style={{ color: "#FF8682", cursor: "pointer" }} onClick={() => setIsLogin(true)}>Login</span></p>
        </form>
      )}
    </div>
  );
};

export default Sign;