import React from 'react';
import "./style.css";

function MemberList() {

    const listMember = [
        { id: 1, memberName: "Dragon Ball Ball Ball Ball" }, 
        { id: 2, memberName: "Naruto" }, 
        { id: 3, memberName: "Naruto"  }, 
        { id: 4, memberName: "Naruto"  }, 
        { id: 5, memberName: "Naruto" }, 
        { id: 6, memberName: "Naruto"  }, 
        { id: 7, memberName: "Naruto"  }, 
        { id: 8, memberName: "Naruto" }, 
        { id: 9, memberName: "Naruto"  }, 
        { id: 10, memberName: "Naruto"  }, 
        { id: 11, memberName: "Naruto"  }, 
        { id: 12, memberName: "Naruto"  }, 
        { id: 13, memberName: "Naruto"  }, 
        { id: 14, memberName: "Naruto"  }, 
        { id: 15, memberName: "Naruto"  }, 
        { id: 16, memberName: "Naruto"  }, 
        { id: 17, memberName: "Naruto"  }, 
        { id: 18, memberName: "Naruto"  }, 
        { id: 19, memberName: "Naruto"  }, 
        { id: 20, memberName: "Naruto"  }, 
        { id: 21, memberName: "Naruto"  }, 
        { id: 22, memberName: "Naruto"  }, 
        { id: 23, memberName: "Naruto"  }, 
        { id: 24, memberName: "Naruto"  }, 
        { id: 25, memberName: "Naruto"  }, 
        { id: 26, memberName: "Naruto"  }, 
        { id: 27, memberName: "Naruto"  }, 
        { id: 28, memberName: "Naruto"  }, 
        { id: 29, memberName: "Naruto"  }, 
        { id: 30, memberName: "Naruto"  }, 
      ];
  
    return (
        <div>
          <div>
            {listMember?.map((member) => {
              return (
                <div className="member-in-chat-wrapper" key={member.id}>

                <div className="member-image">
                  <img src="" alt="" />
                </div>

                <div className="member-name">
                  <span>{member.memberName}</span>
                </div>
              
              </div>
            );
          })}
                   
        </div>

        </div>
    )
}


export default MemberList;