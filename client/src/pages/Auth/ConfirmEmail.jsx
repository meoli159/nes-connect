import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../api/authService";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.css";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit =  (e) => {
        e.preventDefault();
        const user = {
          email,
          password,
        };
        authService.login(user, dispatch, navigate);
      };

  return (
    <div id="Auth" className="Auth">
      <form className="authConfirmEmailForm" onSubmit={handleSubmit}>
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
          <Link to="/confirmpassword"
          style={{ color: '#FFF', textDecoration: 'none' }}
          >
            Confirm
          </Link>
        </button>

      </form>
    </div>
  )
}

export default ForgotPassword;