import axios from "axios"
const Backend_url = `${import.meta.env.VITE_BACKEND_URL}`;

export const registerUser = async (userData) =>{
  try{
    const response = await axios.post(`${Backend_url}/api/users/register`, userData);
    console.log("response on         register",response)
    if(response.data.success)
    return response.data;
    else
      return new Error(response.data.message);
  }
  catch (error)
  {
    if (error.response) {
      console.log("Error response from server:", error.response.data);
      throw new Error(error.response.data.message );
    }
    else 
    return new Error("error in registering user");
  }
}

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${Backend_url}/api/users/login`, userData);  
    if (response.data.success) {
      return response.data;
    } else {
      return new Error(response.data.message);
    }
  }
  catch (error)
  {
    console.log("error on login", error)
    return new Error(error.response.data.message);
  }
}


export const getUsers = async (token) => {
  return  await axios.get(`${Backend_url}/api/users/getuser`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}