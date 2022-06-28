import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import socketIO from 'socket.io-client'



// components

// pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/LoginPage";
import Register from "./pages/Register/Register";

const WS ="http://localhost:3333";

function App() {
  useEffect(()=>{
    socketIO(WS);
  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
