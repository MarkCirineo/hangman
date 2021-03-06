import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import words from "an-array-of-english-words";
import "./Game.css";
import Word from "../../components/Word/Word";
import Diagram from "../../components/Diagram/Diagram";
import { useMutation } from "@apollo/client";
import { LOSE, WIN } from "../../utils/mutations";
import Auth from "../../utils/auth";
import countries from "../../utils/countries.json";

const Game = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const getWord = (d) => {
        let wordArray = [];
        switch (d) {
            case "easy":
                wordArray = words.filter(word => word.length > 6);
                break;
            case "standard":
                wordArray = words;
                break;
            case "hard":
                wordArray = words.filter(word => word.length < 6);
                break;
            default:
                break;
        }

        const i = Math.floor(Math.random() * wordArray.length);
        const randomWord = wordArray[i];

        let answerArray = [];
        for (let i = 0; i < randomWord.length; i++) {
            answerArray[i] = "_"
        }
        setAnswerArrayState(answerArray);
        return randomWord;
    }

    const getMovie = async () => {
        const movieData = await (await fetch(`https://k2maan-moviehut.herokuapp.com/api/random`)).json();
        const movie = movieData.name;
        // let disallowedRegex = new RegExp(/[0-9$&+,:;=?@#|'<>.^*()%!-]/);
        let alphabetRegex = new RegExp(/[A-Za-z]/);
    
        let answerArray = [];
        for (let i = 0; i < movie.length; i++) {
            if (!movie[i].match(alphabetRegex)) {
                answerArray[i] = movie[i];
            } else if (movie[i] === " ") {
                answerArray[i] = " ";
            } else {
                answerArray[i] = "_";
            }
        }
        setWaitingForMovie(false);
        setAnswerArrayState(answerArray);
        return movie;
    }

    const getCountry = () => {
        const i = Math.floor(Math.random() * countries.length);
        const country = countries[i];
        let alphabetRegex = new RegExp(/[A-Za-z]/);

        let answerArray = [];
        for (let i = 0; i < country.length; i++) {
            if (!country[i].match(alphabetRegex)) {
                answerArray[i] = country[i];
            } else if (country[i] === " ") {
                answerArray[i] = " ";
            } else {
                answerArray[i] = "_";
            }
        }
        setAnswerArrayState(answerArray);
        return country;
    }

    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [currentWord, setCurrentWord] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [answerArrayState, setAnswerArrayState] = useState([]);
    const [correctGuesses, setCorrectGuesses] = useState([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState([]);
    const [remainingGuesses, setRemainingGuesses] = useState(6);
    const [isWin, setIsWin] = useState(false);
    const [isLoss, setIsLoss] = useState(false);
    const [difficulty, setDifficulty] = useState("");
    const [category, setCategory] = useState("");
    const [waitingForMovie, setWaitingForMovie] = useState(false);

    const startEasy = () => {
        setRemainingGuesses(7);
        setCurrentWord(getWord("easy"));
        setDifficulty("easy");
        setCategory("");
        startGame();
    }

    const startStandard = () => {
        setRemainingGuesses(6);
        setCurrentWord(getWord("standard"));
        setDifficulty("standard");
        setCategory("");
        startGame();
    }

    const startHard = () => {
        setRemainingGuesses(5);
        setCurrentWord(getWord("hard"));
        setDifficulty("hard");
        setCategory("");
        startGame();
    }

    const startMovie = async () => {
        setRemainingGuesses(6);
        setWaitingForMovie(true);
        setCurrentWord(await getMovie());
        setDifficulty("standard");
        setCategory("movie");
        startGame();
    }

    const startCountry = () => {
        setRemainingGuesses(6);
        setCurrentWord(getCountry());
        setDifficulty("standard");
        setCategory("country");
        startGame();
    }

    const startGame = () => {
        setCorrectGuesses([]);
        setIncorrectGuesses([]);
        document.querySelectorAll(".letter")?.forEach(li => {
            li.classList.remove("hide");
        });
        document.querySelector(".letter-container")?.classList.remove("hide");

        setIsPlaying(true);
        setGuesses([]);
        setIsWin(false);
        setIsLoss(false);
        setGameOver(false);
    }

    const playAgain = () => {
        setCorrectGuesses([]);
        setIncorrectGuesses([]);
        document.querySelectorAll(".letter").forEach(li => {
            li.classList.remove("hide");
        });
        document.querySelector(".letter-container").classList.remove("hide");
        if (category) {
            switch (category) {
                case "movie":
                    startMovie();
                    break;
                case "country":
                    startCountry();
                    break;
                default:
                    break;
            }
        } else {
            switch (difficulty) {
                case "easy":
                    startEasy();
                    break;
                case "standard":
                    startStandard();
                    break;
                case "hard":
                    startHard();
                    break;
                default:
                    break;
            }
        }
    }

    const handleLetterClick = (e) => {
        const letter = e.target.textContent.toLowerCase();
        e.target.classList.add("hide");
        setGuesses([...guesses, letter]);
        // console.log(currentWord);
        let answerArray = answerArrayState;
        for (let j = 0; j < currentWord.length; j++) {
            if (currentWord[j] === letter || currentWord[j] === letter.toUpperCase()) {
                answerArray[j] = letter;
            }
            setAnswerArrayState(answerArray);
        }
        if (answerArrayState.includes(letter) || answerArrayState.includes(letter.toUpperCase())) {
            setCorrectGuesses([...correctGuesses, letter]);
        } else {
            setIncorrectGuesses([...incorrectGuesses, letter]);
            setRemainingGuesses(remainingGuesses - 1);
        }
    }

    const [addWin] = useMutation(WIN);
    const [addLoss] = useMutation(LOSE);

    const winMutation = async () => {
        if (!Auth.loggedIn()) {
            return;
        }
        let points = 0;
        switch (difficulty) {
            case "easy":
                points = 1;
                break;
            case "standard":
                points = 2;
                break;
            case "hard":
                points = 3;
                break;
            default:
                break;
        }
        await addWin({
            variables: { points }
        });
        // console.log(isPlaying);
    }

    const loseMutation = async () => {
        if (!Auth.loggedIn()) {
            return;
        }
        await addLoss();
    }

    const checkResult = () => {
        if (!isPlaying) { return; }
        if (gameOver) { return; }
        if (remainingGuesses === 0) {
            console.log("You lose");
            setIsLoss(true);
            document.querySelector(".letter-container")?.classList.add("hide");
            loseMutation();
            setGameOver(true);
        }
        if (!answerArrayState.includes("_")) {
            console.log("You win");
            setIsWin(true);
            document.querySelector(".letter-container")?.classList.add("hide");
            winMutation();
            setGameOver(true);
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
                                    <div className="col-6 play-again d-flex justify-content-evenly">
                                        <Button 
                                            className="col-6 mx-1 col-md-4"
                                            onClick={playAgain}
                                        >
                                            Play Again
                                        </Button>
                                        <Button 
                                            className="col-6 mx-1 col-md-4"
                                            onClick={() => {setIsPlaying(false)}}
                                        >
                                            Change Difficulty
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
                                    <div className="col-6 play-again d-flex justify-content-evenly">
                                        <Button 
                                            className="col-6 mx-1 col-md-4"
                                            onClick={playAgain}
                                        >
                                            Play Again
                                        </Button>
                                        <Button 
                                            className="col-6 mx-1 col-md-4"
                                            onClick={() => {setIsPlaying(false)}}
                                        >
                                            Change Difficulty
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
                <>
                {waitingForMovie ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className="container d-flex flex-wrap justify-content-center">
                        <h1 className="col-10">Select a Difficulty</h1>
                        <div className="col-12 col-sm-10 pt-3 justify-content-evenly d-flex">
                            <Button 
                                className="col-3 col-md-3 col-lg-2"
                                onClick={startEasy}
                            >
                                Easy
                            </Button>
                            <Button 
                                className="col-3 col-md-3 col-lg-2"
                                onClick={startStandard}
                            >
                                Standard
                            </Button>
                            <Button 
                                className="col-3 col-md-3 col-lg-2"
                                onClick={startHard}
                            >
                                Hard
                            </Button>
                        </div>
                        <h2 className="col-10 pt-3">Or</h2>
                        <h1 className="col-10">Choose a Category</h1>
                        <div className="col-12 col-sm-10 pt-3 justify-content-evenly d-flex">
                            <Button 
                                    className="col-3 col-md-3 col-lg-2"
                                    onClick={startMovie}
                                >
                                    Movie Titles
                            </Button>
                            <Button 
                                    className="col-3 col-md-3 col-lg-2"
                                    onClick={startCountry}
                                >
                                    Country Names
                            </Button>
                        </div>
                    </div>
                )}  
                </>
            )}
        </div>
    )
}

export default Game;