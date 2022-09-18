import axios from "axios";
import jwt_decode from "jwt-decode";
import authService from "./authService"
// const refreshToken = async () => {
//   try {
//     const res = await axios.post(`/api/auth/refresh`, {
//       withCredentials: true,
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodeToken = jwt_decode(user?.accessToken);
      if (decodeToken.exp < date.getTime() / 1000) {
        authService.logout(user?.accessToken,dispatch)
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
