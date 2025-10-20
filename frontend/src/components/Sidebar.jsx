import NavSection from "./NavSection";
import NavItem from "./NavItem";
import { useAppContext } from "../context/appContext";

const Sidebar = () => {
    const { isSidebarOpen, toggleSidebar } = useAppContext();
    
    const sidebarClasses = `w-48 bg-white/80 backdrop-blur-md dark:bg-gray-800/80 border-r border-gray-200 dark:border-gray-700  h-[100vh] overflow-y-auto fixed py-6 transition-all  duration-300 z-30 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`;


    return (
        <>
            {isSidebarOpen ? (
                    <aside className={sidebarClasses}>
                        <div className="flex justify-between items-center px-6 pb-3 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Menu
                            </h2>
                            <button
                                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                                onClick={toggleSidebar}
                            >
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
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="px-3 mt-6">
                            <NavSection title="Main">
                                <NavItem
                                    icon="📊"
                                    label="Dashboard"
                                    isActive={true}
                                />
                                <NavItem icon="🔍" label="Discover" />
                                <NavItem icon="🏆" label="Leaderboard" />
                                <NavItem icon="📝" label="My Quizzes" />
                            </NavSection>

                            <NavSection title="Account">
                                <NavItem icon="👤" label="Profile" />
                                <NavItem icon="⚙️" label="Settings" />
                                <NavItem icon="❓" label="Help" />
                                <NavItem icon="🚪" label="Logout" />
                            </NavSection>
                        </div>
                    </aside>
            
            ) : (
                ""
            )}{" "}
        </>
    );
};

export default Sidebar;
