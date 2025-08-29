import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL
const apiClient = axios.create({
    baseURL: `${API_BASE_URL}`
})
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
export default apiClient;