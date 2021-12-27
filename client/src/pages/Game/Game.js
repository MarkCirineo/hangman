import React from "react";
import { Button } from "react-bootstrap";
import "./Game.css"

const Game = () => {
    return (
        <div className="game container d-flex justify-content-center">
            <Button className="col-4 col-md-1" >Play</Button>
        </div>
    )
}

export default Game;