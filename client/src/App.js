import React from "react";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
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
import NoPageFound from "./pages/404/NoPageFound";
import ProfileSidebar from "./components/ProfileSidebar";
import ConfirmEmail from "./pages/Auth/ConfirmEmail";
import ConfirmPassword from "./pages/Auth/ConfirmPassword";
import Stream from "./pages/Stream";
import AutoLink from "./components/StreamContext/AutoLink";
import LiveBlocks from "./pages/LiveBlocks/index";

function App() {
  const user = useSelector((state) => state.auth?.currentUser);
  const location = useLocation();
  const RequireAuth = () => {
    return user ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };
  const SidebarLayout = () => (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );

  const ProfileLayout = () => (
    <>
      <ProfileSidebar />
      <Outlet />
    </>
  );

  return (
    <Routes>
      {/* Public Routes with Navbar */}
      <Route element={<SidebarLayout />}>
        <Route path="/about" element={<About />} />
        <Route index element={<Home />} />
      </Route>

      {/* Public Routes without Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirmemail" element={<ConfirmEmail />} />
      <Route path="/confirmpassword" element={<ConfirmPassword />} />
      <Route path="/stream" element={<AutoLink />} />
      <Route path="/stream/:streamID" element={<Stream />} />
      <Route path="/draw" element={<LiveBlocks />} />

      {/* Protect routes */}
      <Route element={<RequireAuth />}>
        <Route exact path="/app" element={<Community />} />
        <Route path="/profile" element={<Profile />} />

        <Route element={<ProfileLayout />}>
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>
      </Route>
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  );
}

export default App;
