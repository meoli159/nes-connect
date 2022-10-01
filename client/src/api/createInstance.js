import axios from "axios";
import { store } from "../redux/store";
const API_URL = process.env.REACT_APP_API_URL;
const axiosClient = axios.create({ baseURL: API_URL });

axiosClient.interceptors.request.use(function (config) {
  const state = store.getState();
  const token = state.auth.currentUser?.accessToken;
  config.headers.Authorization = "Bearer " + token;
  return config;
});

export default axiosClient;
