import { createContext, useState,useEffect, useContext} from "react";
import { getUsers } from "../controllers/userHandler";
const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

   const [user, setUser]= useState(null);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const login=(userData,token) =>{
    setUser(userData);
    localStorage.setItem("token",token);
    localStorage.setItem("quizzfy-theme","light");
    setIsLoggedIn(true);
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("quizzfy-theme");
    setIsLoggedIn(false);
  }

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("token");
      if(token){
        setIsLoggedIn(true);
        const res=await getUsers(token);
        if(res.data.success)
          setUser(res.data.user);
        
      }
      const savedTheme = localStorage.getItem('quizzfy-theme');
      if (savedTheme === "dark") {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    fetchUserData();
    
  },[])

    const toggleDarkMode = () => {
      setDarkMode(prevMode => {
        const newMode = !prevMode;
        localStorage.setItem('quizzfy-theme', newMode ? 'dark' : 'light');

        if (newMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        return newMode;
      });
    }
  
    const value = { isSidebarOpen,toggleSidebar,user,isLoggedIn,login,logout,darkMode,toggleDarkMode}
  
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
  return useContext(AppContext);
};