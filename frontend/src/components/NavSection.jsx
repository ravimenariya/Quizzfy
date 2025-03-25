const NavSection = ({ title, children }) => {
  return (
    <div className="mb-4">
        <h3 className="px-4 text-[10px] uppercase text-gray-500 dark:text-gray-400 font-semibold mb-2">{title}</h3>
        <ul className="list-none">
            {children}
        </ul>
    </div>
  );
};

export default NavSection;
