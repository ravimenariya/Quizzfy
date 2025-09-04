import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-48' : 'ml-0'} pt-[70px]`}>
            <Routes>
              {/* <Route path="/" element={<Dashboard isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} /> */}
              <Route path="/" element={<MainContent/>} />
              <Route path="/create-quiz" element={<CreateQuiz />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
