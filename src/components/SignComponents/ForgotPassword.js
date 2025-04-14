import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign.css"; 
import "../style.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    // Clear previous messages
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Get specific error message from backend if available
        throw new Error(data.message || "Failed to reset password. Try again.");
      }

      setSuccess("Check your email.");
      setTimeout(() => {
        navigate("/verify-code");
      }, 2000); // Navigate after showing success message for 2 seconds
    } catch (error) {
      setError(error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h3>Enter your email to confirm that this is you</h3>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <input
          type="email"
          name="email"
          placeholder="john.doe@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <button
          className="forgot-password-btn"
          onClick={handleForgotPassword}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;