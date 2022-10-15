import "./style.css";
import React from "react";
import StreamContext from "../../components/StreamContext/StreamContext";

/*
import io from "socket.io-client";
const ENDPOINT = "http://localhost:3333";
var socket;*/

function Stream() {
  return (
    <StreamContext />
);
}

export default Stream;
