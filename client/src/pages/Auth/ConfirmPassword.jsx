import React, { useState } from "react";
import "./Auth.css";

function ConfirmPassword() {

  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  

  return (
    <div id="Auth" className="Auth">
    <form className="authConfirmPasswordForm">
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
  )
}

export default ConfirmPassword;