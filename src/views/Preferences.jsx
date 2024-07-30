import React, { useState, useEffect } from 'react';

import preferencesAudio from "../audio/preferencesBtns.mp3"
import startQuiz from "../audio/startQuiz.mp3"

function firstLetterUppercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Preferences({ handleChangeUserName, inputValue, formData, setFormData, handleShowGame , colorScheme , setColorScheme }) {
  const getRandomValues = (array, num) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const [randomCategories, setRandomCategories] = useState([]);

  const handleCheckboxChange = (scheme) => {
    if (!scheme) return
    setColorScheme(scheme);
  
    // Remove any existing color scheme class
    document.documentElement.classList.remove('easy', 'hard');
    // Add the new color scheme class
    document.documentElement.classList.add(scheme);
  };
  

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    new Audio(preferencesAudio).play();

    if(type === 'radio' && name === 'difficulty'){
    
        
        handleCheckboxChange(value)
  
    }

    if (type === 'radio' || type === 'text') {
      if (name === 'categories' && value === 'mixed') {
        const mixedCategories = getRandomValues([
          'general_knowledge', 'music', 'sport_and_leisure', 'food_and_drink', 'history',
          'society_and_culture', 'science', 'arts_and_literature', 'film_and_tv', 'geography'
        ], 3); // Adjust the number of random categories you want
        setRandomCategories(mixedCategories);
        setFormData((prevState) => ({
          ...prevState,
          [name]: 'mixed',
          categories: ['mixed']
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else if (type === 'checkbox') {
      setFormData((prevState) => {
        let newCategories;
        if (checked) {
          newCategories = [...prevState.categories.filter(category => category !== 'mixed'), value];
        } else {
          newCategories = prevState.categories.filter((category) => category !== value);
        }
        return { ...prevState, categories: newCategories };
      });
    }
  };

  const handleSubmit = (event) => {
    new Audio(startQuiz).play()
    event.preventDefault();
    const { difficulty, questionLimit, categories } = formData;
    const categoriesToUse = categories.includes('mixed') ? randomCategories : formData.categories;
    const categoriesString = categoriesToUse.join(',');
    const apiLink = `https://the-trivia-api.com/api/questions?difficulty=${difficulty}&limit=${questionLimit}&categories=${categoriesString}`;

    handleShowGame();
  };

  useEffect(() => {
    setFormData({
      difficulty: 'medium',
      questionLimit: '5',
      categories: [],
    });
  }, [setFormData]);

  useEffect(() => {
    if (formData.categories.includes('mixed')) {
      const mixedCategories = getRandomValues([
        'general_knowledge', 'music', 'sport_and_leisure', 'food_and_drink', 'history',
        'society_and_culture', 'science', 'arts_and_literature', 'film_and_tv', 'geography'
      ], 3); // Adjust the number of random categories you want
      setRandomCategories(mixedCategories);
    }
    console.log('formData updated:', formData);
  }, [formData]);


  useEffect(() => {
    // Apply the color scheme when the difficulty changes
    handleCheckboxChange(formData.difficulty);
  }, [formData.difficulty]);

  return (
    <>
      <div className="user-info--container">
        <h3 className="username">{inputValue}</h3>
        <button className="arrow-left-btn" type="button" onClick={handleChangeUserName}>
          &#x2039;<span>change username</span>
        </button>
      </div>
      <h2 className="preferences-message">
        <span className="clr-accent">
          {inputValue}
        </span>{" "}
        Oh jeez!
        <br />
        Set up some stuff and make it <span className="clr-accent">squeez!</span>
      </h2>
      <form className="flex preferences-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="legend">Difficulty</legend>
          <div className="flex get-difficulty--container">
            <div>
              <input
                type="radio"
                id="easy"
                name="difficulty"
                value="easy"
                onChange={handleInputChange}
                checked={formData.difficulty === 'easy'}
              />
              <label className="btn-input" htmlFor="easy">
                Easy
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="medium"
                name="difficulty"
                value="medium"
                onChange={handleInputChange}
                checked={formData.difficulty === 'medium'}
              />
              <label className="btn-input" htmlFor="medium">
                Medium
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="hard"
                name="difficulty"
                value="hard"
                onChange={handleInputChange}
                checked={formData.difficulty === 'hard'}
              />
              <label className="btn-input" htmlFor="hard">
                Hard
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend className="legend">Number of questions</legend>
          <div className="flex get-questionLimit--container">
            <div>
              <input
                type="radio"
                id="limit_5"
                name="questionLimit"
                value="5"
                onChange={handleInputChange}
                checked={formData.questionLimit === '5'}
              />
              <label className="btn-input" htmlFor="limit_5">
                5
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="limit_10"
                name="questionLimit"
                value="10"
                onChange={handleInputChange}
                checked={formData.questionLimit === '10'}
              />
              <label className="btn-input" htmlFor="limit_10">
                10
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="limit_15"
                name="questionLimit"
                value="15"
                onChange={handleInputChange}
                checked={formData.questionLimit === '15'}
              />
              <label className="btn-input" htmlFor="limit_15">
                15
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="limit_20"
                name="questionLimit"
                value="20"
                onChange={handleInputChange}
                checked={formData.questionLimit === '20'}
              />
              <label className="btn-input" htmlFor="limit_20">
                20
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend className="legend">Categories</legend>
          <div className="flex get-categories--container">
            <div className="default-category--container">
              <input
                type="radio"
                id="mixed_categories"
                name="categories"
                value="mixed"
                onChange={handleInputChange}
                checked={formData.categories.includes('mixed')}
              />
              <label className="btn-input" htmlFor="mixed_categories">
                Mixed
              </label>
            </div>
            <div className="flex other-categories--wrapper">
              <div className="flex other-categories--container">
                <div>
                  <input
                    type="checkbox"
                    id="general_knowledge"
                    name="categories"
                    value="general_knowledge"
                    onChange={handleInputChange}
                    checked={formData.categories.includes('general_knowledge')}
                    disabled={formData.categories.includes('mixed')}
                  />
                  <label className="btn-input" htmlFor="general_knowledge">
                    General Knowledge
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="music"
                    name="categories"
                    value="music"
                    onChange={handleInputChange}
                    checked={formData.categories.includes('music')}
                    disabled={formData.categories.includes('mixed')}
                  />
                  <label className="btn-input" htmlFor="music">
                    Music
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="sport_and_leisure"
                    name="categories"
                    value="sport_and_leisure"
                    onChange={handleInputChange}
                    checked={formData.categories.includes('sport_and_leisure')}
                    disabled={formData.categories.includes('mixed')}
                  />
                  <label className="btn-input" htmlFor="sport_and_leisure">
                    Sport & Leisure
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="food_and_drink"
                    name="categories"
                    value="food_and_drink"
                    onChange={handleInputChange}
                    checked={formData.categories.includes('food_and_drink')}
                    disabled={formData.categories.includes('mixed')}
                  />
                  <label className="btn-input" htmlFor="food_and_drink">
                    Food & Drink
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="history"
                    name="categories"
                    value="history"
                    onChange={handleInputChange}
                    checked={formData.categories.includes('history')}
                    disabled={formData.categories.includes('mixed')}
                  />
                  <label className="btn-input" htmlFor="history">
                    History
                  </label>
                </div>
              </div>
              <div className="flex other-categories--container">
                <div>
                  <input
                    type="checkbox"
                    id="society_and_culture"
                    name="categories"
                    value="society_and_culture"
                    onChange={handleInputChange}
                    checked={formData.categories.includes('society_and_culture')}
                    disabled={formData.categories.includes('mixed')}
                  />
                  <label className="btn-input" htmlFor="society_and_culture">
                    Society & Culture
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="science"
                    name="categories"
                    value="science"
                    onChange={handleInputChange}
                    checked={formData.categories.includes('science')}
                    disabled={formData.categories.includes('mixed')}
                  />
                  <label className="btn-input" htmlFor="science">
                    Science
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="arts_and_literature"
                    name="categories"
                    value="arts_and_literature"
                    onChange={handleInputChange}
                    checked={formData.categories.includes('arts_and_literature')}
                    disabled={formData.categories.includes('mixed')}
                  />
                  <label className="btn-input" htmlFor="arts_and_literature">
                    Arts & Literature
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="film_and_tv"
                    name="categories"
                    value="film_and_tv"
                    onChange={handleInputChange}
                    checked={formData.categories.includes('film_and_tv')}
                    disabled={formData.categories.includes('mixed')}
                  />
                  <label className="btn-input" htmlFor="film_and_tv">
                    Film & TV
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="geography"
                    name="categories"
                    value="geography"
                    onChange={handleInputChange}
                    checked={formData.categories.includes('geography')}
                    disabled={formData.categories.includes('mixed')}
                  />
                  <label className="btn-input" htmlFor="geography">
                    Geography
                  </label>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <button type="submit" className="btn-nav-startQuiz">
          <span className="clr-accent">Squeez</span> me!
        </button>
      </form>
    </>
  );
}

export default Preferences;




