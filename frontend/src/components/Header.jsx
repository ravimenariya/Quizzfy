import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const {
        darkMode,
        toggleDarkMode,
        isSidebarOpen,
        toggleSidebar,
        isLoggedIn,
        user,
        logout,
    } = useAppContext();
    const [profile, setProfile] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="bg-white/80 backdrop-blur-md z-30 dark:bg-gray-800/80 shadow-sm border-b border-gray-200 dark:border-gray-700 h-[70px] fixed top-0 w-full flex items-center px-6 transition-all duration-200">
            <div className="w-full flex justify-between items-center">
                {isSidebarOpen ? (
                    <div className="w-[200px]"></div>
                ) : (
                    <button
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                        onClick={toggleSidebar}
                    >
                        <svg
                            className="w-6 h-6"
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
                )}
                <a
                    href="/"
                    className="flex items-center gap-3 text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        Q
                    </div>
                    Quizzify
                </a>

                {isLoggedIn ? (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleDarkMode}
                            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                        >
                            {darkMode ? (
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>
                        <div className="relative">
                            <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                </svg>
                            </button>
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-medium">
                                3
                            </span>
                        </div>

                        <button
                            onClick={() => setProfile(!profile)}
                            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                        >
                            {isLoggedIn && user ? (
                                user.profilePicture ? (
                                    <img
                                        src={user.profilePicture}
                                        alt="Profile"
                                        className="w-full h-full rounded-lg object-cover"
                                    />
                                ) : (
                                    user.username
                                        .split(" ")
                                        .map((word) => word[0])
                                )
                            ) : (
                                "RM"
                            )}
                        </button>
                        {profile && user && (
                            <div className="absolute right-0 mt-56 border-gray-300 border w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
                                <div className="flex">
                                    <img
                                        className="w-[40%] h-[50%]"
                                        src={user.profilePicture}
                                    />
                                    <div className="mail px-4 bg-gren-500 w-full">
                                        <div className="flex justify-between">
                                            <p className="text-gray-700 text-lg font-semibold dark:text-gray-300">
                                                {user.username}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    setProfile(false)
                                                }
                                            >
                                                X
                                            </button>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {user.email}
                                        </p>
                                        <hr className="w-full my-2" />
                                        <button
                                            onClick={() => {
                                                logout();
                                                window.location.reload();
                                            }}
                                            className="mb-2 bg-red-500 px-4 text-white rounded font-semibold"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center space-x-2 md:space-x-4">
                        {/* Log In Button (Secondary Action) */}
                        <button
                            onClick={() => navigate("login")}
                            className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-white border-2 border-indigo-200 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200
                               dark:bg-gray-800 dark:text-indigo-400 dark:border-indigo-700 dark:hover:bg-gray-700"
                        >
                            Log In
                        </button>

                        {/* Sign Up Button (Primary Action) */}
                        <button
                            onClick={() => navigate("/signup")}
                            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                        >
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
