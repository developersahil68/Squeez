import React from 'react';
import "../App.css";

function Credits({closeCredits}) {
  return (
    <div className="flex credits-popup--container">
      <button className="btn-close-popup" onClick={closeCredits}>X</button>
      <h2>And the credits go to...</h2>
      <p>For questions and answers:</p>
      <a href="https://the-trivia-api.com/" className="clr-accent" target="_blank" rel="noopener noreferrer">THE TRIVIA API</a>
      <p>For the blob idea:</p>
      <a href="https://codepen.io/thedevenv/pen/JjrXayd" className="clr-accent" target="_blank" rel="noopener noreferrer">This pen by theDevEnv</a>
      <p>For the starting idea and all the patience:</p>
      <p className="clr-accent">Sahil Khan</p><br />
      <h2>That's all folks!</h2>
    </div>
  );
}

export default Credits;
