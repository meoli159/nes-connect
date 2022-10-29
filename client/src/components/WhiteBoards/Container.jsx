import React from 'react';
import Board from './Board';
import './style.css'

class Container extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            color: "#000000",
            size: "5"
        }
    }

    render() {

        return (
            <div className="container">
                <div className="tools-section">
                    <div className="color-picker-container">
                        <input type="color"/>
                    </div>
                </div>

                <div className="board-container">
                    <Board></Board>
                </div>
            </div>
        )
    }
}

export default Container