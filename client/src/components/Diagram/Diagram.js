import React from "react";
import diagram1 from "../../img/diagram1.png";
import diagram2 from "../../img/diagram2.png";
import diagram3 from "../../img/diagram3.png";
import diagram4 from "../../img/diagram4.png";
import diagram5 from "../../img/diagram5.png";
import diagram6 from "../../img/diagram6.png";
import diagram7 from "../../img/diagram7.png";

const Diagram = (props) => {
    return (
        <>
            {(() => {
                if (props.remainingGuesses === 6) {
                    return (
                        <img alt="Empty hangman diagram" src={diagram1}/>
                    )
                } else if (props.remainingGuesses === 5) {
                    return (
                        <img alt="Hangman diagram with head" src={diagram2}/>
                    )
                } else if (props.remainingGuesses === 4) {
                    return (
                        <img alt="Hangman diagram with head and body" src={diagram3}/>
                    )
                } else if (props.remainingGuesses === 3) {
                    return (
                        <img alt="Hangman diagram with head, body, and 1 leg" src={diagram4}/>
                    )
                } else if (props.remainingGuesses === 2) {
                    return (
                        <img alt="Hangman diagram with head, body, and 2 legs" src={diagram5}/>
                    )
                } else if (props.remainingGuesses === 1) {
                    return (
                        <img alt="Hangman diagram with head, body, and 2 legs, and 1 arm" src={diagram6}/>
                    )
                } else if (props.remainingGuesses === 0) {
                    return (
                        <img alt="Hangman diagram with head, body, and 2 legs, and 2 arms" src={diagram7}/>
                    )
                }
            })()}  
        </>
    )
}

export default Diagram;