import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import authService from "../../utils/auth.service";
import { Button } from "../Button/Button";
import { ButtonLogout } from "../Button/ButtonLogout";
import "./Navigation.css";
import { createAxios } from "../../utils/createInstance";
import { logOutSuccess } from "../../redux/authSlice";

export default function Navigation() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const id = user?._id;

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user,dispatch,logOutSuccess)

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
  };

  const [navbar, setNavbar] = useState(false);

  const showButton = () => {
    if (window.innerWidth <= 820) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  const logOut = () => {
    authService.logout(user?.accessToken, dispatch, id,axiosJWT);
  };

  return (
    <>
      <nav className={navbar ? "navbar active" : "navbar"}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Nes <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/app" className="nav-links" onClick={closeMobileMenu}>
                Community
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/test" className="nav-links" onClick={closeMobileMenu}>
                Admin
              </Link>
            </li>
            {/*             
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Download
              </Link>
            </li> */}

            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Services
              </Link>
            </li>
          </ul>
          {user ? (
            <div>
              <p>Hi, {user.username}</p>
              {button && (
                <ButtonLogout onClick={logOut} buttonStyle="btn--outline">
                  LOGOUT
                </ButtonLogout>
              )}
            </div>
          ) : (
            <div>
              {button && <Button buttonStyle="btn--outline">LOGIN</Button>}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
