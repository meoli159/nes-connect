import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api/authService";

import "./Auth.css";

function ConfirmPassword() {
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const { userId, forgotPasswordToken } = useParams();
  const navigate = useNavigate();
  const inputPassword = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      return console.error("Confirm password not matched");
    } else {
      resetPassword(userId, forgotPasswordToken, { password: password }).then(
        () => {
          navigate("/login");
        }
      );
    }
  };

  return (
    <div id="Auth" className="Auth">
      <form className="authConfirmPasswordForm" onSubmit={inputPassword}>
        <h2>Change Your Password</h2>

        <input
          className="authInput"
          placeholder="New Password..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <input
          className="authInput"
          placeholder="Confirm New Password..."
          type="password"
          onChange={(e) => setCPassword(e.target.value)}
          value={cPassword}
        />

        <button className="auth-btn" type="submit">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ConfirmPassword;
