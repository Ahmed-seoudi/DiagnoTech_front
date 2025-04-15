import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign.css";
import "../style.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    // Clear previous messages
    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/resetPassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Get specific error message from backend if available
        throw new Error(data.message || "Failed to reset password. Try again.");
      }

      setSuccess("Password changed successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Navigate after showing success message for 2 seconds
    } catch (error) {
      setError(error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="reset-password-container">
    <div className="reset-password-card">
      <h2>Reset Password</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <div className="input-group">
        <label>Enter your new password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      
      <button 
        className="reset-password-btn" 
        onClick={handleResetPassword} 
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Reset Password"}
      </button>
    </div>
  </div>
);
};
export default ResetPassword;