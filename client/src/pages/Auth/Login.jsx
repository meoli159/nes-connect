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
        navigate("/app");
      })  
  };
  
  return (
    <div id="Auth" className="Auth">

      <form className="authForm" onSubmit={handleSubmit}>

        <h2>Welcome</h2>
      
        <input  className="authInput" placeholder="Email..." type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email} />
        <input className="authInput" placeholder="Password..." type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password} />
      

      <button className="auth-btn" type="submit">Login</button>
        <p className="text" >OR LOGIN USING</p>

      <div className="alt-login">
        <div className="facebook"></div>
        <div className="google"></div>
        <div className="twitter"></div>
      </div>

      <div className="authRegister">
          Not a member?<Link to="/register">Register now!</Link>
      </div>

      </form>
    </div>
  );
}

