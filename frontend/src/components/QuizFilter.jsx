import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const QuizFilter = ({ onFilterChange }) => {
  const { darkMode } = useTheme();
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    search: ''
  });

  // Fetch categories on component mount
  useEffect(() => {
    // For now, we'll use static categories
    // In a real implementation, this would fetch from the API
    setCategories([
      { _id: 'science', name: 'Science', icon: '🧪' },
      { _id: 'geography', name: 'Geography', icon: '🌍' },
      { _id: 'history', name: 'History', icon: '🏛️' },
      { _id: 'movies', name: 'Movies', icon: '🎬' },
      { _id: 'sports', name: 'Sports', icon: '🏀' },
      { _id: 'literature', name: 'Literature', icon: '📚' }
    ]);
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  // Handle filter reset
  const handleReset = () => {
    setFilters({
      category: '',
      difficulty: '',
      search: ''
    });
    onFilterChange({
      category: '',
      difficulty: '',
      search: ''
    });
  };

  return (
    <div className={`bg-white ${darkMode ? 'dark:bg-gray-800' : ''} rounded-lg shadow p-4 mb-4`}>
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
            className={`w-full px-3 py-2 border ${darkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'} rounded-md`}
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
            className={`px-3 py-2 text-sm font-medium rounded-md ${darkMode 
              ? 'dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizFilter;
