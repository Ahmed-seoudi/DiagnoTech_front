import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import "./Sign.css";
import { useAuth } from "../../context/AuthContext";

const Sign = ({ defaultMode = "register" }) => {
  const [isLogin, setIsLogin] = useState(defaultMode === "login");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); 
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
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

  const [backendError, setBackendError] = useState("");
  
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const passwordInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (passwordInputRef.current && !passwordInputRef.current.contains(event.target)) {
        setShowPasswordRequirements(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [passwordInputRef]);

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
    
    setBackendError("");
    
    // Validate password on change
    if (name === "password") {
      validatePassword(value);
    }
    
    if (name === "confirmPassword" || (name === "password" && formData.confirmPassword)) {
      validateConfirmPassword(name === "confirmPassword" ? value : formData.password, 
      name === "confirmPassword" ? formData.password : value);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
   
    setBackendError("");
  };

  const handleRememberMe = (e) => setRememberMe(e.target.checked);

  const handleForgotPassword = () => navigate("/forgot");

  const validatePassword = (password) => {
    // Check individual requirements
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    
    setPasswordRequirements(requirements);
    
    if (password) {
      const allRequirementsMet = Object.values(requirements).every(Boolean);
      if (!allRequirementsMet) {
        return false;
      } else {
        setPasswordError("");
        return true;
      }
    } else {
      setPasswordError("Password is required");
      return false;
    }
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return false;
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) return false;
    if (!formData.gender) return false;
    if (!formData.age.trim() || isNaN(formData.age)) return false;
    
    // Password validation
    const isPasswordValid = validatePassword(formData.password);
    const isConfirmPasswordValid = validateConfirmPassword(formData.confirmPassword, formData.password);
    
    if (!isPasswordValid || !isConfirmPasswordValid) return false;
    if (!formData.agreeToTerms) return false;
    
    return true;
  };

  const validateLoginForm = () => {
    if (!loginData.email.trim() || !/^\S+@\S+\.\S+$/.test(loginData.email)) return false;
    if (!loginData.password.trim()) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setBackendError("");
    
    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Display backend error message
        setBackendError(responseData.data?.error || "Registration failed. Please try again.");
        return;
      }

      setMessage({ type: "success", text: "Registration successful!" });
      setIsLogin(true);

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
      setBackendError("Connection error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

 const handleLoginSubmit = async (e) => {
  e.preventDefault();
  if (!validateLoginForm()) {
    setBackendError("Please enter a valid email and password");
    return;
  }

  setIsLoading(true);
  setBackendError("");
  
  try {
    const response = await fetch("http://127.0.0.1:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const responseData = await response.json();
    console.log("Full response data:", responseData); // Log the entire response

    if (!response.ok) {
      setBackendError(responseData.data?.error || "Login failed. Please try again.");
      return;
    }

    // Extract user data, accounting for nested structure
      const userData = responseData.data || {};
      const token = userData.token;
      const role = userData.user?.role;  

    
    
    // If we don't have a role directly, let's check if we can determine it from other data
    let userRole = role;
    if (!userRole) {
      // Check if user has doctor-specific properties
      if (userData.specialty || userData.availableAppointments) {
        userRole = "doctor";
      } else if (userData.isAdmin) {
        userRole = "admin";
      } else {
        userRole = "patient"; // Default role
      }
    }
    
    // Use the updated login function with token and role
    login(token, userRole);
    
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
    
    console.log("Redirecting based on role:", userRole);
    if (userRole === "admin") {
      navigate("/admin");
    } else if (userRole === "doctor") {
      navigate("/DoctorView");
    } else {
      navigate("/");
    }

    setLoginData({ email: "", password: "" });
  } catch (error) {
    console.error("Login error:", error);
    setBackendError("Connection error. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};

  const PasswordRequirementsPopup = () => {
    if (!showPasswordRequirements) return null;
    
    const popupStyle = {
      position: "absolute",
      top: "100%",
      left: "0",
      right: "0",
      background: "white",
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      zIndex: 100,
      marginTop: "5px"
    };
    
    const requirementStyle = (met) => ({
      fontSize: "12px",
      margin: "3px 0",
      color: met ? "green" : "#666",
      display: "flex",
      alignItems: "center"
    });
    
    const checkmarkStyle = {
      marginRight: "5px",
      color: "green"
    };
    
    return (
      <div style={popupStyle}>
        <div style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "5px" }}>
          Password must contain:
        </div>
        <div style={requirementStyle(passwordRequirements.length)}>
          {passwordRequirements.length && <span style={checkmarkStyle}>✓</span>}
          At least 8 characters
        </div>
        <div style={requirementStyle(passwordRequirements.uppercase)}>
          {passwordRequirements.uppercase && <span style={checkmarkStyle}>✓</span>}
          At least one uppercase letter
        </div>
        <div style={requirementStyle(passwordRequirements.lowercase)}>
          {passwordRequirements.lowercase && <span style={checkmarkStyle}>✓</span>}
          At least one lowercase letter
        </div>
        <div style={requirementStyle(passwordRequirements.number)}>
          {passwordRequirements.number && <span style={checkmarkStyle}>✓</span>}
          At least one number
        </div>
        <div style={requirementStyle(passwordRequirements.special)}>
          {passwordRequirements.special && <span style={checkmarkStyle}>✓</span>}
          At least one special character
        </div>
      </div>
    );
  };

  return (
    <div className="page-center-wrapper">
      <div className={`auth-container-sign auth-container ${isLogin ? "active" : ""}`}>  
      {/* Login Form */}
      <div className="form-section login">
        <form className="auth-form" onSubmit={handleLoginSubmit}>
          <h2 style={{textAlign:"center"}}>Login</h2>
          <p className="login-fp">Login to access your account</p>
  
          {backendError && <div className="form-error">{backendError}</div>}
          {message.text && (
            <div className={`form-message ${message.type === "error" ? "error" : "success"}`}>
              {message.text}
            </div>
          )}
  
          <div className="login-input">
            <label>Email</label>
            <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} required />
          </div>
          <div className="login-input">
            <label>Password</label>
            <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} required />
          </div>
          <div className="remember-me" style={{ display: "flex", alignItems: "center"}}>
            <label >
              <input type="checkbox" checked={rememberMe} onChange={handleRememberMe} />
              Remember me 
              <span className="forgot-link" onClick={handleForgotPassword}>
              Forgot Password?
            </span>
            </label>
          </div>

          <button className="login-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
          <button type="button" className="google-btn">
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="google icon" style={{ marginRight: "8px" }} />
              Sign In with Google
            </button>
        </form>
        <div className="switch-form-link" style={{ textAlign: "center", marginTop: "16px" }}>
  <p style={{ fontSize: "13px" }}>
  Don't have an account?
    <button
      type="button"
      style={{
        background: "none",
        color: "#007BFF",
        border: "none",
        padding: 0,
        marginLeft: "5px",
        cursor: "pointer",
        textDecoration: "underline",
      }}
      onClick={() => setIsLogin(true)}
    >
      Sign Up
    </button>
  </p>
</div>

      </div>
  
      {/* Register Form */}
      <div className="form-section register">
      <form className="auth-form grid-two-cols" onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center" }}>Sign Up</h2>
          <p>Let's get you set up with a new account.</p>
  
          {backendError && <div className="form-error">{backendError}</div>}
          {message.text && (
            <div className={`form-message ${message.type === "error" ? "error" : "success"}`}>
              {message.text}
            </div>
          )}
  
          <div className="input-box">
            <label className="label-signup">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
  
          <div className="input-box">
            <label className="label-signup">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
  
          <div className="input-box">
            <label className="label-signup">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
  
          <div className="input-box">
            <label className="label-signup">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>
  
          <div className="input-box-pass" style={{ position: "relative" }}>
            <label className="label-signup">Password</label>
            <input
              type="password"
              name="password"
              ref={passwordInputRef}
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setShowPasswordRequirements(true)}
              required
            />
            <PasswordRequirementsPopup />
            {passwordError && <p className="form-error small">{passwordError}</p>}
          </div>
  
          <div className="input-box">
            <label className="label-signup">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box-pass">
            <label className="label-signup">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {confirmPasswordError && <p className="form-error small">{confirmPasswordError}</p>}
          </div>
  
          <div className="agree-terms">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <label>
              I agree to the <span>Terms</span> and <span>Privacy Policy</span>
            </label>
          </div>
  
          <div className="full-row" style={{ display: "flex", gap: "10px" }}>
            <button className="signup-btn" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Create Account"}
            </button>
            <button type="button" className="google-btn">
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="google icon" style={{ marginRight: "8px" }} />
              Sign up with Google
            </button>
          </div>

        </form>
        <div className="switch-form-link" style={{ textAlign: "center", marginTop: "16px" }}>
  <p style={{ fontSize: "13px" }}>
  Already have an account?
    <button
      type="button"
      style={{
        background: "none",
        color: "#007BFF",
        border: "none",
        padding: 0,
        marginLeft: "5px",
        cursor: "pointer",
        textDecoration: "underline",
      }}
      onClick={() => setIsLogin(false)}
    >
      Sign In
    </button>
  </p>
</div>

      </div>
  
      {/* Overlay Panel */}
      <div className="toggle-panel-wrapper">
        <div className="toggle-panel">
          {isLogin ? (
            <div className="panel-content">
              <h1>I already have an acount</h1>
              <p>To keep connected with us please login</p>
              <button onClick={() => setIsLogin(false)}>Sign In</button>
            </div>
          ) : (
            <div className="panel-content">
              <h1>new here !</h1>
              <p>Register and start your journey with us</p>
              <button onClick={() => setIsLogin(true)}>Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Sign;