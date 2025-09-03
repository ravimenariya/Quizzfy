const NavSection = ({ title, children }) => {
  return (
    <div className="mb-6">
        {title && <h3 className="px-3 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold mb-3 tracking-wider">{title}</h3>}
        <ul className="list-none space-y-1">
            {children}
        </ul>
    </div>
  );
};

export default NavSection;
