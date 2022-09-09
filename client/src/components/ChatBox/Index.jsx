import React, { useEffect, useRef, useMemo } from 'react';
import { useSelector } from "react-redux";
import "./style.css";

export default function ChatBox() {
  const listChat =  useMemo(() => [
    { id: 1, chatContent: "Hello hooman" },
    { id: 2, chatContent: "Hi" },
    { id: 3, chatContent: "Omae wa mou shindeiru." },
    { id: 4, chatContent: "Nani !?" },
    { id: 5, chatContent: "Kono Dio da!" },
  ], []);

  const containerRef = useRef(null);

  useEffect(() => {

    if(containerRef && containerRef.current) {
      const element = containerRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth"
      })
    }

  }, [containerRef, listChat ])

  const user = useSelector((state) => state.auth.login.currentUser);

  return (

    <div className='chat-box-wrapper'>

      <div className='chat-box-top'>
        
          <div className="chat-box-top-wrapper">

            <div className="chat-box-image-main">
              <img src='' alt=''/>
            </div>
            
            <div className='chat-box-room-name'>

              <span>Dragon Ball Ball Ball Ball Ball Ball Ball Ball Ball Ball Ball Ball</span> 

            </div>

          </div>
      
          <button className='call-button'>
            <i className="fa fa-phone"></i>
          </button>

          <button className="video-call-button">
            <i className="fas fa-video"></i>
          </button>
        
      </div>

        <div className="separator3" />

          <div className='chat-box-page' ref={containerRef}>

            {listChat?.map((chat) => {
            return (
            <div className='message-wrapper' key={chat.id}>
                <div className="message-user-image">
                  <img src="" alt="" />
                </div>

                <div className='message-user-name'>
                  <span className='user-name-text'>
                    {user.username}
                  </span> 

                  <span className='time'>
                    Today at 2:30 AM
                  </span>
                </div>

                <div className='message'>
                  <span>{chat.chatContent}</span>
                </div>                 
            </div>
            );
          })}

          </div>       

        <div className="separator4" />

          <div className='main-room-bottom'>

            <div className='chat-input-container'>

              <div className='chat-input-wrapper'>

                <div className='chat-input-content'>  

                  <input className='chat-input-text' 
                    placeholder='Message' 
                    type='text'/>

                </div>

              </div>

            </div>

        </div>

    </div>
  )
}

