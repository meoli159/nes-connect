import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { register } from "../../api/authService";

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
    };

    if (password !== cPassword)
      return setError("Confirm password not matched");

    register(user)
      .then(() => navigate("/login"))
      .catch(error=> {
        setError(error.response.data.message);
      });
  };

  return (
    <div id="Auth" className="Auth">
      <form className="authForm" onSubmit={handleSubmit}>
        <h2>Welcome</h2>
        {error ? (<h3 className="alert">{error}</h3>):(null)}
        <input
          className="authInput"
          placeholder="User name..."
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={username}
        />

        <input
          className="authInput"
          placeholder="Email..."
          type="text"
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

        <input
          className="authInput"
          placeholder="Confirm Password..."
          type="password"
          onChange={(e) => setCPassword(e.target.value)}
          value={cPassword}
        />

        <button className="auth-btn" type="submit">
          Register
        </button>
        <p className="text">OR LOGIN USING</p>

        <div className="alt-login">
          <div className="facebook"></div>
          <div className="google"></div>
          <div className="twitter"></div>
        </div>

        <div className="authLogin">
          Already a member?<Link to="/login">Join now!</Link>
        </div>
      </form>
    </div>
  );
}
