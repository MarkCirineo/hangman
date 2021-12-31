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
    const [currentWord, setCurrentWord] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [answerArrayState, setAnswerArrayState] = useState([]);
    const [correctGuesses, setCorrectGuesses] = useState([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState([]);

    const startGame = () => {
        setIsPlaying(true);
        setGuesses([]);
        setCurrentWord(getWord());
    }

    const playAgain = () => {
        const li = document.querySelectorAll(".letter");
        setCorrectGuesses([]);
        setIncorrectGuesses([]);
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
        if (answerArrayState.includes(letter)) {
            setCorrectGuesses([...correctGuesses, letter]);
        } else {
            setIncorrectGuesses([...incorrectGuesses, letter]);
        }
        if (!answerArrayState.includes("_")) {
            console.log("You win");
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
                    <div className="col-10">
                        <ul className="d-flex justify-content-center flex-wrap">
                            {letters.map((letter, i) => (
                                <li
                                    key={i}
                                    className="letter"
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
                    <div className="col-10 container d-flex justify-content-center">
                        <div className="col-5">
                            <h3>Correct Guesses</h3>
                            <ul className="d-flex justify-content-center flex-wrap">
                                {correctGuesses.length === 0 ? (
                                    <p>-</p>
                                ): (
                                    <>
                                    {correctGuesses.map((letter, i) => (
                                        <li
                                            key={i}
                                            className="guessed"
                                        >
                                            {letter}
                                        </li>
                                    ))}
                                    </>
                                )}
                                
                            </ul>
                        </div>
                        <div className="col-5">
                            <h3>Incorrect Guesses</h3>
                            <ul className="d-flex justify-content-center flex-wrap">
                                {incorrectGuesses.length === 0 ? (
                                    <p>-</p>
                                ): (
                                    <>
                                    {incorrectGuesses.map((letter, i) => (
                                        <li
                                            key={i}
                                            className="guessed"
                                        >
                                            {letter}
                                        </li>
                                    ))}
                                    </>
                                )}
                                
                            </ul>
                        </div>
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