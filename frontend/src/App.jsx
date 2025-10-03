import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateQuiz from './components/CreateQuiz';
import "./index.css";
import { useAppContext } from './context/appContext';
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Login from './components/Login'
import Signup from "./components/Signup"
import NotFoundPage from './components/NotFoundPage'

function App() {
  const { isSidebarOpen, isLoggedIn } = useAppContext();

  return (
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header  />
          <Sidebar  />
          <div className={`transition-all duration-300 ${isSidebarOpen   ? 'ml-48' : 'ml-0'} pt-[70px]`}>
            <Routes>
              {/* <Route path="/" element={<Dashboard isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} /> */}
              <Route path="/" element={<MainContent/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {isLoggedIn && 
              <Route path="/create-quiz" element={<CreateQuiz />} /> 
              }
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
        
      </Router>
  );
}

export default App;
