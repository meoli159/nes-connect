import React from "react";
import "./style.css";

export function ServerChatRoom() { 
  const listRoom = [
    { id: 1, roomName: "Dragon Ball Ball Ball Ball" }, 
    { id: 2, roomName: "Naruto" },
    { id: 3, roomName: "Naruto" },
    { id: 4, roomName: "Naruto" },
    { id: 5, roomName: "Naruto" },
    { id: 6, roomName: "Naruto" },
    { id: 7, roomName: "Naruto" },
    { id: 8, roomName: "Naruto" },
    { id: 9, roomName: "Naruto" },
    { id: 10, roomName: "Naruto" },
    { id: 11, roomName: "Naruto" },
    { id: 12, roomName: "Naruto" },
    { id: 13, roomName: "Naruto" },
    { id: 14, roomName: "Naruto" },
    { id: 15, roomName: "Naruto" },
    { id: 16, roomName: "Naruto" },
    { id: 17, roomName: "Naruto" },
    { id: 18, roomName: "Naruto" },
    { id: 19, roomName: "Naruto" },
    { id: 20, roomName: "Naruto" },
  ];

        return (
            <div>
              <div>
                {listRoom?.map((room) => {
                  return (
                    <div className="server-chat-room-wrapper" key={room.id}>

                    <div className="server-chat-room-image">
                      <img src="" alt="" />
                    </div>
    
                    <div className="server-chat-room-name">
                      <span>{room.roomName}</span>
                    </div>
                  
                  </div>
                );
              })}
                       
            </div>

            </div>
        )
    }


export default ServerChatRoom;
