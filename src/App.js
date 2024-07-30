import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import Spinner from "./views/spinner";
import githublogo from "./img/github.png";
import html from "./img/html5.png";
import css from "./img/css3.png";
import js from "./img/javascript.png";
import reactlogo from "./img/react.png";
import Welcome from "./views/Welcome";
import Welcome2 from "./views/Welcome2";
import Tellmemore from "./views/Tellmemore";
import Preferences from "./views/Preferences";
import Loading from "./views/Loading";
import QuestionsShowing from "./views/QuestionsShowing";
import Result from "./views/Result";
import Records from "./views/Records";
import navBtns from './audio/navBtns.mp3';
import gameOver from'./audio/gameOver.mp3';
import deleteRecords from'./audio/deleteRecord.mp3';
import Credits from'./views/Credits';

function App() {
  const [showSpinner, setShowSpinner] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showWelcome2, setShowWelcome2] = useState(false);
  const [showTellmemore, setShowTellmemore] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({
    difficulty: '',
    questionLimit: '',
    categories: [],
  });
  const [showGame, setShowGame] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [showRecords, setShowRecords] = useState(false);
  const [totalTime, setTotalTime] = useState(null);
  const [gameDate, setGameDate] = useState("");

  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [recordsDeleted, setRecordsDeleted] = useState(false);

  const [colorScheme, setColorScheme] = useState('');
  const [showBlob, setShowBlob] = useState(true); 
  const [showMessage, setShowMessage] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
      setShowWelcome(true);
    }, 2000);
  }, []);

  const handleFormSubmit = () => {
    setShowWelcome(false);
    setShowWelcome2(true);
  };

  const handleShowRules = () => {
    new Audio(navBtns).play();
    setShowWelcome2(false);
    setShowTellmemore(true);
  };

  const handleCloseRules = () => {
    setShowTellmemore(false);
    setShowWelcome2(true);
  };

  const handleChangeUserName = () => {
    new Audio(navBtns).play();
    setShowWelcome(true);
    setShowWelcome2(false);
    setShowPreferences(false);
  };

  const handlePreferences = () => {
    new Audio(navBtns).play();
    setShowLoading(true);
    setShowWelcome2(false);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setShowRecords(false);
    setFetchData([]);
    setTimeout(() => {
      setShowLoading(false);
      setShowPreferences(true);
    }, 500);
  };

  const handleShowGame = () => {
    setShowSpinner(false);
    setShowWelcome(false);
    setShowPreferences(false);
    setShowGame(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < fetchData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowGame(false);
      setShowResult(true);
      new Audio(gameOver).play();
    }
  };

  const handleShowRecords = () => {
    setShowWelcome2(false);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setShowGame(false);
    setShowRecords(true);
  };

  const handleDeleteRecords = () => {
    new Audio(deleteRecords).play();
    console.log("Ss");
    setShowRecords(true);
    setShowDeleteComponent(false);
    setRecordsDeleted(true);
  };

  const handleBlobToggle = () => {
    setShowBlob(!showBlob);
    if (showBlob) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000); 
        }
  };

  const handleThankYou = () => {
    setShowThankYou(true);
  };

  const closeCredits = () => {
    setShowThankYou(false);
  };

  return (
    <div className="flex wrapper">
      {showBlob && <div className="blobEl"></div>} 
      <div className="windows-container">
        <section className="flex loading-window">
          {!showThankYou && showSpinner && <Spinner />}
          {!showThankYou && showWelcome && <Welcome onFormSubmit={handleFormSubmit} inputValue={inputValue} setInputValue={setInputValue} />}
          {!showThankYou && showWelcome2 && <Welcome2 inputValue={inputValue} setInputValue={setInputValue} handleShowRules={handleShowRules} handleChangeUserName={handleChangeUserName} handlePreferences={handlePreferences} />}
          {!showThankYou && showTellmemore && <Tellmemore inputValue={inputValue} setInputValue={setInputValue} handleCloseRules={handleCloseRules} />}
          {!showThankYou && showLoading && <Loading />}
          {!showThankYou && showPreferences && <Preferences handlePreferences={handlePreferences} handleChangeUserName={handleChangeUserName} inputValue={inputValue} formData={formData} setFormData={setFormData} handleShowGame={handleShowGame} colorScheme={colorScheme} setColorScheme={setColorScheme} />}
          {!showThankYou && showGame && !showResult && <QuestionsShowing currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} fetchData={fetchData} setFetchData={setFetchData} formData={formData} setFormData={setFormData} handleNextQuestion={handleNextQuestion} totalPoints={totalPoints} setTotalPoints={setTotalPoints} correctAnswer={correctAnswer} setCorrectAnswer={setCorrectAnswer} inputValue={inputValue} totalTime={totalTime} setTotalTime={setTotalTime} gameDate={gameDate} setGameDate={setGameDate} />}
          {!showThankYou && showResult && <Result handlePreferences={handlePreferences} inputValue={inputValue} totalPoints={totalPoints} correctAnswer={correctAnswer} fetchData={fetchData} handleShowRecords={handleShowRecords} />}
          {!showThankYou && showRecords && <Records inputValue={inputValue} formData={formData} fetchData={fetchData} correctAnswer={correctAnswer} totalPoints={totalPoints} totalTime={totalTime} gameDate={gameDate} handlePreferences={handlePreferences} handleDeleteRecords={handleDeleteRecords} setShowDeleteComponent={setShowDeleteComponent} showDeleteComponent={showDeleteComponent} recordsDeleted={recordsDeleted} />}
          {showThankYou && <Credits closeCredits={closeCredits} />}
        </section>

        {!showThankYou && (
          <>
            <div className="sound-btn--container">
              <input type="checkbox" id="btn-sound-onoff" name="btn-sound-onoff" value="btn-sound-onoff" className="input-sound" defaultChecked />
              <label className="btn-sound-onoff" htmlFor="btn-sound-onoff">sound</label>
              <div className="sound--message opacity-zero">
                <p>Sound off</p>
              </div>
            </div>

            <div className="blob-btn--container">
              <input type="checkbox" id="btn-blob-onoff" name="btn-blob-onoff" value="btn-blob-onoff" className="input-blob" checked={showBlob} onChange={handleBlobToggle} />
              <label className="btn-blob-onoff" htmlFor="btn-blob-onoff">blob</label>
              <div className={`blob--message ${showMessage ? '' : 'opacity-zero'}`}>
                <p>Best for slow devices</p>
              </div>
            </div>
          </>
        )}
      </div>

      {!showThankYou && (
        <div className="flex footer">
          <div className="flex github">
            <p>Deployed on <span className="clr-accent">july 2024</span></p>
            <a  target="_blank">
              <img src={githublogo} alt="" title="linkto: github_AdM" />
            </a>
          </div>
          <div className="flex signature">
            <p>Made by </p>
            <a href="/" className="clr-accent" target="_blank" title="linkto: linkedin_AdM">Sahil Khan</a>
            <p> with</p>
            <div>
              <img src={html} alt="" title="HTML5" />
              <img src={css} alt="" title="CSS3" />
              <img src={js} alt="" title="JavaScript ECMAScript 2024" />
              <img src={reactlogo} alt="" title="React JS" />
            </div>
          </div>
          <div className="flex credits">
            <p>Thank</p>
            <a onClick={handleThankYou} className="clr-accent credits-popup--link" target="_blank" title="open popup-credits">y❤️u!</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;







