import NavSection from './NavSection';
import NavItem from './NavItem';

const Sidebar = ({ isOpen }) => {
    const sidebarClasses = `w-48 bg-white dark:bg-gray-800 shadow-lg fixed h-[calc(100vh-56px)] overflow-y-auto py-4 transition-all duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`;

    return (
        <aside className={sidebarClasses}>
            <NavSection title="Main">
                <NavItem icon="📊" label="Dashboard" isActive={true} />
                <NavItem icon="🔍" label="Discover" />
                <NavItem icon="🏆" label="Leaderboard" />
                <NavItem icon="📝" label="My Quizzes" />
            </NavSection>

            <NavSection title="Categories">
                <NavItem icon="🧪" label="Science" />
                <NavItem icon="🌍" label="Geography" />
                <NavItem icon="🏛️" label="History" />
                <NavItem icon="🎬" label="Movies" />
                <NavItem icon="🏀" label="Sports" />
                <NavItem icon="📚" label="Literature" />
            </NavSection>

            <NavSection title="Account">
                <NavItem icon="👤" label="Profile" />
                <NavItem icon="⚙️" label="Settings" />
                <NavItem icon="❓" label="Help" />
                <NavItem icon="🚪" label="Logout" />
            </NavSection>
        </aside>
    );
};

export default Sidebar;