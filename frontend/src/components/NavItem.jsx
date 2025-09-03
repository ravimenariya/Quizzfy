const NavItem = ({ icon, label, isActive = false }) => {
  const activeClass = isActive
      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium shadow-sm"
      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400";

  return (
      <li className="mb-1">
          <a href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${activeClass}`}>
              <span className="w-5 text-center text-base">{icon}</span>
              <span className="font-medium">{label}</span>
          </a>
      </li>
  );
};

export default NavItem;
