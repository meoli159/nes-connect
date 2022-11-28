import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Auth.css";
import { login } from "../../api/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
   
    login(user,dispatch).then(()=>{navigate("/app");})
    .catch(error =>{
     setError(error.response.data.message)
    })
    
  };

  return (
    <div id="Auth" className="Auth">
      <form className="authForm" onSubmit={handleSubmit}>
        <h2>Welcome</h2>
       {error ? (<h3 className="alert">{error}</h3>):(null)}
        <input
          className="authInput"
          placeholder="Email..."
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="authInput"
          placeholder="Password..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <div className="forgot-password-wrapper">
          Forgot your password?
          <Link to="/forgotpassword" style={{ textDecoration: "none" }}>
            Click here!
          </Link>
        </div>

        <button className="auth-btn" type="submit">
          Login
        </button>
        <div className="authRegister">
          Not a member?
          <Link to="/register">Register now!</Link>
        </div>
      </form>
    </div>
  );
}
