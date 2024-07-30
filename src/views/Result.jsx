import React, { useState, useEffect } from 'react';
import "../App.css";

function Result({ handlePreferences, inputValue, totalPoints ,correctAnswer, fetchData , handleShowRecords}) {
    return (
        <div class="flex result--overlay">
        <div class="flex result--container">     
          <div class="flex result--header">               
            <h2>Congratulations</h2>
            <h2><span class="clr-accent">{inputValue}!</span></h2>
            <p>The quiz is over and you scored <span class="clr-accent">{totalPoints} points</span> with {correctAnswer}/{fetchData.length}!</p>
          </div>
          <div class="result--btns-container">
            <button class="btn-nav-restartQuiz" onClick={handlePreferences} ><span class="clr-accent">Squeez</span> me again!</button>
            <button class="btn-nav-showRecords" onClick={handleShowRecords}><span class="clr-accent">Show</span> records</button>
          </div>
        </div>
      </div>
    
    )
}

export default Result;