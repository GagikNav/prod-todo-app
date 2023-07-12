import axios from "axios";

const baseURL = import.meta.env.NEXT_PUBLIC_NETLIFY_LOCAL==='true' ? "https://json-server-todo-6885f432f23b.herokuapp.com/" : "http://localhost:4545/"
console.log(import.meta.env.NEXT_PUBLIC_NETLIFY_LOCAL)
console.log(baseURL)


const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
