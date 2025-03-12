import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign.css"
import "../style.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password. Try again.");
      }

      alert("Check your email.");
      navigate("/verify-code"); 

    } catch (error) {
      alert(error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <p>Enter your email to receive a verification code</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={handleForgotPassword} disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Code"}
      </button>
    </div>
  );
};

export default ForgotPassword;
