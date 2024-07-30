import React, {useState} from 'react';
import '../App.css'
import Tellmemore from './Tellmemore';


function Welcome2({inputValue, handleShowRules, handleChangeUserName, handlePreferences}) {

  return (
    <div>
      <div className="flex welcome-window--message ">
        <h2>Hi <span className="username clr-primary"> {inputValue} </span>...</h2>
        <h3>it's</h3>
        <h1><span className="clr-accent">Squeez</span> time!</h1>
      </div>
            
      <div className="readyForQuiz--container ">
        <h2>Ready for a <span className="clr-primary">quiz</span> challenge?</h2>
        <div className="welcome-window--btns-container">
          <button className="btn-nav-toPreferences" type="button" onClick={handlePreferences} >Almost <span className="clr-accent">ready...</span></button>
          <div className="flex welcome-minibtns">
            <button className="btn-nav-changeUsername" type="button" onClick={handleChangeUserName}>Change <span className="clr-accent">username</span></button>
            <button className="btn-nav-showQuizRules" onClick={handleShowRules} type="button">Tell me <span className="clr-accent">more</span></button>
          </div>
        </div>
      </div>
     


    </div>
  );
}

export default Welcome2;
