import { useState } from "react";

const FilterSection = ({ toggleView, isListView }) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex gap-4 w-full sm:w-auto overflow-x-auto pb-2">
                <select className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <option>All Categories</option>
                    <option>Science</option>
                    <option>Geography</option>
                    <option>History</option>
                    <option>Movies</option>
                    <option>Sports</option>
                </select>

                <select className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <option>Sort by: Popular</option>
                    <option>Newest</option>
                    <option>Highest Rated</option>
                    <option>Most Played</option>
                </select>

                <select className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <option>All Difficulty</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
            </div>

            <div className="flex gap-2">
                <button
                    className={`w-10 h-10 flex items-center justify-center border rounded-md transition-colors ${!isListView 
                        ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-700 dark:border-indigo-700' 
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'}`}
                    onClick={() => toggleView(false)}
                >
                    📊
                </button>
                <button
                    className={`w-10 h-10 flex items-center justify-center border rounded-md transition-colors ${isListView 
                        ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-700 dark:border-indigo-700' 
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'}`}
                    onClick={() => toggleView(true)}
                >
                    📋
                </button>
            </div>
        </div>
    );
};

export default FilterSection;
