import { useTheme } from "../context/ThemeContext";

const Header = ({ toggleSidebar }) => {
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md h-[70px] fixed top-0 w-full z-50 flex items-center px-8 transition-colors duration-200">
            <div className="w-full flex justify-between items-center">
                <button
                    className="block lg:hidden text-2xl text-gray-800 dark:text-gray-200 mr-4"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>

                <a href="#" className="flex items-center gap-2 text-[32px] font-bold text-blue-600 dark:text-blue-400">
                    Quizzify
                </a>

                <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">🔍</span>
                    <input
                        type="text"
                        className="w-full py-2 pl-10 pr-4 border border-gray-200 dark:border-gray-700 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        placeholder="Search for quizzes..."
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={toggleDarkMode}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-pointer">
                        🔔
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-400 text-white text-xs flex items-center justify-center rounded-full">3</span>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 dark:bg-indigo-700 text-white font-bold">
                        RM
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;