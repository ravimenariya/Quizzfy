import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreateQuiz from './components/CreateQuiz';
import "./index.css";
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isListView, setIsListView] = useState(false);

  const toggleView = (isListViewSelected) => {
    setIsListView(isListViewSelected);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="dark:bg-gray-900 transition-colors duration-200 flex">
          <Header isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          {isSidebarOpen ? <div className="flex pt-14  w-52 min-h-[calc(100vh)]"> </div> : ""}
          <div className='flex justify-center bg-green-700 min-w-[calc(100vw-208px)] text-red-800 '>
            <Routes>
              {/* <Route path="/" element={<Dashboard isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} /> */}
              <Route path="/" element={<MainContent isListView={isListView} toggleView={toggleView} />} />
              <Route path="/create-quiz" element={<CreateQuiz />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
