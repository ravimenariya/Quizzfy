const NavItem = ({ icon, label, isActive = false }) => {
  const activeClass = isActive
      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-r-3 border-indigo-600 dark:border-indigo-400 font-medium"
      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400";

  return (
      <li className="mb-0.5">
          <a href="#" className={`flex items-center gap-2 px-4 py-2 transition-colors duration-200 text-xs ${activeClass}`}>
              <span className="w-5 text-center text-base">{icon}</span>
              {label}
          </a>
      </li>
  );
};

export default NavItem;
