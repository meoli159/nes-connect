import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import authService from "../../utils/auth.service";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
     await authService.login(email,password)
      .then((res) => {
        navigate("/");
      });

     
  };
  
  return (
    <div id="Auth" className="Auth">
      <form className="authForm" onSubmit={handleSubmit}>
        <h1>Oh!! Hi there, Welcome back </h1>
        <div className="authFormInput">
          <label>Email</label>
          <input
            className="authInput"
            placeholder="email"
            type="text"
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
          Login
        </button>
        <div className="navRegister">
          Don't have account? <Link to="/register"> Register here !!</Link>
        </div>
       
      </form>
    </div>
  );
}
