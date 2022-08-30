import React from "react";
import { Button } from "../../components/Button/Button";
import "./Home.css";


export default function Home() {
  return (
    <div className='home-container'>
      <h1>Connect to the world</h1>
      <h2>Let's get started!</h2>
      <div className='home-btn'>

        <Button
          className='btn'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}>
          Join Community
        </Button>
      </div>   

    </div>
  );
}
