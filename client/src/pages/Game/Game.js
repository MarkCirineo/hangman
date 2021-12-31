import React, { useState } from "react";
import { Button } from "react-bootstrap";
import words from "an-array-of-english-words";
import "./Game.css";
import Word from "../../components/Word/Word";

const Game = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const getWord = () => {
        const i = Math.floor(Math.random() * words.length);
        const randomWord = words[i];
        let answerArray = [];
        for (let i = 0; i < randomWord.length; i++) {
            answerArray[i] = "_"
        }
        setAnswerArrayState(answerArray);
        return randomWord;
    }

    const [isPlaying, setIsPlaying] = useState(false);
    // const [isWin, setIsWin] = useState(false);
    // const [isLoss, setIsLoss] = useState(false);
    const [currentWord, setCurrentWord] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [answerArrayState, setAnswerArrayState] = useState([]);

    const startGame = () => {
        setIsPlaying(true);
        setGuesses([]);
        setCurrentWord(getWord());
    }

    const playAgain = () => {
        const li = document.querySelectorAll(".hide");
        li.forEach(li => {
            li.classList.remove("hide");
        })
        startGame();
    }

    const handleLetterClick = (e) => {
        const letter = e.target.textContent.toLowerCase();
        e.target.classList.add("hide");
        setGuesses([...guesses, letter]);
        // console.log(currentWord);
        let answerArray = answerArrayState;
        for (let j = 0; j < currentWord.length; j++) {
            if (currentWord[j] === letter) {
                answerArray[j] = letter;
            }
            setAnswerArrayState(answerArray);
        }
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
                        <h3>
                            <Word 
                                answerArrayState={answerArrayState}
                            />
                        </h3>
                    </div>
                    <div className="col-8">
                        <ul className="d-flex justify-content-center flex-wrap">
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
                    {answerArrayState.includes("_") ? (
                        <></>
                    ) : (
                        <div className="col-8" >
                            <Button 
                                className="col-8 col-md-3"
                                onClick={playAgain}
                            >
                                Play Again
                            </Button>
                        </div>
                    )}
                    
                    
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