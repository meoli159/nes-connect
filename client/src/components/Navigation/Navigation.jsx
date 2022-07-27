import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authService from "../../utils/auth.service";
import "./Navigation.css";

export default function Navigation() {
  const [currentUser, setCurrentUser] = useState(null);
  
  const [name, setName] = useState(null);
  useEffect(  ()=>{
    
    const user =  authService.getCurrentUser()
    
    .then( (res) => {
      setCurrentUser(user);
      setName(res.data);
      console.log(res);
      console.log(res.data);
    });
    
  }, []);
  const logOut = () => {
    authService.logout();
  };
  
  return (
    <header>
      <nav>
        <div className="brandName">
          <Link to="/">Nes Connect</Link>
        </div>
        <div className="navbar-left">
          
            <Link to="/">Home</Link>
          
          
            <Link to="/about">About</Link>
          
          
            <Link to="#">Sth 1</Link>
          
          
            <Link to="#">Sth 2</Link>
          {/* {currentUser && (
            <li className="nav-item">
              <Link to={"/private"} className="nav-link">
                Private
              </Link>
            </li>
          )} */}
        </div>
        {currentUser ?  (
       <div className="navbar-right">
        <h1 >hi {name.username}</h1>
       <a onClick={logOut} href="/" >
         <button className="btn">LogOut</button>
       </a>
     </div>
    
        ):(
          <div className="navbar-right">
          <a href="/login">
            <button className="btn">Login</button>
          </a>
   
          <a href="/register">
            <button className="btn">Register</button>
          </a>
        </div>
        
        ) }
      </nav>
    </header>
  );
}
