import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Helper component for Icons to keep the main component cleaner
const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path fillRule="evenodd" d={path} clipRule="evenodd" />
  </svg>
);

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const categories = [
    "Technology",
    "Science",
    "History",
    "Art",
    "Sports",
    "Geography",
    "Literature",
    "General Knowledge",
  ];

  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Medium",
    timeLimitMinutes: 10,
    isPublic: true,
    questions: [
      {
        text: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        explanation: "",
        points: 10,
      },
    ],
  });

  // --- Form Input Handlers ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuizData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index].text = e.target.value;
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].options[oIndex].text = e.target.value;
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleCorrectAnswerChange = (qIndex, oIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].options.forEach((opt, idx) => {
      opt.isCorrect = idx === oIndex;
    });
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleExplanationChange = (index, e) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index].explanation = e.target.value;
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handlePointsChange = (index, e) => {
    const updatedQuestions = [...quizData.questions];
    const points = Math.max(1, parseInt(e.target.value, 10) || 1);
    updatedQuestions[index].points = points;
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  // --- Question Management ---
  const addQuestion = () => {
    setQuizData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
          explanation: "",
          points: 10,
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    if (quizData.questions.length > 1) {
      const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
      setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
    }
  };

  // --- Form Submission & Validation ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError(
        "Please fill out all required fields and mark a correct answer for each question.",
      );
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in to create a quiz");

      const response = await fetch("http://localhost:5000/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(quizData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => navigate(`/quiz/${data.data._id}`), 2000);
      } else {
        throw new Error(data.message || "Failed to create quiz");
      }
    } catch (err) {
      setError(err.message || "Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const { title, description, category, questions } = quizData;
    if (!title.trim() || !description.trim() || !category) return false;
    for (const q of questions) {
      if (
        !q.text.trim() ||
        q.options.some((o) => !o.text.trim()) ||
        !q.options.some((o) => o.isCorrect)
      ) {
        return false;
      }
    }
    return true;
  };

  // --- Base Styling for Inputs ---
  const inputBaseStyles =
    "w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400";
  const labelBaseStyles =
    "block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      {/* Header */}
      {/* <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <button onClick={() => navigate('/')} className="flex items-center text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                        <Icon path="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" className="w-5 h-5 mr-2" />
                         Dashboard
                    </button>
                </div>
                <h1 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">Create New Quiz</h1>
            </div>
        </div>
      </header>
 */}
      {/* Main Form Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
          {success && (
            <div className="flex items-center bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-lg mb-6 dark:bg-green-900/20 dark:border-green-500/30 dark:text-green-300">
              <Icon
                path="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                className="w-5 h-5 mr-3 text-green-600 dark:text-green-400"
              />
              <p>Quiz created successfully! Redirecting...</p>
            </div>
          )}

          {error && (
            <div className="flex items-center bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-6 dark:bg-red-900/20 dark:border-red-500/30 dark:text-red-300">
              <Icon
                path="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                className="w-5 h-5 mr-3 text-red-600 dark:text-red-400"
              />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Section 1: Quiz Information */}
            <div className="border-b  border-gray-200 dark:border-gray-700 pb-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Quiz Information
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Provide the basic details for your quiz.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className={labelBaseStyles}>
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={quizData.title}
                    onChange={handleInputChange}
                    className={inputBaseStyles}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className={labelBaseStyles}>
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={quizData.category}
                    onChange={handleInputChange}
                    className={inputBaseStyles}
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="difficulty" className={labelBaseStyles}>
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={quizData.difficulty}
                    onChange={handleInputChange}
                    className={inputBaseStyles}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeLimitMinutes" className={labelBaseStyles}>
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    id="timeLimitMinutes"
                    name="timeLimitMinutes"
                    min="1"
                    max="180"
                    value={quizData.timeLimitMinutes}
                    onChange={handleInputChange}
                    className={inputBaseStyles}
                  />
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="description" className={labelBaseStyles}>
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={quizData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className={inputBaseStyles}
                  required
                ></textarea>
              </div>
              <div className="mt-6">
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={quizData.isPublic}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2">Make this quiz public</span>
                </label>
              </div>
            </div>
            {/* Section 2: Questions */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Questions
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Add at least one question to your quiz.
              </p>

              <div className="space-y-8 mt-6">
                {quizData.questions.map((q, qIndex) => (
                  <div
                    key={qIndex}
                    className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 relative"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-indigo-700 dark:text-indigo-400">
                        Question {qIndex + 1}
                      </h4>
                      {quizData.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(qIndex)}
                          className="text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-500 transition-colors p-1 rounded-full"
                        >
                          <Icon
                            path="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            className="w-6 h-6"
                          />
                        </button>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={`question-${qIndex}`}
                        className={labelBaseStyles}
                      >
                        Question Text *
                      </label>
                      <input
                        type="text"
                        id={`question-${qIndex}`}
                        value={q.text}
                        onChange={(e) => handleQuestionChange(qIndex, e)}
                        className={inputBaseStyles}
                        required
                      />
                    </div>

                    <div className="mt-4">
                      <label className={labelBaseStyles}>
                        Options *{" "}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          (Select the correct answer)
                        </span>
                      </label>
                      <div className="space-y-3">
                        {q.options.map((opt, oIndex) => (
                          <div key={oIndex} className="flex items-center">
                            <input
                              type="radio"
                              id={`option-${qIndex}-${oIndex}`}
                              name={`correct-answer-${qIndex}`}
                              checked={opt.isCorrect}
                              onChange={() =>
                                handleCorrectAnswerChange(qIndex, oIndex)
                              }
                              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <input
                              type="text"
                              value={opt.text}
                              onChange={(e) =>
                                handleOptionChange(qIndex, oIndex, e)
                              }
                              placeholder={`Option ${oIndex + 1}`}
                              className={`ml-3 flex-1 px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-1 transition-all ${opt.isCorrect ? "border-green-500 bg-green-50 ring-1 ring-green-500 dark:bg-green-900/30 dark:border-green-600" : "bg-gray-50 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"}`}
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor={`explanation-${qIndex}`}
                          className={labelBaseStyles}
                        >
                          Explanation{" "}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            (Optional)
                          </span>
                        </label>
                        <textarea
                          id={`explanation-${qIndex}`}
                          value={q.explanation}
                          onChange={(e) => handleExplanationChange(qIndex, e)}
                          rows="2"
                          className={inputBaseStyles}
                        ></textarea>
                      </div>
                      <div>
                        <label
                          htmlFor={`points-${qIndex}`}
                          className={labelBaseStyles}
                        >
                          Points
                        </label>
                        <input
                          type="number"
                          id={`points-${qIndex}`}
                          value={q.points}
                          onChange={(e) => handlePointsChange(qIndex, e)}
                          className={inputBaseStyles}
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={addQuestion}
                  className="flex items-center px-6 py-2 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-400 dark:hover:text-white"
                >
                  <Icon
                    path="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    className="w-5 h-5 mr-2"
                  />
                  Add Another Question
                </button>
              </div>
            </div>
            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-8 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-all duration-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !validateForm()}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-lg dark:focus:ring-indigo-800"
              >
                {loading ? "Creating..." : "Create Quiz"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateQuiz;
