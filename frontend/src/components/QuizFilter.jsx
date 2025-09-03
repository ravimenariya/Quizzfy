import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const QuizFilter = ({ onFilterChange }) => {
  // Hooks and logic remain the same
  const { darkMode } = useTheme();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    difficulty: "",
    search: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        // Simplified fallback logic
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();
        setCategories(
          data.success
            ? data.data
            : [
                { _id: "science", name: "Science" },
                { _id: "geography", name: "Geography" },
                { _id: "history", name: "History" },
              ],
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([
          { _id: "science", name: "Science" },
          { _id: "geography", name: "Geography" },
          { _id: "history", name: "History" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

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
      <div className="relative sm:w-[50%] ">
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
          className="text-sm pl-4 ml-3 pr-8 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 appearance-none"
          disabled={loading}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          name="difficulty"
          value={filters.difficulty}
          onChange={handleInputChange}
          className="text-sm pl-3 pr-8 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 appearance-none"
        >
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

export default QuizFilter;
