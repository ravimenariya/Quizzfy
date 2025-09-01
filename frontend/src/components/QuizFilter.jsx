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
    <div >
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-end">
        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            placeholder="Search quizzes..."
            className={`w-[500px] px-3 py-2 border ${darkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'} rounded-md`}
          />
        </div>

        {/* Category Select */}
        <div className="w-auto">
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            className={`px-3 py-2 border ${darkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'} rounded-md`}
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
        <div className="w-auto">
          <select
            id="difficulty"
            name="difficulty"
            value={filters.difficulty}
            onChange={handleInputChange}
            className={`px-3 py-2 border ${darkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'} rounded-md`}
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Filter Actions */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleReset}
            className={`px-3 py-2.5 text-sm font-medium rounded-md bg-indigo-600  text-white  hover:bg-indigo-700`}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizFilter;
