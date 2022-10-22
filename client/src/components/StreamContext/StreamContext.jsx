import "./style.css";
import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";
import Peer from "peerjs";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../utils/context/SocketContext";
/*
import io from "socket.io-client";
const ENDPOINT = "http://localhost:3333";
var socket;*/

const StreamContext = () => {
  const socketRef = useContext(SocketContext);
  const params = useParams();
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState("");
  const streamId = params.streamID;
  var myId = "";
  var peer;
  var myVideoStream;
  var videoContainer = {};
  const [id, setId] = useState();

  const [mystream, setmystream] = useState(null);

  const messagesEnd = useRef();
  //socketRef.current = io.connect("http://localhost:3333");

  useEffect(() => {
    peer = new Peer();

    peer.on("open", (peerId) => {
      myId = peerId;
      socketRef.emit("join-stream", {
        streamId: streamId,
        userId: myId,
      });

      const myNavigator =
        navigator.mediaDevices.getUserMedia ||
        navigator.mediaDevices.webkitGetUserMedia ||
        navigator.mediaDevices.mozGetUserMedia ||
        navigator.mediaDevices.msGetUserMedia;

      myNavigator({
        video: true,
        audio: true,
      }).then((stream) => {
        //userVideo.current.srcObject = stream;
        createVideo({ id: myId, stream: stream });
        setmystream(stream);

        socketRef.on("new-user-connect", (userId) => {
          console.log("New user connected: ", userId);
          setId(userId);
          connectToNewUser(userId, stream);
        });

        peer.on("call", (call) => {
          call.answer(stream);
          console.log("call");
          call.on("stream", (userVideoStream) => {
            console.log(call.metadata.id);
            createVideo({ id: call.metadata.id, stream: userVideoStream });
          });
        });

        socketRef.on("user-disconnected", (userId) => {
          console.log("user-disconnected ", userId);
          removeVideo(userId);
        });
      });

      socketRef.on("sendDataServer", (dataGot) => {
        setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
        scrollToBottom();
      });
    });
  }, []);

  function createVideo(createVideo) {
    if (!videoContainer[createVideo.id]) {
      const videoContainer = document.getElementById("video-grid");
      if (myId === createVideo.id) {
        console.log("My video");
        myVideoStream = document.createElement("video");
        myVideoStream.srcObject = createVideo.stream;
        myVideoStream.id = createVideo.id;
        myVideoStream.autoplay = true;
        //myVideoStream.muted = true;
        videoContainer.appendChild(myVideoStream);
      } else {
        const video = document.createElement("video");
        video.srcObject = createVideo.stream;
        video.id = createVideo.id;
        video.autoplay = true;
        videoContainer.appendChild(video);
      }
      let totalUsers = document.getElementsByTagName("video").length;
      //console.log(totalUsers);
      if (totalUsers > 1) {
        for (let index = 0; index < totalUsers; index++) {
          document.getElementsByTagName("video")[index].style.width =
            100 / totalUsers + "%";
        }
      }
    } else {
      //document.getElementById(createVideo.id)?.srcObject = createVideo.stream;
      console.log("createVideo");
    }
  }

  const connectToNewUser = (userId, stream) => {
    var call = peer.call(userId, stream, { metadata: { id: myId } });
    console.log(call);
    call.on("stream", (userVideoStream) => {
      createVideo({ id: userId, stream: userVideoStream });
    });
    call.on("close", () => {
      console.log("closing new user", userId);
      removeVideo(userId);
    });
    call.on("error", () => {
      console.log("peer error ------");
    });
  };

  const removeVideo = (id) => {
    delete videoContainer[id];
    const video = document.getElementById(id);
    if (video) video.remove();
  };

  const sendMessage = () => {
    if (message !== null) {
      const msg = {
        content: message,
        id: id,
      };
      socketRef.current.emit("sendDataClient", msg);

      setMessage("");
    }
  };

  const renderMess = mess.map((m, index) => (
    <div
      key={index}
      className={`${m.id === id ? "your-message" : "other-people"} chat-item`}
    >
      {m.content}
    </div>
  ));

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const playStop = () => {
    const enabled = mystream.getVideoTracks()[0].enabled;
    if (enabled) {
      mystream.getVideoTracks()[0].enabled = false;
      setPlayVideo();
    } else {
      setStopVideo();
      mystream.getVideoTracks()[0].enabled = true;
    }
  };

  const muteUnmute = () => {
    const enabled = mystream.getAudioTracks()[0].enabled;
    if (enabled) {
      mystream.getAudioTracks()[0].enabled = false;
      setUnmuteButton();
    } else {
      setMuteButton();
      mystream.getAudioTracks()[0].enabled = true;
    }
  };

  const setPlayVideo = () => {
    const html = `<span class="unmute">Resume Video</span>`;
    document.getElementById("playPauseVideo").innerHTML = html;
  };

  const setStopVideo = () => {
    const html = `<span class="">Pause Video</span>`;
    document.getElementById("playPauseVideo").innerHTML = html;
  };

  const setUnmuteButton = () => {
    const html = `<span>Unmute</span>`;
    document.getElementById("muteButton").innerHTML = html;
  };

  const setMuteButton = () => {
    const html = `<span>Mute</span>`;
    document.getElementById("muteButton").innerHTML = html;
  };

  const shareScreen = () => {
    navigator.mediaDevices
      .getDisplayMedia({
        video: {
          cursor: "always",
        },
        audio: false,
      })
      .then(function (stream) {
        createVideo({ id: myId, stream: stream });
      });
  };

  return (
    <div className="stream">
      <div className="stream-container">
        <div className="stream-video-wrapper">
          <div id="video-grid"></div>
        </div>

        <div className="box-chat">
          <div className="box-chat_message">
            {renderMess}
            <div
              style={{ float: "left", clear: "both" }}
              ref={messagesEnd}
            ></div>
          </div>

          <div className="send-box">
            <textarea
              value={message}
              onKeyDown={onEnterPress}
              onChange={handleChange}
              placeholder="Nhập tin nhắn ..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>

      <div className="stream_controls">
        <div className="stream_controls_block">
          <div
            className="stream_controls_button"
            id="muteButton"
            onClick={muteUnmute}
          >
            <span>Mute</span>
          </div>
          <div
            className="stream_controls_button"
            id="playPauseVideo"
            onClick={playStop}
          >
            <span>Pause Video</span>
          </div>
          <div
            className="stream_controls_button"
            id="shareScreenButton"
            onClick={shareScreen}
          >
            <span>Share Screen</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamContext;
