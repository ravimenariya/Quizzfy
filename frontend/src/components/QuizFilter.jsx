import React, { useState, useEffect } from "react";

const QuizFilter = ({ onFilterChange }) => {
  const categories=[
    "Technology",
    "Science",
    "History",
    "Art",
    "Sports",
    "Geography",
    "Literature",
    "General Knowledge",
  ];
  const [filters, setFilters] = useState({
    category: "",
    difficulty: "",
    search: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = { category: "", difficulty: "", search: "" };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // A helper to only show the reset button if a filter is active
  const isFilterActive =
    filters.search || filters.category || filters.difficulty;

  return (
    <div className="sm:flex items-center max-w-[500px] my-4 mb-8">
      <div className="relative sm:w-[50%] min-w-[250px]">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleInputChange}
          placeholder="Search for a quiz..."
          className="w-full pl-10 pr-4 py-2.5 text-base border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
        />

        {isFilterActive && (
          <button
            type="button"
            onClick={handleReset}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Reset filters"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 mt-3">
        <select
          name="category"
          value={filters.category}
          onChange={handleInputChange}
          className="text-sm pl-4 ml-3 w-[50%] pr-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 appearance-none"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          name="difficulty"
          value={filters.difficulty}
          onChange={handleInputChange}
          className="text-sm pl-3  w-[50%] py-1.5 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 appearance-none"
        >
          <option value="">Any Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

export default QuizFilter;
