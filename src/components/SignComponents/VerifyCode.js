import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign.css"
import "../style.css"

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyCode = async () => {
    if (!code.trim()) {
      alert("Please enter the verification code.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/verifyResetCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("Invalid code. Please try again.");
      }

      alert("Code verified successfully!");
      navigate("/reset-password"); 

    } catch (error) {
      alert(error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="verify-code-container">
      <h2>Verify Code</h2>
      <p>Enter the code sent to your email</p>
      <input
        type="text"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <button onClick={handleVerifyCode} disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify Code"}
      </button>
    </div>
  );
};

export default VerifyCode;
