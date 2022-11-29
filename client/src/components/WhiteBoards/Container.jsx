import React from "react";
import { io } from "socket.io-client";
import Board from "./Canvas";
import "./style.css";

class Container extends React.Component {
  pencil;
  socket = io(process.env.REACT_APP_WEBSOCKET_URL, {
    withCredentials: true,
  });

  constructor(props) {
    super(props);

    this.state = {
      color: "#000000",
      size: "5",
    };
  }

  changeColor(params) {
    this.setState({
      color: params.target.value,
    });
  }

  changeSize(params) {
    this.setState({
      size: params.target.value,
    });
  }

  clearCanvas() {
    var canvas = document.querySelector("#board");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var base64ImageData = canvas.toDataURL("image/png");
    this.socket.emit("canvas-data", base64ImageData);
  }

  useEraser() {
    this.pencil = {
      color: this.state.color,
      size: this.state.size,
    };
    this.setState({
      color: "white",
      size: 20,
    });
  }

  usePencil() {
    if (this.pencil != null) {
      this.setState({
        color: this.pencil.color,
        size: this.pencil.size,
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="tools-section">
          <div className="color-picker-container">
            Select Brush Color : &nbsp;
            <input
              type="color"
              value={this.state.color}
              onChange={this.changeColor.bind(this)}
            />
          </div>

          <div className="brushsize-container">
            Select Brush Size : &nbsp;
            <select
              value={this.state.size}
              onChange={this.changeSize.bind(this)}
            >
              <option> 5 </option>
              <option> 10 </option>
              <option> 15 </option>
              <option> 20 </option>
              <option> 25 </option>
              <option> 30 </option>
            </select>
          </div>

          <div className="canvas-button">
            <button onClick={() => this.clearCanvas()}> Clear </button>
          </div>
          <div className="canvas-button">
            <button onClick={() => this.useEraser()}> Eraser </button>
          </div>
          <div className="canvas-button">
            <button onClick={() => this.usePencil()}> Pencil </button>
          </div>
        </div>

        <div className="board-container">
          <Board color={this.state.color} size={this.state.size}></Board>
        </div>
      </div>
    );
  }
}

export default Container;
