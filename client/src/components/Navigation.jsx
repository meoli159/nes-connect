import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <header>
      <div className="logo">Nes Connect</div>
      <nav className="items">
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='#'>About</Link>
          </li>
          <li>
            <Link to='#'>Sth 1</Link>
          </li>
          <li>
            <Link to='#'>Sth 2</Link>
          </li>
        </ul>
      </nav>
      <nav className="login">
        <ul>
          <li>
            <Link to="/login" >Login</Link>
          </li>
          <li>
            <Link to="/register" >Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
