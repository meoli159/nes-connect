import React, { useState } from "react";
import "./Auth.css";

function ForgotPassword() {

    const [email, setEmail] = useState("");

  return (
    <div id="Auth" className="Auth">
      <form className="authConfirmEmailForm">
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