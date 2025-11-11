import PageTitle from "./PageTitle";
import QuizList from "./QuizList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const MainContent = () => {
  const [isListView, setIsListView] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();

  const toggleView = (isListViewSelected) => {
    setIsListView(isListViewSelected);
  };

  const handleCreateQuiz = () => {
      navigate("/create-quiz");
  };
  return (
    <main className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <PageTitle />
        <div className="flex justify-between">
        <div className="flex justify-start mb-4">
          <button
            onClick={() => toggleView(false)}
            className={`p-2 rounded-lg transition-colors duration-200 ${!isListView ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
            aria-label="Grid View"
            >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"

              viewBox="0 0 24 24"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 0
                1-2 2H6a2 2 0 01-2-2V6z"
                />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 10h4v4h-4zM10 18h4v4h-4zM18 10h4v4h-4z"
                />
              </svg>
            </button>
            <button
              onClick={() => toggleView(true)}
              className={`p-2 rounded-lg transition-colors duration-200 ml-2 ${isListView ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
              aria-label="List View"
              >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          { isLoggedIn ? <button
            onClick={handleCreateQuiz}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
          >
            <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
            </svg>
            Create New Quiz
          </button> : null}
        </div>
        <QuizList isListView={isListView} />
      </div>
    </main>
  );
};
export default MainContent;
