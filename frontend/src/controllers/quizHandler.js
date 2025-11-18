import axios from "axios"
const Backend_url = `${import.meta.env.VITE_BACKEND_URL}`

export const getQuizzes = async (filters,pagination)=>{
  // Build query string from filters
  try {
    const queryParams = new URLSearchParams();
    if (filters.category)
        queryParams.append("category", filters.category);
    if (filters.difficulty)
        queryParams.append("difficulty", filters.difficulty);
    if (filters.search)
        queryParams.append("search", filters.search);
    queryParams.append("page", pagination.currentPage);
    queryParams.append("limit", 8); // Number of quizzes per page

    const response = await axios.get(
        `${Backend_url}/api/quizzes?${queryParams}`,
    );
    
    return response.data;
  }catch (error){
    console.log(error)
    return new error("error in fetching quizzes");
  }
}; 


export const createQuiz = async (quiz) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("You must be logged in to create a quiz");
        const response = await axios.post(`${Backend_url}/api/quizzes/create`, quiz, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data;
    }catch(error){
        console.log("error in creating quiz",error)
        return error.response.data;
    }
}

export const getQuiz = async (id) => {
    const token=localStorage.getItem("token");
        const response = await axios.get(`${Backend_url}/api/quizzes/${id}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log("response quiz => ",response.data.quiz);
        return response.data.quiz;
    
}