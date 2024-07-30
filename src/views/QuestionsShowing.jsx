import React, { useState, useEffect, useRef } from 'react';
import Spinner from './spinner';
import Loading from './Loading';
import correctAnswerAudio from '../audio/correctAnswer.mp3';
import wrongAnswerAudio from '../audio/wrongAnswer.mp3';
import changeQuestionAudio from '../audio/changeQuestion.mp3';

function QuestionsShowing({ formData, fetchData, setFetchData, currentQuestionIndex, setCurrentQuestionIndex, handleNextQuestion, totalPoints, setTotalPoints, correctAnswer, setCorrectAnswer, inputValue, totalTime, setTotalTime, setGameDate, gameDate }) {
  const { difficulty, questionLimit, categories } = formData;
 
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [bonusPoints, setBonusPoints] = useState(3);
  const timerRef = useRef(null);
  const [points, setPoints] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const correctAnswerAudioRef = useRef(new Audio(correctAnswerAudio));
  const wrongAnswerAudioRef = useRef(new Audio(wrongAnswerAudio));
  const changeQuestionAudioRef = useRef(new Audio(changeQuestionAudio));

  const shuffleAnswers = (correctAnswer, incorrectAnswers) => {
    const answers = [correctAnswer, ...incorrectAnswers];
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    setBonusPoints(3);
    const startTime = Date.now();

    timerRef.current = setInterval(() => {
      const elapsedTime = (Date.now() - startTime) / 1000;

      if (elapsedTime >= 5 && elapsedTime < 10) {
        setBonusPoints(2);
      } else if (elapsedTime >= 10) {
        setBonusPoints(1);
        clearInterval(timerRef.current);
      }
    }, 1000);
  };

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetch(`https://the-trivia-api.com/api/questions?difficulty=${difficulty}&limit=${questionLimit}&categories=${categories}`);
        const jsonData = await response.json();
        setFetchData(jsonData);
        if (jsonData.length > 0) {
          setShuffledAnswers(shuffleAnswers(jsonData[0].correctAnswer, jsonData[0].incorrectAnswers));
          startTimer();
          setStartTime(Date.now());
          setGameDate(formatDate(new Date()));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromApi();
  }, [difficulty, questionLimit, categories]);

  useEffect(() => {
    if (fetchData.length > 0) {
      setShuffledAnswers(shuffleAnswers(fetchData[currentQuestionIndex].correctAnswer, fetchData[currentQuestionIndex].incorrectAnswers));
      changeQuestionAudioRef.current.play();
      startTimer();
      setStartTime(Date.now());
    }
  }, [currentQuestionIndex, fetchData]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswerSelected(true);
    clearInterval(timerRef.current);

    if (answer !== fetchData[currentQuestionIndex].correctAnswer) {
      wrongAnswerAudioRef.current.play();
      setBonusPoints(1);
    } else {
      correctAnswerAudioRef.current.play();
    }

    const calcPoints = () => {
      let pointsAwarded = 0;
      if (answer === fetchData[currentQuestionIndex].correctAnswer) {
        setCorrectAnswer((prevAnswer) => prevAnswer + 1);
        if (difficulty === 'easy') {
          pointsAwarded = 1 * bonusPoints;
        } else if (difficulty === 'medium') {
          pointsAwarded = 2 * bonusPoints;
        } else if (difficulty === 'hard') {
          pointsAwarded = 3 * bonusPoints;
        }
      }
      setPoints(pointsAwarded);
      setTotalPoints(prevTotalPoints => prevTotalPoints + pointsAwarded);
    };
    calcPoints();

    setTimeout(() => {
      setIsLoading(true);
      setTimeout(() => {
        if (currentQuestionIndex < fetchData.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setIsAnswerSelected(false);
          setIsLoading(false);
        } else {
          setEndTime(Date.now());
          setIsLoading(false);
          handleNextQuestion();

          if (endTime && startTime) {
            const totalTimeTaken = (endTime - startTime) / 1000;
            setTotalTime(totalTimeTaken);
          }
        }
      }, 500);
    }, 1000);
  };

  const currentQuestion = fetchData[currentQuestionIndex];

  if (isLoading) return <Loading />;
  if (!currentQuestion) return <p>Loading...</p>;

  return (
    <div className="flex game-window">
      <div className='cover2'>
        <div className='cover1'>
          <div>
            <h3 className="usernameEl">{inputValue}</h3>
          </div>
          <div className="flex game-info">
            <div className="flex user-info--difficulty-container">
              <p>Difficulty:</p>
              <p className="clr-accent">{difficulty}</p>
            </div>
            <div className="flex user-info--points-container">
              <p>Points: </p>
              <p className="total-points">{totalPoints}</p>
            </div>
          </div>
        </div>
        <div className="flex bonus-time--container">
          <h3>bonus</h3>
          <h3 className="clr-accent">x{bonusPoints}</h3>
        </div>
      </div>
      <div className="flex question--container">
        <h4 className="question-number--legend">{`${currentQuestionIndex + 1}/${fetchData.length}`}</h4>
        <h4 className="question-category--legend">{currentQuestion.category} : {difficulty}</h4>
        <p className="flex">{currentQuestion.question}</p>
        <div className="flex answers--container">
          {shuffledAnswers.map((answer, i) => (
            <button
              key={i}
              className={`btn-answer ${
                isAnswerSelected
                  ? answer === currentQuestion.correctAnswer
                    ? 'correct-answer'
                    : selectedAnswer === answer
                    ? 'incorrect-answer'
                    : ''
                  : ''
              }`}
              onClick={() => handleAnswerClick(answer)}
              disabled={isAnswerSelected}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionsShowing;








