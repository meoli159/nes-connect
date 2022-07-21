import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  return (
    <header>
      <nav>
        <div className="brandName">
          <Link to="/">Nes Connect</Link>
        </div>
        <div className="navbar-left">
          
            <Link to="/">Home</Link>
          
          
            <Link to="#">About</Link>
          
          
            <Link to="#">Sth 1</Link>
          
          
            <Link to="#">Sth 2</Link>
          
        </div>
        <div className="navbar-right">
          <a href="/login">
            <button className="btn">Login</button>
          </a>

          <a href="/register">
            <button className="btn">Register</button>
          </a>
        </div>
      </nav>
    </header>
  );
}
