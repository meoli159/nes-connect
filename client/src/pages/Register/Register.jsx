import React, { useState } from "react";
import "./Register.css";
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
      .post("/auth/register", {
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
    <div id='Register' className="Register">
      <form className="formRegister" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="formInput">
          <label>User Name</label>
          <input
            placeholder="user name"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
          />
        </div>
        <div className="formInput">
          <label>Email</label>
          <input
            placeholder="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="formInput">
          <label>Password</label>
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
