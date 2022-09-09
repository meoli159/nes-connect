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
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

// pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import About from "./pages/About/About";
import Community from "./pages/Community/Community";
import Admin from "./pages/Admin/Admin";

function App() {
  const user = useSelector((state) => state.auth.login.currentUser);

  const RequireAuth = () => {
    return user ? <Outlet /> : <Navigate to="/login" replace />;
  };
  const SidebarLayout = () => (
    <>
      <Navigation />
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
            <Route path="/app" element={<Community />} />
            <Route path="/admin" element={<Admin />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
