import "./style.css";
import React, { useEffect, useRef, useState, useContext } from "react";
import Peer from "peerjs";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../utils/context/SocketContext";
import { useSelector } from "react-redux";
import { FaPaperPlane } from "react-icons/fa";

const StreamContext = () => {
  const user = useSelector((state) => state.auth?.currentUser);
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState("");
  const params = useParams();
  const streamId = params.streamID;

  const [id, setId] = useState();
  const [currentPeer, setPeer] = useState(null);
  const [mystream, setmystream] = useState(null);

  const messagesEnd = useRef();

  const socket = useContext(SocketContext);

  useEffect(() => {
    var peers = {};
    const callList = [];
    var myId = "";
    var videoList = {};
    myId = user._id;

    const iceServers = {
      iceServers: [
        {
          urls: "stun:openrelay.metered.ca:80",
        },
        {
          urls: "turn:openrelay.metered.ca:80",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
        {
          urls: "turn:openrelay.metered.ca:443",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
        {
          urls: "turn:openrelay.metered.ca:443?transport=tcp",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
      ],
    };

    const myNavigator =
      navigator.mediaDevices.getUserMedia ||
      navigator.mediaDevices.webkitGetUserMedia ||
      navigator.mediaDevices.mozGetUserMedia ||
      navigator.mediaDevices.msGetUserMedia;

    myNavigator({
      video: true,
      audio: true,
    }).then((stream) => {
      console.log(stream);
      peers[myId] = createPeerConnection();
      createVideo({ id: myId, stream: stream });

      peers[myId].on("open", (peerId) => {
        console.log("New user i connected: ", peerId);
        setId(myId);
        socket.emit("join-stream", {
          streamId: streamId,
          userId: myId,
          peerId: peerId,
        });

        setmystream(stream);

        socket.on("new-user-connect", (data) => {
          peers[data.userId] = createPeerConnection();
          console.log("New user connected: ", data.peerId);
          connectToNewUser(data.userId, data.peerId, stream);
        });

        console.log("bf call");
        peers[myId].on("call", (call) => {
          call.answer(stream);
          console.log("call");
          call.on("stream", (userVideoStream) => {
            console.log("userId: " + call.metadata.id);
            if (!callList[call.peer]) {
              createVideo({ id: call.metadata.id, stream: userVideoStream });
              callList[call.peer] = call;
            }
          });
          setPeer(call);
        });

        socket.on("user-disconnected", (userId) => {
          console.log("user-disconnected ", userId);
          removeVideo(userId);
          console.log(callList.length);
        });
      });
      socket.on("sendDataServer", (dataGot) => {
        console.log(dataGot);
        setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
        scrollToBottom();
      });
    });

    let createPeerConnection = () => {
      const pc = new Peer({
        host: "peer2nesconnect.herokuapp.com",
        debug: true,
        path: "/stream",
        secure: true,
        config: iceServers,
      });
      return pc;
    };

    function createVideo(createVideo) {
      if (!videoList[createVideo.id]) {
        console.log("craetea; " + videoList[createVideo.id]);
        const videoContainer = document.getElementById("video-grid");
        const video = document.createElement("video");
        video.srcObject = createVideo.stream;
        video.id = createVideo.id;
        video.autoplay = true;
        videoContainer.appendChild(video);
        let totalUsers = document.getElementsByTagName("video").length;
        console.log(totalUsers);
        if (totalUsers > 1) {
          for (let index = 0; index < totalUsers; index++) {
            document.getElementsByTagName("video")[index].style.width =
              100 / totalUsers + "%";
          }
        }
        videoList[createVideo.id] = videoContainer;
      }
    }

    const connectToNewUser = (userId, peerId, stream) => {
      console.log("stream");
      var call = peers[myId].call(peerId, stream, { metadata: { id: myId } });
      console.log(call);
      call.on("stream", (userVideoStream) => {
        if (!callList[userId]) {
          createVideo({ id: userId, stream: userVideoStream });
          callList[userId] = call;
        }
      });
      call.on("close", () => {
        console.log("closing new user", userId);
        removeVideo(userId);
      });
      call.on("error", () => {
        console.log("peer error ------");
      });
      setPeer(call);
    };

    const removeVideo = (id) => {
      delete videoList[id];
      delete callList[id];
      const video = document.getElementById(id);
      if (video) video.remove();
    };
  }, [streamId, socket, user._id]);
  ///////////////////////////////////////////////////////////////////////
  const sendMessage = () => {
    if (message !== null) {
      const msgWithUser = user.username + ": " + message;
      const msg = {
        content: msgWithUser,
        id: id,
      };
      socket.emit("sendDataClient", { msg: msg, streamId: streamId });
      console.log(id);
      setMessage("");
    }
  };

  const renderMess = mess.map((m, index) => (
    <div
      key={index}
      className={`${
        m.msg.id === id ? "your-message" : "other-people"
      } chat-item`}
    >
      {m.msg.content}
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
        const screenTrack = stream.getVideoTracks()[0];
        console.log(currentPeer);
        let sender = currentPeer.peerConnection.getSenders().find(function (s) {
          return s.track.kind === screenTrack.kind;
        });
        sender.replaceTrack(screenTrack);
        screenTrack.onended = () => {
          let sender = currentPeer.peerConnection
            .getSenders()
            .find(function (s) {
              return s.track.kind === screenTrack.kind;
            });
          sender.replaceTrack(mystream.getVideoTracks()[0]);
        };
      });
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="stream-wrapper">
      <div className="stream-container">
        <div className="box-chat">
          <div className="box-chat_message">
            {renderMess}
            <div ref={messagesEnd}></div>
          </div>

          <div className="send-box">
            <textarea
              value={message}
              onKeyDown={onEnterPress}
              onChange={handleChange}
              placeholder="Send a message to everyone"
            />
            <button className="send-message-btn" onClick={sendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </div>

        <div className="stream-video-wrapper">
          <div id="video-grid"></div>
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
          <div
            className="stream_controls_button"
            onClick={() => openInNewTab("/whiteboard/" + streamId + "-canvas")}
          >
            <span>White Board</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamContext;
