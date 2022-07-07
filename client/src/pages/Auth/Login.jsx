import React, { useState } from "react";
import request from "../../utils/request";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("false");

  const handleSubmit = (e) => {
    e.preventDefault();
    request
      .post("/api/login", {
        email,
        password,
      })
      .then((res) => {
        if (!res.data) {
          setLoginStatus("false");
        } else {
          console.log(res.data);
          setLoginStatus("true")
          
        }
      });
  };
  return (
    <div id="Auth" className="Auth">
      <form className="authForm" onSubmit={handleSubmit}>
        <h1>Login</h1>
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
        <div>{loginStatus}</div>
      </form>
    </div>
  );
}
