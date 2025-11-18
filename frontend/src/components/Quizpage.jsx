import React, { useState, useEffect } from "react";
import { getQuiz } from "../controllers/quizHandler";
import { useLocation } from "react-router-dom";
import TquizPage from "./TempQuizPage";
// import Rtqpage from "./Rtqpage";

const QuizPage = () => {
  const [quizState, setQuizState] = useState("notstarted");
  const [countdown, setCountdown] = useState();
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation(); // ✅ move hook to top

  useEffect(() => {
    if (quizState === "countdown" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer); // cleanup
    } else if (quizState === "countdown" && countdown === 0) {
      setQuizState("active");
    }
  }, [quizState, countdown]);

  const fetchQuiz = async () => {
    try {
      console.log("(quizpage.jsx) fetching quiz data");
      const quizId = location.pathname.split("/")[2];
      const quiz = await getQuiz(quizId);
      setQuiz(quiz);
    } catch (e) {
      setError(e.message);
      console.error("(quizpage.jsx 31) error in fetching quiz data", e);
      setQuiz(null);
      setQuizState("failed");
    }
  };

  return (
    // Outer container handles the dark background for the entire page
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-500">
      {quizState === "active" ? (
        <>
          <TquizPage quiz={quiz} />
          {/* <Rtqpage />   */}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[90vh] p-8 text-center">
          {/* Content Div (Card) with dark mode styles */}
          <div
            className="content-div flex flex-col items-center justify-between 
bg-white dark:bg-gray-800 
w-[40vw] h-[45vh] p-8 rounded-xl 
shadow-xl shadow-indigo-500/50 dark:shadow-indigo-900/50 
border-b-4 border-indigo-500 min-w-64"
          >
            {quizState === "notstarted" && (
              <div>
                <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-2">
                  Quiz Title
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Quiz Description
                </p>
                <button
                  onClick={() => {
                    setQuizState("countdown");
                    setCountdown(5);
                    fetchQuiz();
                  }}
                  className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                >
                  Start quiz
                </button>
              </div>
            )}

            {quizState === "countdown" && (
              <div>
                <p className="text-2xl font-semibold text-indigo-700 dark:text-indigo-400 mb-4">
                  Quiz starts in...
                </p>
                <div className="relative flex items-center justify-center w-40 h-40">
                  {/* Dark mode colors added to the pulsating border */}
                  <div className="absolute w-full h-full border-4 border-indigo-400 dark:border-indigo-600 rounded-full animate-ping opacity-75"></div>
                  {/* Dark mode colors added to the inner circle */}
                  <div className="absolute w-full h-full bg-indigo-600 dark:bg-indigo-700 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-6xl font-black text-white">
                      {countdown}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {quizState === "failed" && (
              <div>
                {/* Using red for error header, with dark mode color */}
                <h1 className="text-4xl font-extrabold text-red-600 dark:text-red-400 mb-2">
                  ERROR
                </h1>
                {/* Using red for error text, with dark mode color */}
                <p className="text-gray-600 dark:text-red-300">
                  Failed to fetch quiz
                </p>
                <button
                  onClick={() => setQuizState("notstarted")}
                  className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
