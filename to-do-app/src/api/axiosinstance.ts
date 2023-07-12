import axios from "axios";

const baseURL = import.meta.env.VITE_DEPLOYED==='true' ? "https://json-server-todo-9ac24788cd96.herokuapp.com/" : "http://localhost:4545/"
console.log(import.meta.env.VITE_DEPLOYED)
console.log(baseURL)


const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
