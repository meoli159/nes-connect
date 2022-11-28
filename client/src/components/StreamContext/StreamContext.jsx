import "./style.css";
import React, { useEffect, useRef, useState, useContext } from "react";
import Peer from "peerjs";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../utils/context/SocketContext";
//import { useSelector } from "react-redux";
import { FaPaperPlane } from "react-icons/fa";

const StreamContext = () => {
  //const user = useSelector((state) => state.auth?.currentUser);
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
    var peer;
    const callList = [];
    var myId = "";
    var videoContainer = {};

    const iceServers = {
      iceServers: [
        { url: "stun:stun01.sipphone.com" },
        { url: "stun:stun.ekiga.net" },
        { url: "stun:stun.fwdnet.net" },
        { url: "stun:stun.ideasip.com" },
        { url: "stun:stun.iptel.org" },
        { url: "stun:stun.rixtelecom.se" },
        { url: "stun:stun.schlund.de" },
        { url: "stun:stun.l.google.com:19302" },
        { url: "stun:stun1.l.google.com:19302" },
        { url: "stun:stun2.l.google.com:19302" },
        { url: "stun:stun3.l.google.com:19302" },
        { url: "stun:stun4.l.google.com:19302" },
        { url: "stun:stunserver.org" },
        { url: "stun:stun.softjoys.com" },
        { url: "stun:stun.voiparound.com" },
        { url: "stun:stun.voipbuster.com" },
        { url: "stun:stun.voipstunt.com" },
        { url: "stun:stun.voxgratia.org" },
        { url: "stun:stun.xten.com" }
      ],
    };

    peer = new Peer({
      host: "peer2nesconnect.herokuapp.com",
      debug: true,
      path: "/stream",
      secure: true,
      config: iceServers,
    });

    //////////
    peer.on("open", (peerId) => {
      console.log("peerId: " + peerId);
      myId = peerId;
      setId(myId);
      socket.emit("join-stream", {
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
        createVideo({ id: myId, stream: stream });
        console.log(peerId);
        setmystream(stream);

        socket.on("new-user-connect", (userId) => {
          console.log("New user connected: ", userId);
          connectToNewUser(userId, stream);
        });

        peer.on("call", (call) => {
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

    function createVideo(createVideo) {
      if (!videoContainer[createVideo.id]) {
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
      }
    }

    const connectToNewUser = (userId, stream) => {
      console.log(stream);
      var call = peer.call(userId, stream, { metadata: { id: myId } });
      call.on("stream", (userVideoStream) => {
        console.log("stream");
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
      delete videoContainer[id];
      delete callList[id];
      const video = document.getElementById(id);
      if (video) video.remove();
    };
  }, [streamId, socket]);

  const sendMessage = () => {
    if (message !== null) {
      const msg = {
        content: message,
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
      console.log(mystream.getVideoTracks()[0]);
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