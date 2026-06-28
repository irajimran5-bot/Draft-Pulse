import axios from "axios";


const BASE_URL = "https://thinkboard-backend-two.vercel.app"; 

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;