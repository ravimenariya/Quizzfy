// src/QuizPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { quizTitle, quizDescription, quizTimeLimitSeconds, questions } from './QuizData'; // Import your data


const QuizPage = () => {
  // State for user answers: { questionId: selectedOptionId, ... }
  const [userAnswers, setUserAnswers] = useState({});
  // State for the timer
  const [timeLeft, setTimeLeft] = useState(quizTimeLimitSeconds);
  // State to track if the quiz is submitted or time ran out
  const [quizFinished, setQuizFinished] = useState(false);
  // State for showing the results (after finished)
  const [score, setScore] = useState(null);

  /**
   * Calculates the final score.
   */
  const calculateScore = useCallback(() => {
    let correctCount = 0;
    questions.forEach(q => {
      // Check if the user's answer matches the correct answer ID
      if (userAnswers[q.id] === q.answerId) {
        correctCount++;
      }
    });
    setScore(correctCount);
  }, [userAnswers]);

  /**
   * Submits the quiz and sets the finished state.
   */
  const handleSubmit = useCallback(() => {
    setQuizFinished(true);
    calculateScore();
  }, [calculateScore]);

  // Timer Effect
  useEffect(() => {
    if (timeLeft > 0 && !quizFinished) {
      // Set up the interval to decrement the timer every second
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      // Clean up the interval when the component unmounts or the effect re-runs
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && !quizFinished) {
      // Time is up, auto-submit the quiz
      handleSubmit();
    }
  }, [timeLeft, quizFinished, handleSubmit]);

  /**
   * Handles user ticking an option.
   * @param {number} questionId - The ID of the question being answered.
   * @param {string} optionId - The ID of the selected option.
   */
  const handleOptionChange = (questionId, optionId) => {
    if (!quizFinished) {
      setUserAnswers(prevAnswers => ({
        ...prevAnswers,
        [questionId]: optionId,
      }));
    }
  };

  /**
   * Renders the score card after the quiz is finished.
   */
const renderResults = () => {
  if (score === null) return null; // Wait for score calculation

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border-t-4 border-indigo-500 transition duration-500">
      <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">Quiz Results 🎉</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        You answered {score} out of {questions.length} questions correctly.
      </p>
      <p className="text-4xl font-extrabold text-green-600 dark:text-green-400">
        Your Score: <span className="text-5xl">{Math.round((score / questions.length) * 100)}%</span>
      </p>
      <button
        onClick={() => window.location.reload()} // Simple reload to restart
        className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
      >
        Try Again
      </button>

      <div className='mt-8'>
        {/* Re-render questions for review in the results section */}
        {questions.map((q, index) => renderQuestion(q, index, true))}
      </div>
    </div>
  );
};

/**
 *

 * Renders a single question block.
 * @param {boolean} isReviewMode - Flag to adjust presentation in review vs active quiz
 */
const renderQuestion = (q, index, isReviewMode = false) => {
  const isCorrect = userAnswers[q.id] === q.answerId;
  const userAnswer = userAnswers[q.id];
  const userSelected = !!userAnswer;
  const finalState = quizFinished || isReviewMode;

  // Tailwind classes for result display
  let resultClass = 'border-gray-300 dark:border-gray-700';
  if (finalState) {
    if (isCorrect) {
      resultClass = 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30'; // Correct answer feedback
    } else if (userSelected) {
      resultClass = 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/30';    // Incorrect answer feedback
    } else {
      resultClass = 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800';
    }
  }

  return (
    <div
      key={q.id}
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 transition duration-500 ${resultClass} border-2`}
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        {index + 1}. {q.questionText}
        {finalState && (
          <span className={`ml-3 text-sm font-semibold transition duration-300 ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isCorrect ? ' (Correct!)' : (userSelected ? ' (Incorrect)' : ' (Not Answered)')}
          </span>
        )}
      </h3>

      <div className="space-y-3">
        {q.options.map(option => {
          const isUserSelection = userAnswer === option.id;
          const isAnswer = q.answerId === option.id;

          let optionBgClass = 'bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600';
          if (!finalState && isUserSelection) {
            // Active quiz: Selected option style
            optionBgClass = 'bg-indigo-100 dark:bg-indigo-900 ring-2 ring-indigo-500 dark:ring-indigo-400';
          } else if (finalState) {
            // Review mode: Highlighting correct/incorrect
            if (isAnswer) {
              optionBgClass = 'bg-green-200 dark:bg-green-600 ring-2 ring-green-600 dark:ring-green-400'; // Correct answer
            } else if (isUserSelection && !isCorrect) {
              optionBgClass = 'bg-red-200 dark:bg-red-700 ring-2 ring-red-600 dark:ring-red-400'; // User's incorrect answer
            }
          }


          return (
            <div
              key={option.id}
              className={`flex items-center p-3 rounded-lg transition duration-200 shadow-sm
                          ${finalState ? '' : 'cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/50'}
                          ${optionBgClass}`}
              onClick={() => handleOptionChange(q.id, option.id)}
            >
              <input
                type="radio"
                name={`question-${q.id}`}
                id={`q${q.id}-${option.id}`}
                checked={isUserSelection}
                onChange={() => handleOptionChange(q.id, option.id)}
                disabled={finalState}
                className="w-5 h-5 text-indigo-600 border-gray-300 dark:border-gray-500 dark:bg-gray-800 focus:ring-indigo-500 cursor-pointer"
              />
              <label
                htmlFor={`q${q.id}-${option.id}`}
                className={`ml-3 text-base font-medium w-full cursor-pointer
                            ${isAnswer && finalState ? 'font-bold text-green-800 dark:text-green-200' : 'text-gray-700 dark:text-gray-200'}`}
              >
                <span className="inline-block w-6 font-mono text-center text-indigo-700 dark:text-indigo-400">{option.id.toUpperCase()}.</span> {option.text}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Convert seconds to a human-readable format (MM:SS)
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const pad = (num) => String(num).padStart(2, '0');
  return `${pad(minutes)}:${pad(remainingSeconds)}`;
};

return (
  // Apply 'dark' class based on state to the root element
  <div >
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 transition duration-500">
      <div className="max-w-4xl mx-auto">

        {/* Fixed Sidebar/Status Panel */}
        <div className="fixed top-15 right-5 w-[200px] bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl z-20 border-b-4 border-indigo-500 flex flex-col items-center justify-center transition duration-500">
        

          {/* Timer Display */}
          <div
            className={`text-2xl font-bold p-2 px-4 rounded-full shadow-inner transition duration-500
                        ${timeLeft <= 10 && !quizFinished ? 'bg-red-500 text-white animate-pulse' : 'bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-200'}`}
          >
            ⏳ {formatTime(timeLeft)}
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-4">
            Attempted : <span className="font-semibold text-indigo-600 dark:text-indigo-400">{Object.keys(userAnswers).length} / {questions.length}</span>
          </p>
        </div>

        {/* Header Section: Title and Description */}
        <header className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-8 border-b-4 border-indigo-500 transition duration-500">
          <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-2">{quizTitle} 📝</h1>
          <p className="text-gray-600 dark:text-gray-300">{quizDescription}</p>
        </header>

        {/* Main Content */}
        <main>
          {quizFinished ? (
            renderResults()
          ) : (
            <>
              {/* Quiz Questions */}
              {questions.map((q, index) => renderQuestion(q, index))}

              {/* Submit Button */}
              <div className="mt-10 mb-20 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={quizFinished}
                  className="px-10 py-4 bg-indigo-600 text-white text-xl font-bold rounded-lg shadow-2xl hover:bg-indigo-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Quiz
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  </div>
);
};

export default QuizPage;