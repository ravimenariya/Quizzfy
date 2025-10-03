import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 p-4">
      <h1 className="text-6xl md:text-8xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
        Page Not Found
      </h2>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 dark:bg-indigo-700 dark:hover:bg-indigo-600"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;