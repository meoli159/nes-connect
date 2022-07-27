import axios from "axios";

const API_URL = "/api";


const register = (username, email, password) =>{
return axios
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
const logout =  () => {
    return  axios 
    .post(API_URL + "/logout")

}


const getCurrentUser =  () => {
    return  axios 
    .get(API_URL + "/user",{withCredentials: true})
    
}

const authService = {
 
    register,
    login,
    logout,
    getCurrentUser,
    
  };

  export default authService;
