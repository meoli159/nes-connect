import React from 'react';
import "./style.css";

function OtherContent() {

  return (

    <div className='other-content-wrapper'>

        <div className='other-content-container-top'>

          <div>
            <button className="call-button">
              <i className="fa fa-phone"></i>
            </button>
          </div>
            
        </div>

        <div className="separator8" />

          <div>
            <button className="video-call-button">
              <i className="fas fa-video"></i>
            </button>
          </div>

        <div className='other-content-preview'>
           
        </div>
        
    </div>
  )
}

export default OtherContent;