import NavSection from './NavSection';
import NavItem from './NavItem';
import { useTheme } from "../context/ThemeContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { darkMode } = useTheme();
    const sidebarClasses = `w-48 bg-slate-100  block  border-red-800 border-0 fixed  dark:bg-gray-800 shadow-lg  h-[100vh] overflow-y-auto py-4 transition-all duration-300 z-40 ${darkMode ? "shadow-slate-950" : "shadow-slate-500"} ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`;

    return (
        <>
            {isOpen ? <aside className={sidebarClasses}>
                <div className="flex justify-between pl-4 pr-4 text-xl font-sans  ">
                    <span>Menu</span>
                    <button
                        className=" text-2xl text-gray-800 dark:text-gray-200 mr-4"
                        onClick={toggleSidebar}
                    >
                        X
                    </button>
                </div>
                <NavSection >
                    <NavItem icon="📊" label="Dashboard" isActive={true} />
                    <NavItem icon="🔍" label="Discover" />
                    <NavItem icon="🏆" label="Leaderboard" />
                    <NavItem icon="📝" label="My Quizzes" />
                </NavSection>

                {/* <NavSection title="Categories">
                    <NavItem icon="🧪" label="Science" />
                    <NavItem icon="🌍" label="Geography" />
                    <NavItem icon="🏛️" label="History" />
                    <NavItem icon="🎬" label="Movies" />
                    <NavItem icon="🏀" label="Sports" />
                    <NavItem icon="📚" label="Literature" />
                </NavSection> */}

                <NavSection title="Account">
                    <NavItem icon="👤" label="Profile" />
                    <NavItem icon="⚙️" label="Settings" />
                    <NavItem icon="❓" label="Help" />
                    <NavItem icon="🚪" label="Logout" />
                </NavSection>
            </aside> : ""} </>
    );
};

export default Sidebar;