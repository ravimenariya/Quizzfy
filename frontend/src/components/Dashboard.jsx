import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";


function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isListView, setIsListView] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleView = (isListViewSelected) => {
        setIsListView(isListViewSelected);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col text-gray-800 dark:text-gray-200 font-sans text-sm transition-colors duration-200">
            <Header toggleSidebar={toggleSidebar} />

            <div className="flex pt-14 min-h-[calc(100vh-56px)]">
                <Sidebar isOpen={isSidebarOpen} />
                <MainContent isListView={isListView} toggleView={toggleView} />
            </div>
        </div>
    );
}

export default Dashboard;