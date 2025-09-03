import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";


function Dashboard({ isSidebarOpen, toggleSidebar }) {
    const [isListView, setIsListView] = useState(false);

    const toggleView = (isListViewSelected) => {
        setIsListView(isListViewSelected);
    };

    return (
        <div className="this-is-dashboard w-full min-h-screen bg-slate-100 dark:bg-gray-900 flex flex-col text-gray-800 dark:text-gray-200 font-sans text-sm transition-colors duration-200">
            <MainContent isListView={isListView} toggleView={toggleView} />

        </div >
    );
}

export default Dashboard;