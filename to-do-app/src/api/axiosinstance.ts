import axios from "axios";

const baseURL = process.env.URL==='true' ? "https://json-server-todo-6885f432f23b.herokuapp.com/" : "http://localhost:4545/"
console.log(process.env.URL)
console.log(baseURL)


const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
