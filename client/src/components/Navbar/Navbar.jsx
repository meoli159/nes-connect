import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import ServerLogo from "../ServerLogo";
import "./Navbar.css";


export default function Navigation() {
  const user = useSelector((state) => state.auth.login?.currentUser); 
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  
  const closeMobileMenu = () => {
    setClick(false)
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

  window.addEventListener('resize', showButton);

  const changeBackground = () => {
    if(window.scrollY >= 80) {
      setNavbar(true)
    }
    else{
      setNavbar(false)
    }
  };

  window.addEventListener("scroll", changeBackground);
  
  return (
    <>
      <nav className={navbar ? "navbar active" : "navbar"}>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <ServerLogo />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'FaTimes' : 'FaBars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>

            <li className='nav-item'>
                <Link to='/about' className='nav-links'onClick={closeMobileMenu}>About</Link>
            </li>

            <li className='nav-item'>
                <Link to='/' className='nav-links'onClick={closeMobileMenu}>Blog</Link>
            </li>

            <li className='nav-item'>
                <Link to='/' className='nav-links'onClick={closeMobileMenu}>Support</Link>
            </li>

            <li className='nav-item'>
                <Link to='/app' className='nav-links' onClick={closeMobileMenu}>Community</Link>
            </li>

            <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>Download</Link>
            </li>

            <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>Services</Link>
            </li>
            
          </ul>

          {user ? (
            <div>
              {button && (
                <Button buttonStyle="btn--outline">
                  Open community
                </Button>
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