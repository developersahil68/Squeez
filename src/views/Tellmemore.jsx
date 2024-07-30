import React, {useState} from "react";
import Welcome2 from "./Welcome2";

function Tellmemore({inputValue, setInputValue, handleCloseRules}) {



    return (
      <div className="quizRules-popup--container">
        <button className="btn-close-popup" onClick={handleCloseRules}>X</button>
        <h2>Rules Suck</h2>
        <h3>Difficulty and categories:</h3>
        <p>
          Users can choose from three difficulty levels (easy, medium, hard and shuffle mode) and ten different categories of questions. By clicking on the <em>"ALMOST READY..."</em> button, you will access the quiz settings page.
        </p>
        <h3>Scoring system:</h3>
        <p>
          The scoring system is based on difficulty of the question <span className="clr-accent">(hard: x3, medium: x2, easy: x1)</span> and time taken to answer. For each correct answer, difficulty bonus will be multiplied for time bonus, that is based on the response time:
          <br />- For the <span className="clr-accent">first five seconds</span>: the bonus multiplier will be <span className="clr-accent">x3</span>.
          <br />- For the <span className="clr-accent">next five seconds</span>: the bonus multiplier will be <span className="clr-accent">x2</span>.
          <br />After that, no time multiplier will be applied.
        </p>
      </div>
    );
  }
  export default Tellmemore