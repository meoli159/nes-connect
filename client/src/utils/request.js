import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3333",
});

export default request;
