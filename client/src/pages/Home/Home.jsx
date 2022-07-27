import React from "react";

import "./Home.css";

export default function Home() {
  return (
    <div className="Home">
      <title>Home page</title>
      <div className="Content">
        <h1>
          <p>Video meeting, available for all</p>

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
          <button> Join</button>
        </div>
      </div>
    </div>
  );
}
