import React from "react";
import './Footer.css';
import { Button } from "../Button/Button";

function Footer() {
  return (
    <div className='footer-container'>
          <form>
            <Button buttonStyle='btn--outline'>Join us now</Button>
          </form>
        </div>   
  );
}

export default Footer;
