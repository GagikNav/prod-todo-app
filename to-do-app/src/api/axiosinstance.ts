import axios from "axios";

const baseURL = process.env.NETLIFY ? "https://json-server-todo-6885f432f23b.herokuapp.com/" : "http://localhost:4545/"

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
