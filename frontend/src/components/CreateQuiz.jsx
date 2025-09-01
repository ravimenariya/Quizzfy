import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const CreateQuiz = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Quiz form state
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "medium",
    timeLimit: 10,
    isPublic: true,
    questions: [
      {
        text: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false }
        ],
        explanation: "",
        points: 1
      }
    ]
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();

        if (data.success) {
          setCategories(data.data);
        } else {
          setError("Failed to fetch categories");
          // Fallback categories if API fails
          setCategories([
            { _id: 'science', name: 'Science', icon: '🧪' },
            { _id: 'geography', name: 'Geography', icon: '🌍' },
            { _id: 'history', name: 'History', icon: '🏛️' },
            { _id: 'movies', name: 'Movies', icon: '🎬' },
            { _id: 'sports', name: 'Sports', icon: '🏀' },
            { _id: 'literature', name: 'Literature', icon: '📚' }
          ]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to connect to the server");
        // Fallback categories if API fails
        setCategories([
          { _id: 'science', name: 'Science', icon: '🧪' },
          { _id: 'geography', name: 'Geography', icon: '🌍' },
          { _id: 'history', name: 'History', icon: '🏛️' },
          { _id: 'movies', name: 'Movies', icon: '🎬' },
          { _id: 'sports', name: 'Sports', icon: '🏀' },
          { _id: 'literature', name: 'Literature', icon: '📚' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuizData({
      ...quizData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Handle question text changes
  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index].text = e.target.value;
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  // Handle option text changes
  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options[optionIndex].text = e.target.value;
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  // Handle correct answer selection
  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...quizData.questions];

    // Set all options to false first
    updatedQuestions[questionIndex].options.forEach((option, idx) => {
      option.isCorrect = idx === optionIndex;
    });

    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  // Handle explanation changes
  const handleExplanationChange = (index, e) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index].explanation = e.target.value;
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  // Add new question
  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          text: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false }
          ],
          explanation: "",
          points: 1
        }
      ]
    });
  };

  // Remove question
  const removeQuestion = (index) => {
    if (quizData.questions.length > 1) {
      const updatedQuestions = [...quizData.questions];
      updatedQuestions.splice(index, 1);
      setQuizData({
        ...quizData,
        questions: updatedQuestions
      });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Check if at least one option is marked as correct for each question
      const hasCorrectOptions = quizData.questions.every(question =>
        question.options.some(option => option.isCorrect)
      );

      if (!hasCorrectOptions) {
        setError("Each question must have at least one correct answer");
        setLoading(false);
        return;
      }

      // Get token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to create a quiz");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(quizData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Redirect to the created quiz after 2 seconds
        setTimeout(() => {
          navigate(`/quiz/${data.data._id}`);
        }, 2000);
      } else {
        setError(data.message || "Failed to create quiz");
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  // Validate form before submission
  const validateForm = () => {
    console.log("create dekh raha hu => ")

    // Check if title and description are not empty
    if (!quizData.title.trim() || !quizData.description.trim()) {
      return false;
    }

    // Check if category is selected
    // if (!quizData.category) {
    //   return false;
    // }

    // Check if all questions have text
    if (quizData.questions.some(q => !q.text.trim())) {
      return false;
    }

    // Check if all options have text
    if (quizData.questions.some(q => q.options.some(o => !o.text.trim()))) {
      return false;
    }

    // Check if each question has at least one correct answer
    if (quizData.questions.some(q => !q.options.some(o => o.isCorrect))) {
      return false;
    }
    console.log("create dekh raha hu => ")
    return true;
  };

  // Go back to dashboard
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark:bg-gray-900" : "bg-gray-50"} transition-colors duration-200 w-full`}>
      {/* Navigation header */}
      <header className={`flex items-center justify-between px-6 py-4 ${darkMode ? "dark:bg-gray-800" : "bg-white"} shadow-md`}>
        <div className="flex items-center">
          <button
            onClick={handleGoBack}
            className={`flex items-center mr-4 ${darkMode ? "dark:text-gray-300 hover:dark:text-white" : "text-gray-700 hover:text-gray-900"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className={`text-xl font-bold ${darkMode ? "dark:text-white" : "text-gray-800"}`}>Create New Quiz</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className={`max-w-4xl mx-auto p-6 ${darkMode ? "dark:bg-gray-800" : "bg-white"} rounded-lg shadow-md`}>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <p>Quiz created successfully! Redirecting...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}



          <form onSubmit={handleSubmit}>
            {/* Quiz Basic Information */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "dark:text-gray-200" : "text-gray-700"}`}>
                Quiz Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className={`block mb-2 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={quizData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${darkMode
                        ? "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        : "bg-gray-50 border-gray-300"
                      }`}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className={`block mb-2 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}
                  >
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={quizData.category}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${darkMode
                        ? "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        : "bg-gray-50 border-gray-300"
                      }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="difficulty"
                    className={`block mb-2 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}
                  >
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={quizData.difficulty}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${darkMode
                        ? "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        : "bg-gray-50 border-gray-300"
                      }`}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="timeLimit"
                    className={`block mb-2 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}
                  >
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    id="timeLimit"
                    name="timeLimit"
                    min="1"
                    max="60"
                    value={quizData.timeLimit}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${darkMode
                        ? "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        : "bg-gray-50 border-gray-300"
                      }`}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className={`block mb-2 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={quizData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded-md ${darkMode
                      ? "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      : "bg-gray-50 border-gray-300"
                    }`}
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className={`flex items-center ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}>
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={quizData.isPublic}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Make this quiz public
                </label>
              </div>
            </div>

            {/* Questions Section */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "dark:text-gray-200" : "text-gray-700"}`}>
                Questions
              </h3>

              {quizData.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className={`mb-6 p-4 border rounded-md ${darkMode ? "dark:border-gray-700" : "border-gray-200"
                    }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className={`font-medium ${darkMode ? "dark:text-gray-200" : "text-gray-700"}`}>
                      Question {questionIndex + 1}
                    </h4>
                    {quizData.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(questionIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`question-${questionIndex}`}
                      className={`block mb-2 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}
                    >
                      Question Text *
                    </label>
                    <input
                      type="text"
                      id={`question-${questionIndex}`}
                      value={question.text}
                      onChange={(e) => handleQuestionChange(questionIndex, e)}
                      className={`w-full px-3 py-2 border rounded-md ${darkMode
                          ? "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          : "bg-gray-50 border-gray-300"
                        }`}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className={`block mb-2 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}>
                      Options * (Select the correct answer)
                    </label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center mb-2">
                        <input
                          type="radio"
                          id={`option-${questionIndex}-${optionIndex}`}
                          name={`correct-answer-${questionIndex}`}
                          checked={option.isCorrect}
                          onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                          className="mr-2"
                        />
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                          placeholder={`Option ${optionIndex + 1}`}
                          className={`flex-1 px-3 py-2 border rounded-md ${darkMode
                              ? "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              : "bg-gray-50 border-gray-300"
                            } ${option.isCorrect ? "border-green-500" : ""}`}
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mb-2">
                    <label
                      htmlFor={`explanation-${questionIndex}`}
                      className={`block mb-2 ${darkMode ? "dark:text-gray-300" : "text-gray-700"}`}
                    >
                      Explanation (Optional)
                    </label>
                    <textarea
                      id={`explanation-${questionIndex}`}
                      value={question.explanation}
                      onChange={(e) => handleExplanationChange(questionIndex, e)}
                      rows="2"
                      className={`w-full px-3 py-2 border rounded-md ${darkMode
                          ? "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          : "bg-gray-50 border-gray-300"
                        }`}
                    ></textarea>
                  </div>
                </div>
              ))}

              {/* Add Question Button at the end of all questions */}
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={addQuestion}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Question
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${loading || true ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {loading ? "Creating..." : "Create Quiz"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
