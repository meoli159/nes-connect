import React from 'react';
import "./style.css";

export default function ChatBox() {
  const listChatReceived = [
    { id: 1, chatReceivedContent: "Kono Dio da!" },
    { id: 2, chatReceivedContent: "Kono Dio da!" },
    { id: 3, chatReceivedContent: "Kono Dio da!" },
    { id: 4, chatReceivedContent: "Kono Dio da!" },
    { id: 5, chatReceivedContent: "Kono Dio da!" },
    { id: 6, chatReceivedContent: "Kono Dio da!" },
    { id: 7, chatReceivedContent: "Kono Dio da!" },
    { id: 8, chatReceivedContent: "Kono Dio da!" },
    { id: 9, chatReceivedContent: "Kono Dio da!" },
    { id: 10, chatReceivedContent: "Kono Dio da!" },
  ];

  const listChatSent = [
    { id: 1, chatSentContent: "Kono Joruno Jobāna niwa yume ga aru." },
    { id: 2, chatSentContent: "Kono Joruno Jobāna niwa yume ga aru." },
    { id: 3, chatSentContent: "Kono Joruno Jobāna niwa yume ga aru." },
    { id: 4, chatSentContent: "Kono Joruno Jobāna niwa yume ga aru." },
    { id: 5, chatSentContent: "Kono Joruno Jobāna niwa yume ga aru." },
    { id: 6, chatSentContent: "Kono Joruno Jobāna niwa yume ga aru." },
    { id: 7, chatSentContent: "Kono Joruno Jobāna niwa yume ga aru." },
    { id: 8, chatSentContent: "Kono Joruno Jobāna niwa yume ga aru." },
    { id: 9, chatSentContent: "Kono Joruno Jobāna niwa yume ga aru." },
    { id: 10, chatSentContent: "Kono Joruno Jobāna niwa yume ga aru." },
  ];

  return (

    <div className='main-room-wrapper'>

      <div className='main-room-top'>
        
          <div className="server-chat-box-name-wrapper-1">

            <div className="server-chat-room-image-main-1">
              <img src='' alt=''/>
            </div>
            
            <div className='server-chat-box-name-1'>

              <span>Room 1</span> 

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

          <div className='main-room-chat-page'>

            {listChatReceived?.map((chat) => {
            return (
            <div className='message-received-wrapper' key={chat.id}>

              <span className='message-user-name'>
                Dio
                  <span className='time'>
                    Today at 2:30 AM
                  </span>
              </span>

              <span className='message'>
                <span>{chat.chatReceivedContent}</span>
              </span>

            </div>
            );
          })}
        
          {listChatSent?.map((chat) => {
          return (
            <div className='message-sent-wrapper' key={chat.id}>

              <span className='message-user-name'>
                Giorno Giovanna
                  <span className='time'>
                    Today at 2:33 AM
                  </span>
              </span>

              <span className='message'>
                <span>{chat.chatSentContent}</span>
              </span>

            </div>
            );
          })}
          </div>
          

        <div className="separator4" />

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

