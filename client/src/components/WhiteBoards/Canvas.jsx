import React, { useState, useEffect, useRef, useContext } from "react";
import { SocketContext } from "../../utils/context/SocketContext";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Canvas = (props) => {
  const user = useSelector((state) => state.auth?.currentUser);
  const contextRef = useRef();
  const canvasRef = useRef();
  const params = useParams();
  const [isInitial, setIsInitial] = useState(false);
  const socket = useContext(SocketContext);
  const canvasId = params.canvasId;

  useEffect(() => {
    var sendCanvas = function (canvas) {
      var base64ImageData = canvas.toDataURL("image/png");
      socket.emit("canvas-data", { image: base64ImageData, canvasId: canvasId });
    };

    if (!isInitial) initialCanvas();
    socket.emit("join-stream", {
      streamId: canvasId,
      userId: user._id,
    });

    contextRef.current.lineWidth = props.size;
    contextRef.current.lineJoin = "round";
    contextRef.current.lineCap = "round";
    contextRef.current.strokeStyle = props.color;

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };
    const rMouse = document.getElementById("sketch");

    canvasRef.current.addEventListener(
      "mousemove",
      function (pos) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = pos.pageX - rMouse.offsetLeft;
        mouse.y = pos.pageY - rMouse.offsetTop;
      },
      false
    );

    canvasRef.current.addEventListener(
      "mousedown",
      function () {
        canvasRef.current.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvasRef.current.addEventListener(
      "mouseup",
      function () {
        canvasRef.current.removeEventListener("mousemove", onPaint, false);
        sendCanvas(canvasRef.current);
      },
      false
    );

    var onPaint = function () {
      contextRef.current.beginPath();
      contextRef.current.moveTo(last_mouse.x, last_mouse.y);
      contextRef.current.lineTo(mouse.x, mouse.y);
      contextRef.current.closePath();
      contextRef.current.stroke();
    };

    socket.on("canvas-data", (data) => {
      receiveCanvas(data, canvasRef.current);
    });
  }, [props.size, props.color, isInitial, socket, canvasId, user._id]);

  const initialCanvas = () => {
    var canvas = document.querySelector("#board");
    var context = canvas.getContext("2d");
    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    contextRef.current = context;
    canvasRef.current = canvas;
    setIsInitial(true);
  };



  var receiveCanvas = function (data, canvas) {
    var image = new Image();
    var context = canvas.getContext("2d");
    image.onload = function () {
      context.drawImage(image, 0, 0);
    };
    image.src = data;
  };

  return (
    <div className="sketch" id="sketch">
      <canvas className="board" id="board"></canvas>
    </div>
  );
};

export default Canvas;
