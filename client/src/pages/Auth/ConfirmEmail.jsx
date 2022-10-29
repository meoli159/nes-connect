import React, { useState } from "react";
import { forgotPassword } from "../../api/authService";
import "./Auth.css";

function ForgotPassword() {

  const [email, setEmail] = useState("");
const inputEmail = (e)=>{
  e.preventDefault();
  forgotPassword({email:email}).then(()=>{
    console.log("Email sent , pls check")
  })
}
  return (
    <div id="Auth" className="Auth">
      <form className="authConfirmEmailForm" onSubmit={inputEmail}>
        <h2>Confirm Your Email</h2>

        <input
          className="authInput"
          placeholder="Email..."
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        
        <button className="auth-btn" type="submit">        
            Confirm
        </button>

      </form>
    </div>
  )
}

export default ForgotPassword;