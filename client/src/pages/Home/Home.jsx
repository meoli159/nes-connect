import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import "./Home.css";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (roomId.length <= 3) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [roomId]);
  return (
    <>
      <Navigation />
      <body>
        <div className="Home">
          <title>Home page</title>
          <div className="Content">
            <h1>
              <p>
                Video meeting, available for all
              </p>
              
              <p>home, work, school and gaming</p>
            </h1>
          </div>
          <div className="roomFunction">
            <div className="community">
              <button>Join community</button>
            </div>
            <div className="roomBtn">
              <button> Create new meeting</button>
              <input placeholder="Enter meeting Id" type="text" />
              <button disabled={isButtonDisabled}> Join</button>
            </div>
          </div>
        </div>
      </body>
      <Footer />
    </>
  );
}
