import React, { useState, useEffect, useCallback } from "react";
import { useNavigate }  from "react-router-dom"

const TempQuizPage = ({ quiz }) => {
  // console.log("(TempQuizPage.jsx) here to display quiz", quiz);

  // State for user answers: { questionId: selectedOptionId, ... }
  const [UserAnswers, setUserAnswers] = useState({}); 
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimitMinutes * 60);
  const [quizFinished, setQuizFinished] = useState(false);
  const [attemptState, setAttemptState] = useState("attempting");
  const navigate = useNavigate();

  /**
   * Submits the quiz and sets the finished state.
   */
  const handleSubmit = useCallback(() => {
  setQuizFinished(true);
  setAttemptState("submitting");
  // This console.log will now show the correct, updated map:
  console.log("submitting quiz => ", UserAnswers); 
    setTimeout(()=>{setAttemptState("submitted")},1500)
  }, [UserAnswers]);

  // Timer Effect
  useEffect(() => {
    if (timeLeft > 0 && !quizFinished) {
      // Set up the interval to decrement the timer every second
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // Clean up the interval when the component unmounts or the effect re-runs
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && !quizFinished) {
      // Time is up, auto-submit the quiz
      handleSubmit();
    }
  }, [timeLeft, quizFinished, handleSubmit]);

  const handleOptionChange = (questionId, optionId) => {
    if (!quizFinished) {
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: optionId,
      }));
    }
    // console.log("in option change qid-",questionId," opid-",optionId," map ua",UserAnswers)
  };

  const renderResults = () => {
    if (score === null) return null; // Wait for score calculation

    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border-t-4 border-indigo-500 transition duration-500">
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">
          Quiz Results 🎉
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You answered {score} out of {quiz.questions.length} quiz.questions
          correctly.
        </p>
        <p className="text-4xl font-extrabold text-green-600 dark:text-green-400">
          Your Score:{" "}
          <span className="text-5xl">
            {Math.round((score / quiz.questions.length) * 100)}%
          </span>
        </p>
        <button
          onClick={() => window.location.reload()} // Simple reload to restart
          className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Try Again
        </button>

        <div className="mt-8">
          {/* Re-render quiz.questions for review in the results section */}
          {quiz.questions.map((q, index) => renderQuestion(q, index, true))}
        </div>
      </div>
    );
  };

  
// Renders a single question block.
  const renderQuestion = (q, index) => {
    // 1. Identify the user's current selection for this question
    const currA = UserAnswers[q._id];

    return (
      <div
        key={q._id}
        className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 transition duration-500 border-2 border-gray-300 dark:border-gray-700`}
      >
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {index + 1}. {q.questionText}
        </h3>

        <div className="space-y-3">
          {q.options.map((option, idx) => {
            const isUserSelection = currA === option._id;

            let optionBgClass =
              "bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600";

            if (isUserSelection) {
              optionBgClass =
                "bg-indigo-100 dark:bg-indigo-900 ring-2 ring-indigo-500 dark:ring-indigo-400";
            }

            return (
              <div
                key={option._id}
                className={`flex items-center p-3 rounded-lg transition duration-200 shadow-sm
                                            cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/50
                                            ${optionBgClass}`}
                onClick={() => handleOptionChange(q._id, option._id)}
              >
                <input
                  type="radio"
                  name={`question-${q._id}`}
                  id={`q${q._id}-${option._id}`}
                  checked={isUserSelection}
                  onChange={() => handleOptionChange(q._id, option._id)}
                  className="w-5 h-5 text-indigo-600 border-gray-300 dark:border-gray-500 dark:bg-gray-800 focus:ring-indigo-500 cursor-pointer"
                />
                <label
                  htmlFor={`q${q._id}-${option._id}`}
                  className={`ml-3 text-base font-medium w-full cursor-pointer text-gray-700 dark:text-gray-200`}
                >
                  <span className="inline-block w-6 font-mono text-center text-indigo-700 dark:text-indigo-400">
                    {String.fromCharCode(65 + idx)}.
                  </span>{" "}
                  {option.text}
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
    const pad = (num) => String(num).padStart(2, "0");
    return `${pad(minutes)}:${pad(remainingSeconds)}`;
  };

  return (
    // Apply 'dark' class based on state to the root element
    <div>
      <div className=" bg-gray-100 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 transition duration-500 min-h-[90vh]">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <main>
            {attemptState === "attempting" ? (
              <>
                {/* Fixed Sidebar/Status Panel */}
                {
                  <div className="fixed top-15 right-5 w-[200px] bg-white dark:bg-gray-800 p-6 rounded-xl  shadow-2xl z-20 border-b-4 border-indigo-500 flex flex-col items-center justify-center transition duration-500">
                    <div
                      className={`text-2xl font-bold p-2 px-4 rounded-full shadow-inner transition duration-500 
                              ${timeLeft <= 10 && !quizFinished ? "bg-red-500 text-white animate-pulse" : "bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-200"}`}
                    >
                      ⏳ {formatTime(timeLeft)}
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-4">
                      Attempted :{" "}
                      <span className="font-semibold  text-indigo-600 dark:text-indigo-400">
                        {Object.keys(UserAnswers).length} /{" "}
                        {quiz.questions.length}
                      </span>
                    </p>
                  </div>
                }

                {/* Header Section: Title and Description */}
                <header className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-8 border-b-4 border-indigo-500 transition duration-500">
                  <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-2">
                    {quiz.title} 📝
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    {quiz.description}
                  </p>
                </header>

                {/* Quiz quiz.questions */}
                
                {quiz.questions.map((q, index) => renderQuestion(q, index))}

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
            ) : (
              <div className="flex flex-col items-center  min-h-[50vh] bg-gray-100 dark:bg-gray-900 p-4  font-sans ">
                <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-xl shadow-2xl  shadow-gray-400/50 dark:shadow-indigo-900/50 border-b-8 border-indigo-500 ">
                  <div className="p-10 text-center">
                    {attemptState === "submitting" && (
                      <div>
                        <div className="flex items-center justify-center h-24">
                          <div className="w-24 h-24 border-8 border-t-8 border-indigo-200 dark:border-indigo-700 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
                        </div>

                        {/* Message */}
                        <h2 className="text-2xl font-semibold mt-6 text-gray-800 dark:text-gray-100">
                          Submitting your quiz
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                          Please wait while we validate your answers securely.
                        </p>
                      </div>
                    )}

                    {attemptState === "submitted" && (
                      <div>
                        <div className="text-7xl mb-4">✅</div>
                        <h2 className="text-3xl font-bold text-green-700 dark:text-green-400">
                          Submitted Successfully!
                        </h2>
                        <button onClick={()=>{navigate('/')}} className="w-full sm:w-auto px-8 py-3 mt-8 text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02]">
                          Try Another Quiz
                        </button>
                      </div>
                    )}

                    {attemptState === "failed" && (
                      <div>
                        <div className="text-7xl mb-4">❌</div>
                        <h1 className="text-3xl font-bold text-red-700 dark:text-red-400">
                          Failed to submit quiz
                        </h1>
                        <p className="text-lg text-red-600 dark:text-red-400 font-medium mt-4 text-center">
                          Error:{" "}
                          {"" || "An unknown submission error occurred."}
                        </p>
                        <button className="w-full sm:w-auto px-8 py-3 mt-8 text-lg font-semibold text-white bg-red-600 rounded-xl shadow-md hover:bg-red-700 transition duration-300 transform hover:scale-[1.02]">
                          Retry Submission
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TempQuizPage;
