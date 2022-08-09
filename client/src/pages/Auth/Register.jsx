import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import authService from "../../utils/auth.service";

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.register(username,email,password)
    .then((res) => {
      navigate("/login");
    });
    
  };

  return (
    <div id="Auth" className="Auth">
      <form className="authForm" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="authFormInput">
          <label>User Name</label>
          <input
            className="authInput"
            placeholder="user name"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
          />
        </div>
        <div className="authFormInput">
          <label>Email</label>
          <input
            className="authInput"
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="authFormInput">
          <label>Password</label>
          <input
            className="authInput"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button className="authBtn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
