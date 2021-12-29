import React from "react";

const Word = props => {   
    return (
        <>
            {props.answerArrayState.map((letter, i) => {
                return (
                    <span
                        key={i}
                        className="letter-value"
                    >
                        {letter}
                    </span>
                )
            })}
        </>
    )
}

export default Word;