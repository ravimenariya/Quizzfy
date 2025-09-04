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