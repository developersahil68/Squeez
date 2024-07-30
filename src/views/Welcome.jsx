import React, { useState } from 'react';

import '../App.css'
import correctUsername from '../audio/correctUsername.mp3'

function Welcome({onFormSubmit  , inputValue ,  setInputValue}) {

  const handleSubmit = (event) =>{
    event.preventDefault()
   if(!inputValue){
    return 
   }
    new Audio(correctUsername).play();
    
    onFormSubmit()
  }



  const handleChange = (event) =>{
    setInputValue(event.target.value)
  }
  return (
    <div>
   
      <form className="flex username-form fade-in" onSubmit={handleSubmit}>
        <div className="username-input--error-message opacity-zero"></div>
        <label htmlFor="username">My friends call me</label>
        <input type="text" value={inputValue} onChange={handleChange} id="username" name="username" maxLength="16" autoComplete="off" autoFocus />
        <button className="arrow-right-btn" type="submit">&#x203A;</button>
      </form>
      
     
    </div>
  );
}

export default Welcome;
