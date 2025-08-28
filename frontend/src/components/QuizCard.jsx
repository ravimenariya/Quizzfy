const QuizCard = ({ quiz, isListView }) => {
    if (isListView) {
        return (
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ">
                <div className="flex">
                    <div className="w-12 bg-indigo-600 dark:bg-indigo-700 flex items-center justify-center text-white text-xl">
                        {quiz.icon}
                    </div>
                    <div className="flex-1 p-3 flex flex-col sm:flex-row sm:items-center">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{quiz.title}</h3>
                                <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs px-1.5 py-0.5 rounded-full">
                                    {quiz.category}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">{quiz.description}</p>
                            <div className="flex gap-3 text-gray-500 dark:text-gray-400 text-xs">
                                <span className="flex items-center gap-1">
                                    <span>📊</span> {quiz.questions} Questions
                                </span>
                                <span className="flex items-center gap-1">
                                    <span>⏱️</span> {quiz.duration} mins
                                </span>
                                <span className="flex items-center gap-1 text-yellow-500">
                                    <span>⭐</span> {quiz.rating}
                                </span>
                            </div>
                        </div>
                        <button className="mt-2 sm:mt-0 px-3 py-1 bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded text-xs font-medium transition-colors">
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
            <div className="h-1.5 bg-gradient-to-r from-indigo-600 to-indigo-400"></div>
            <div className="h-28 flex items-center justify-center text-4xl bg-gray-100 dark:bg-gray-700">
                {quiz.icon}
            </div>
            <div className="p-4">
                <span className="inline-block bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full text-xs mb-2">
                    {quiz.category}
                </span>
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-1">{quiz.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">{quiz.description}</p>
                <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-xs mb-2">
                    <div className="flex items-center gap-1">
                        <span>📊</span> {quiz.questions} Questions
                    </div>
                    <div className="flex items-center gap-1">
                        <span>⏱️</span> {quiz.duration} mins
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-yellow-500">
                        <span>⭐</span> {quiz.rating}
                    </div>
                    <button className="px-3 py-1 bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded text-xs font-medium transition-colors">
                        Start Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizCard;
