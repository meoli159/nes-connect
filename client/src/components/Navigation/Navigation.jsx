import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authService from "../../utils/auth.service";
import "./Navigation.css";
import { Button } from "../Button/Button";

export default function Navigation() {
  const [currentUser, setCurrentUser] = useState(null);

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false)
    authService.logout();
  };

  const [navbar, setNavbar] = useState(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    authService.getCurrentUser()
    .then( (res) => {
      setCurrentUser(res.data);
    });
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

 
  
  
  const logOut = () => {
    authService.logout();
  };
  

  return (
    <>
      <nav className={navbar ? "navbar active" : "navbar"}>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Nes <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>

            <li className='nav-item'>
                <Link to='/about' className='nav-links'onClick={closeMobileMenu}>About</Link>
            </li>

            <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>Community</Link>
            </li>

            <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>Download</Link>
            </li>
            
          </ul>
          {/* set current user */}
          {currentUser ? 
          (
              <>
              <h2> Hi {currentUser.username}</h2>
              <li >
              <Link
                to='/login'
                className='nav-links-mobile'
                onClick={closeMobileMenu}>LOGOUT</Link>
              </li>
              {button && <Button onClick={logOut} buttonStyle='btn--outline'>LOGOUT</Button>}
            </>
          )
          :(
            <>
              <li>
                        <Link
                          to='/login'
                          className='nav-links-mobile'
                          onClick={closeMobileMenu}>LOGIN</Link>
                      </li>
                      {button && <Button buttonStyle='btn--outline'>LOGIN</Button>}
            </>
          )
          }
          
        </div>
      </nav>
    </>
  );
}
