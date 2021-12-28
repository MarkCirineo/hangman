import React, { useState } from "react";
import { Button } from "react-bootstrap";
import words from "an-array-of-english-words";
import "./Game.css";

const Game = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const [isPlaying, setIsPlaying] = useState(false);
    // const [isWin, setIsWin] = useState(false);
    // const [isLoss, setIsLoss] = useState(false);
    const [currentWord, setCurrentWord] = useState("");
    const [guesses, setGuesses] = useState([]);

    const startGame = () => {
        setIsPlaying(true);
        setGuesses([]);
        setCurrentWord(getWord());
    }

    const getWord = () => {
        const i = Math.floor(Math.random() * words.length);
        return words[i];
    }

    const handleLetterClick = (e) => {
        const letter = e.target.textContent.toLowerCase();
        e.target.classList.add("hide")
        setGuesses([...guesses, letter]);
        // console.log(currentWord);
        checkLetter(letter);
    }


    const checkLetter = (letter) => {
        // console.log(letter);
        // console.log(guesses);
    }

    return (
        <div className="game container d-flex justify-content-center flex-wrap text-center">
            {isPlaying ? (
                <>
                    <div className="col-8">
                        <h1>Guess the word</h1>
                    </div>
                    <div className="col-8">
                        <h2>*diagram*</h2>
                    </div>
                    <div className="col-8">
                        <h3>_ _ _ _ _ _</h3>
                    </div>
                    <div className="col-8">
                        <ul className="d-flex justify-content-center">
                            {letters.map((letter, i) => (
                                <li
                                    key={i}
                                    onClick={handleLetterClick}
                                >
                                    {letter}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <Button 
                    className="col-4 col-md-1"
                    onClick={startGame}
                >
                    Play
                </Button>
            )}
            
            
        </div>
    )
}

export default Game;