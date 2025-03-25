import Dashboard from './components/Dashboard'
import "./index.css"
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="dark:bg-gray-900 transition-colors duration-200">
        <Dashboard />
      </div>
    </ThemeProvider>
  )
}

export default App;
