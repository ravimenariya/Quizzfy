import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "./QuizCard";
import QuizFilter from "./QuizFilter";
import { useTheme } from "../context/ThemeContext";

const QuizList = ({ isListView }) => {
    const { darkMode } = useTheme();
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        category: "",
        difficulty: "",
        search: "",
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalQuizzes: 0,
    });

    // Fetch quizzes from API
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                setLoading(true);

                // Build query string from filters
                const queryParams = new URLSearchParams();
                if (filters.category)
                    queryParams.append("category", filters.category);
                if (filters.difficulty)
                    queryParams.append("difficulty", filters.difficulty);
                if (filters.search)
                    queryParams.append("search", filters.search);
                queryParams.append("page", pagination.currentPage);
                queryParams.append("limit", 8); // Number of quizzes per page

                const response = await fetch(
                    `http://localhost:5000/api/quizzes?${queryParams}`,
                );
                const data = await response.json();
                console.log(" for search", filters.search, " => ", data);
                if (data.success) {
                    setQuizzes(data.data);
                    setPagination({
                        currentPage: data.currentPage,
                        totalPages: data.pages,
                        totalQuizzes: data.total,
                    });
                } else {
                    setError("Failed to fetch quizzes");
                }
            } catch (error) {
                console.error("Error fetching quizzes:", error);
                setQuizzes(fallbackQuizzes);
                setError("Failed to connect to the server");
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, [filters, pagination.currentPage]);

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        // Reset to first page when filters change
        setPagination((prev) => ({
            ...prev,
            currentPage: 1,
        }));
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: newPage,
        }));
    };

    // Navigate to create quiz page
    const handleCreateQuiz = () => {
        navigate("/create-quiz");
    };

    // Fallback data for development/testing
    const fallbackQuizzes = [
        {
            id: 1,
            category: { name: "Science", icon: "🧪" },
            title: "Basics of physics",
            description:
                "Test your knowledge about atoms, elements, and chemical reactions.",
            questions: 10,
            timeLimit: 15,
            rating: 4.8,
            difficulty: "easy",
        },
        {
            id: 2,
            category: { name: "Geography", icon: "🌍" },
            title: "World Capitals",
            description:
                "Can you match countries with their capital cities? Challenge yourself!",
            questions: 20,
            timeLimit: 10,
            rating: 4.5,
            difficulty: "medium",
        },
        {
            id: 3,
            category: { name: "History", icon: "🏛️" },
            title: "Ancient Civilizations",
            description:
                "Explore the wonders of ancient Egypt, Greece, Rome, and more!",
            questions: 15,
            timeLimit: 20,
            rating: 4.7,
            difficulty: "hard",
        },
        {
            id: 4,
            category: { name: "Movies", icon: "🎬" },
            title: "Oscar Winners",
            description:
                "How well do you know the Academy Award winning films and actors?",
            questions: 12,
            timeLimit: 15,
            rating: 4.9,
            difficulty: "medium",
        },
        {
            id: 5,
            category: { name: "Sports", icon: "🏀" },
            title: "Basketball Legends",
            description:
                "Test your knowledge about the greatest basketball players of all time.",
            questions: 15,
            timeLimit: 12,
            rating: 4.6,
            difficulty: "easy",
        },
        {
            id: 6,
            category: { name: "Literature", icon: "📚" },
            title: "Classic Novels",
            description:
                "How well do you know the most famous books and authors in history?",
            questions: 18,
            timeLimit: 25,
            rating: 4.8,
            difficulty: "hard",
        },
    ];

    // Use fallback data if API is not available
    // const displayQuizzes = quizzes.length > 0 ? quizzes : fallbackQuizzes;

    return (
        <div>
            {/* Filter Component */}

            {/* Create Quiz Button */}
            <div className=" sm:flex items-center justify-between">
                <QuizFilter onFilterChange={handleFilterChange} />

                <button
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
                </button>
            </div>

            {/* Loading and Error States */}
            {loading && (
                <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Loading amazing quizzes...
                    </p>
                </div>
            )}

            {error && !loading && (
                <div className="text-center py-16">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md mx-auto">
                        <svg
                            className="w-12 h-12 text-red-500 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="text-red-700 dark:text-red-400 font-semibold mb-2">
                            {error}
                        </p>
                        <p className="text-red-600 dark:text-red-500 text-sm">
                            Using fallback data for demonstration
                        </p>
                    </div>
                </div>
            )}

            {/* Quiz Grid/List */}
            {!loading && (
                <>
                    <div
                        className={`${isListView ? "flex flex-col gap-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"} transition-all duration-300`}
                    >
                        {quizzes.length > 0
                            ? quizzes.map((quiz) => (
                                  <QuizCard
                                      key={quiz._id || quiz.id}
                                      quiz={{
                                          ...quiz,
                                          // Ensure compatibility with both API and fallback data
                                          id: quiz._id || quiz.id,
                                          category:
                                              quiz.category?.name ||
                                              quiz.category,
                                          icon:
                                              quiz.category?.icon || quiz.icon,
                                          questions:
                                              quiz.questions?.length ||
                                              quiz.questions ||
                                              0,
                                          duration:
                                              quiz.timeLimit ||
                                              quiz.duration ||
                                              0,
                                      }}
                                      isListView={isListView}
                                  />
                              ))
                            : "No quiz found"}
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="flex justify-center mt-12">
                            <nav className="flex items-center space-x-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2">
                                <button
                                    onClick={() =>
                                        handlePageChange(
                                            pagination.currentPage - 1,
                                        )
                                    }
                                    disabled={pagination.currentPage === 1}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        pagination.currentPage === 1
                                            ? "opacity-50 cursor-not-allowed text-gray-400"
                                            : "hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    }`}
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
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>

                                {[...Array(pagination.totalPages).keys()].map(
                                    (page) => (
                                        <button
                                            key={page + 1}
                                            onClick={() =>
                                                handlePageChange(page + 1)
                                            }
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                                pagination.currentPage ===
                                                page + 1
                                                    ? "bg-indigo-600 text-white shadow-lg"
                                                    : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700"
                                            }`}
                                        >
                                            {page + 1}
                                        </button>
                                    ),
                                )}

                                <button
                                    onClick={() =>
                                        handlePageChange(
                                            pagination.currentPage + 1,
                                        )
                                    }
                                    disabled={
                                        pagination.currentPage ===
                                        pagination.totalPages
                                    }
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        pagination.currentPage ===
                                        pagination.totalPages
                                            ? "opacity-50 cursor-not-allowed text-gray-400"
                                            : "hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    }`}
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
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default QuizList;
