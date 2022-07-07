import React, { useState } from "react";
import "./Auth.css";
import request from "../../utils/request";

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleChange =(e)=>{

  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    request
      .post("api/register", {
        username,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    console.log({ username, email, password });
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
          Register
        </button>
      </form>
    </div>
  );
}
