import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// import socketIO from 'socket.io-client'

// components

// pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import About from "./pages/About/about";
import Community from "./pages/Community/community";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

// const WS ="http://localhost:3333";
const SidebarLayout = () => (
  <>
    <Navigation />
    <Outlet />
    <Footer/>
  </>
);
function App() {
  // useEffect(()=>{
  //   socketIO(WS);
  // },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route path="/app" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route index element={<Home />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
