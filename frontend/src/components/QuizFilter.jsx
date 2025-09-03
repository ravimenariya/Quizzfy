import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const QuizFilter = ({ onFilterChange }) => {
  const { darkMode } = useTheme();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    search: ''
  });

  // Fetch categories from API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();

        if (data.success) {
          setCategories(data.data);
        } else {
          console.error("Failed to fetch categories:", data.message);
          // Fallback to static categories if API fails
          setCategories([
            { _id: 'science', name: 'Science', icon: '🧪' },
            { _id: 'geography', name: 'Geography', icon: '🌍' },
            { _id: 'history', name: 'History', icon: '🏛️' },
            { _id: 'movies', name: 'Movies', icon: '🎬' },
            { _id: 'sports', name: 'Sports', icon: '🏀' },
            { _id: 'literature', name: 'Literature', icon: '📚' }
          ]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to static categories if API fails
        setCategories([
          { _id: 'science', name: 'Science', icon: '🧪' },
          { _id: 'geography', name: 'Geography', icon: '🌍' },
          { _id: 'history', name: 'History', icon: '🏛️' },
          { _id: 'movies', name: 'Movies', icon: '🎬' },
          { _id: 'sports', name: 'Sports', icon: '🏀' },
          { _id: 'literature', name: 'Literature', icon: '📚' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes and apply filters immediately
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: value
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Apply filters immediately
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  // Handle filter reset
  const handleReset = () => {
    const resetFilters = {
      category: '',
      difficulty: '',
      search: ''
    };

    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          {/* Search Input */}
          <div className="flex-1 min-w-[300px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Quizzes
            </label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleInputChange}
                placeholder="Search by title, description..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Category Select */}
          <div className="w-full lg:w-auto min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              disabled={loading}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Select */}
          <div className="w-full lg:w-auto min-w-[180px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={filters.difficulty}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Difficulties</option>
              <option value="easy">🟢 Easy</option>
              <option value="medium">🟡 Medium</option>
              <option value="hard">🔴 Hard</option>
            </select>
          </div>

          {/* Filter Actions */}
          <div className="w-full lg:w-auto">
            <button
              type="button"
              onClick={handleReset}
              className="w-full lg:w-auto px-6 py-3 text-sm font-semibold rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500 transition-all duration-200 border border-gray-300 dark:border-gray-500"
            >
              <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Filters
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuizFilter;
