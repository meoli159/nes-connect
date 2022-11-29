import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword } from "../../api/authService";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const notify = () => {
    toast.success("🦄 Please Check you mail!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const inputEmail = (e) => {
    e.preventDefault();
    if(!email) return;
    forgotPassword({ email: email });
  };
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

        <button className="auth-btn" onClick={notify} type="submit">
          Confirm
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
