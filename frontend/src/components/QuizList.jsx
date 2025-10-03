import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "./QuizCard";
import QuizFilter from "./QuizFilter";
import { getQuizzes } from "../controllers/quizHandler";

const QuizList = ({ isListView }) => {
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
                const data = await getQuizzes(filters,pagination);
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

    return (
        <div>
            {/* Filter Component */}

            {/* Create Quiz Button */}
            <div className=" sm:flex items-center justify-between mb-4">
                <QuizFilter onFilterChange={handleFilterChange} />

                {/* <button
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
                </button> */}
            </div>

            {/* Loading and Error States */}
            {loading && (
                <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin  mb-4"></div>
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
