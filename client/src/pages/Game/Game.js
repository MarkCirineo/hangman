import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import words from "an-array-of-english-words";
import "./Game.css";
import Word from "../../components/Word/Word";
import Diagram from "../../components/Diagram/Diagram";

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
    const [remainingGuesses, setRemainingGuesses] = useState(6);
    const [isWin, setIsWin] = useState(false);
    const [isLoss, setIsLoss] = useState(false);

    const startGame = () => {
        setIsPlaying(true);
        setGuesses([]);
        setCurrentWord(getWord());
        setIsWin(false);
        setIsLoss(false);
        setRemainingGuesses(6);
    }

    const playAgain = () => {
        setCorrectGuesses([]);
        setIncorrectGuesses([]);
        document.querySelectorAll(".letter").forEach(li => {
            li.classList.remove("hide");
        });
        document.querySelector(".letter-container").classList.remove("hide");
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
            setRemainingGuesses(remainingGuesses - 1);
        }
    }

    const checkResult = () => {
        if (remainingGuesses === 0) {
            console.log("You lose");
            setIsLoss(true);
            document.querySelector(".letter-container")?.classList.add("hide");
        }
        if (!answerArrayState.includes("_")) {
            console.log("You win");
            setIsWin(true);
            document.querySelector(".letter-container")?.classList.add("hide");
        }
    }

    useEffect(() => {
        checkResult();
    });

    return (
        <div className="game container d-flex justify-content-center flex-wrap text-center">
            {isPlaying ? (
                <>
                    <div className="col-8">
                        <h1>Guess the word</h1>
                    </div>
                    <div className="col-8 diagram-container">
                        <Diagram 
                            remainingGuesses={remainingGuesses}
                        />
                    </div>
                    <div className="col-8">
                        <h3>
                            <Word 
                                answerArrayState={answerArrayState}
                            />
                        </h3>
                    </div>
                    <div className="col-10">
                        <ul className="d-flex justify-content-center flex-wrap letter-container">
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
                    {(() => {
                        if (isLoss) {
                            return (
                                <>
                                    <div className="col-8 loss">
                                        <h3><span>You lost!</span> The correct answer was <span>{currentWord}.</span></h3>
                                    </div>
                                    <div className="col-8 play-again" >
                                        <Button 
                                            className="col-8 col-md-3"
                                            onClick={playAgain}
                                        >
                                            Play Again
                                        </Button>
                                    </div>
                                </>
                            )
                        } else if (isWin) {
                            return (
                                <>
                                    <div className="col-8 win">
                                        <h3>You won!</h3>
                                    </div>
                                    <div className="col-8 play-again" >
                                        <Button 
                                            className="col-8 col-md-3"
                                            onClick={playAgain}
                                        >
                                            Play Again
                                        </Button>
                                    </div>
                                </>
                            )
                        } else {
                            <></>
                        }
                    })()}
                    <div className="col-12 container d-flex justify-content-center">
                        <div className="col-4 correct">
                            <h3>Correct Guesses</h3>
                            <ul className="d-flex justify-content-center flex-wrap">
                                {correctGuesses.length === 0 ? (
                                    <li className="hyphen">-</li>
                                ) : (
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
                        <div className="col-4">
                            <h3>Remaining Guesses:</h3>
                            <h3>{remainingGuesses}</h3>
                        </div>
                        <div className="col-4 incorrect">
                            <h3>Incorrect Guesses</h3>
                            <ul className="d-flex justify-content-center flex-wrap">
                                {incorrectGuesses.length === 0 ? (
                                    <li className="hyphen">-</li>
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