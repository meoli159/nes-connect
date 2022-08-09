import axios from "axios";

const API_URL = "/api";


const register = async (username, email, password) =>{
return await axios
    .post(API_URL + "/register", {
        username,
        email,
        password,
      })
}

const login = async (email, password) =>{
return await axios 
    .post(API_URL + "/login",{
        email,
        password,
    },
    {withCredentials: true}
    )
    
}


const getCurrentUser =  async () => {
    return  await axios 
    .get(API_URL + "/user",{
        withCredentials: true,
    })
}

const logout = async () => {
    return  await axios 
    .post(API_URL + "/logout")
}

const authService = {
 
    register,
    login,
    logout,
    getCurrentUser,
    
  };

  export default authService;
