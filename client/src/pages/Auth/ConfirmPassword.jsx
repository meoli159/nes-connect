import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Auth.css";
import authService from "../../api/authService";

function ConfirmPassword() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const user = {
        username,
        email,
        password,
      };
  
      if (password !== cPassword) {
        return console.error("Confirm password not matched");
      } else {
        authService.register(user, dispatch, navigate);
      }
    };

  return (
    <div id="Auth" className="Auth">
    <form className="authConfirmPasswordForm" onSubmit={handleSubmit}>
      <h2>Confirm Your Password</h2>

      <input
          className="authInput"
          placeholder="Current Password..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

      <input
          className="authInput"
          placeholder="New Password..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <input
          className="authInput"
          placeholder="Confirm Password..."
          type="password"
          onChange={(e) => setCPassword(e.target.value)}
          value={cPassword}
        />

        <button className="auth-btn" type="submit">
          <Link to='/login'
          style={{ color: '#FFF', textDecoration: 'none' }}>
            Confirm
          </Link>
        </button>

    </form>
  </div>
  )
}

export default ConfirmPassword;