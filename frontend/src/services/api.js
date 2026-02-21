import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api",
});

const token = localStorage.getItem("token");
API.get("/notes", { headers: { Authorization: `Bearer ${token}` } });

export default API;