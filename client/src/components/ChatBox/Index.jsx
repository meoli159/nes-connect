import React from 'react';
import "./style.css";

export default function ChatBox() {

  return (

    <div className='main-room-wrapper'>

      <div className='main-room-top'>
        
        <div className="server-chat-room-name-main">
          <p>Room 1</p> 
        </div>

      </div>

        <div className="separator6" />

          <div className='main-room-chat-page'>

            <div className='message-wrapper'>

              <span className='message-user-name'>
                Dio
                  <span className='time'>
                    Today at 2:30 AM
                  </span>
              </span>

              <div className='message'>
                <p>Kono Dio da!</p>
              </div>

            </div>

            <div className='message-wrapper'>

              <span className='message-user-name'>
                Dio
                  <span className='time'>
                    Today at 2:31 AM
                  </span>
              </span>

              <div className='message'>
                <p>Oh, you're approaching me? Instead of running away you're coming right to me?</p>
              </div>

            </div>

            <div className='message-wrapper'>

              <span className='message-user-name'>
                Jotaro
                  <span className='time'>
                    Today at 2:32 AM
                  </span>
              </span>

              <div className='message'>
                <p>I can't beat the shit out of you without getting closer.</p>
              </div>

            </div>

            <div className='message-wrapper'>

              <span className='message-user-name'>
                Dio
                  <span className='time'>
                    Today at 2:33 AM
                  </span>
              </span>

              <div className='message'>
                <p>Ho ho! Then come as close as you like!</p>
              </div>

            </div>

            <div className='message-wrapper'>

              <span className='message-user-name'>
                Giorno Giovanna
                  <span className='time'>
                    Today at 2:33 AM
                  </span>
              </span>

              <div className='message'>
                <p>I, Giorno Giovanna, have a dream.</p>
              </div>

            </div>

          </div>

        <div className="separator7" />

          <div className='main-room-bottom'>

            <div className='chat-input-container'>

              <div className='chat-input-wrapper'>

                <div className='chat-input-icon'>  

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

