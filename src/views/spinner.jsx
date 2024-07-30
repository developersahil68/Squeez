import React, { useState, useEffect } from 'react';
import spinner from "../img/favicon.png";
import "../App.css";

function Spinner() {

 const [percent , setPercent] = useState(0)
   
   useEffect(() =>{

    const increment = 100 / 400;
  
    const intervalId = setInterval(() => {
      setPercent( prevPercent =>{
        if(prevPercent >= 100){
          clearInterval(intervalId)
          return 100
        }
        return prevPercent + increment
      } )
 
    }, 1);
  }, [])



  return (
    <div className="flex loading-window--container fade-in">
      <div className="flex spinner--container">
        <img src={spinner} alt="spinner" title="spinner" />
      </div>
      <h3>LOADING...</h3>
      <div className="progress-bar">
        <div className="progress" style={{width: percent + '%'}} ></div>
      </div>
      <div className="progress-text">{Math.round(percent)}%</div>
    </div>
  );
}

export default Spinner;
