import React from "react";
import {Link} from 'react-router-dom';
const Header = () =>{
return (
    <>
    <header>
        
    <h2><Link to='/'>Nes Connect</Link></h2>
       <div className="links">
           <li>  About </li>
       </div>
        <div className="Button"> 
        <button > <Link to='/login'>Login</Link></button>
        <button > <Link to='/register'>Register</Link></button>
        </div>
       
    </header>
    </>
)
}

export default Header