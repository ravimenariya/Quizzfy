import { useState, useEffect } from "react";
import QuizCard from "./QuizCard";
import QuizFilter from "./QuizFilter";
import { useTheme } from "../context/ThemeContext";

const QuizList = ({ isListView }) => {
    const { darkMode } = useTheme();
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
                queryParams.append("limit", 5); // Number of quizzes per page

                const response = await fetch(
                    `http://localhost:5000/api/quizzes?${queryParams}`,
                );
                const data = await response.json();

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
    const displayQuizzes = quizzes.length > 0 ? quizzes : fallbackQuizzes;

    return (
        <div>
            {/* Filter Component */}
            <QuizFilter onFilterChange={handleFilterChange} />

            {/* Loading and Error States */}
            {loading && (
                <div
                    className={`text-center py-8 ${darkMode ? "dark:text-white" : ""}`}
                >
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-2"></div>
                    <p>Loading quizzes...</p>
                </div>
            )}

            {error && !loading && (
                <div
                    className={`text-center py-8 ${darkMode ? "dark:text-red-400" : "text-red-600"}`}
                >
                    <p>{error}</p>
                    <p className="mt-2">
                        Using fallback data for demonstration
                    </p>
                </div>
            )}

            {/* Quiz Grid/List */}
            {!loading && (
                <>
                    <div
                        className={`${isListView ? "flex flex-col gap-3" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}`}
                    >
                        {displayQuizzes.map((quiz) => (
                            <QuizCard
                                key={quiz._id || quiz.id}
                                quiz={{
                                    ...quiz,
                                    // Ensure compatibility with both API and fallback data
                                    id: quiz._id || quiz.id,
                                    category:
                                        quiz.category?.name || quiz.category,
                                    icon: quiz.category?.icon || quiz.icon,
                                    questions:
                                        quiz.questions?.length ||
                                        quiz.questions ||
                                        0,
                                    duration:
                                        quiz.timeLimit || quiz.duration || 0,
                                }}
                                isListView={isListView}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="flex justify-center mt-8">
                            <nav className="flex items-center space-x-2">
                                <button
                                    onClick={() =>
                                        handlePageChange(
                                            pagination.currentPage - 1,
                                        )
                                    }
                                    disabled={pagination.currentPage === 1}
                                    className={`px-3 py-1 rounded-md ${
                                        pagination.currentPage === 1
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-indigo-100 dark:hover:bg-gray-700"
                                    } ${darkMode ? "dark:text-white" : ""}`}
                                >
                                    Previous
                                </button>

                                {[...Array(pagination.totalPages).keys()].map(
                                    (page) => (
                                        <button
                                            key={page + 1}
                                            onClick={() =>
                                                handlePageChange(page + 1)
                                            }
                                            className={`px-3 py-1 rounded-md ${
                                                pagination.currentPage ===
                                                page + 1
                                                    ? "bg-indigo-600 text-white"
                                                    : `${darkMode ? "dark:text-white hover:bg-gray-700" : "hover:bg-indigo-100"}`
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
                                    className={`px-3 py-1 rounded-md ${
                                        pagination.currentPage ===
                                        pagination.totalPages
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-indigo-100 dark:hover:bg-gray-700"
                                    } ${darkMode ? "dark:text-white" : ""}`}
                                >
                                    Next
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
