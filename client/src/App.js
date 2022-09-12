import "./App.css";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";
import Community from "./pages/Community/Community";
import Admin from "./pages/Admin/Admin";
import NoPageFound from "./pages/404/NoPageFound";

function App() {
  const user = useSelector((state) => state.auth.login?.currentUser);

  const RequireAuth = () => {
    return user ? <Outlet /> : <Navigate to="/login" replace />;
  };
  const SidebarLayout = () => (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes with Navbar */}
          <Route element={<SidebarLayout />}>
            <Route path="/about" element={<About />} />
            <Route index element={<Home />} />
          </Route>

          {/* Public Routes without Navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protect routes */}
          <Route element={<RequireAuth />}>
            <Route exact path="/app" element={<Community />}/>           
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<NoPageFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
