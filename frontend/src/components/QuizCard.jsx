import { useTheme } from "../context/ThemeContext";

const QuizCard = ({ quiz, isListView }) => {

    if (isListView) {
        return (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex">
                    <div className="w-14 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl">
                        {quiz.icon}
                    </div>
                    <div className="flex-1 p-3 flex flex-col sm:flex-row sm:items-center">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                                    {quiz.title}
                                </h3>
                                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs px-2.5 py-0.5 rounded-full font-medium">
                                    {quiz.category}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-1">
                                {quiz.description}
                            </p>
                            <div className="flex gap-3 text-gray-500 dark:text-gray-400 text-xs">
                                <span className="flex items-center gap-1.5">
                                    <svg
                                        className="w-3.5 h-3.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {quiz.questions} Questions
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <svg
                                        className="w-3.5 h-3.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {quiz.duration} mins
                                </span>
                                <span className="flex items-center gap-1.5 text-yellow-500">
                                    <svg
                                        className="w-3.5 h-3.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    {quiz.rating}
                                </span>
                            </div>
                        </div>
                        <button className="mt-3 sm:mt-0 sm:ml-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-semibold transition-colors duration-200">
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- GRID VIEW (More Elegant) ---
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            <div className="h-28 flex items-center justify-center text-4xl bg-gray-50 dark:bg-gray-700/50">
                {quiz.icon}
            </div>
            <div className="p-4">
                <span className="inline-block bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2">
                    {quiz.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
                    {quiz.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {quiz.description}
                </p>
                <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-xs mb-4">
                    <div className="flex items-center gap-1.5">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        {quiz.questions} Questions
                    </div>
                    <div className="flex items-center gap-1.5">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        {quiz.duration} mins
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-yellow-500">
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-semibold text-sm">
                            {quiz.rating}
                        </span>
                    </div>
                    <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                        Start Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizCard;
