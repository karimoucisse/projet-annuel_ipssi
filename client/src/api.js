import axios from "axios"

const API_URL = "http://localhost:5000"

const api = () => {
    const instance = axios.create({
        baseURL: API_URL,
    });

    instance.interceptors.request.use(
        (config) => {
            const storedToken = localStorage.getItem("authToken");
            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    return instance;
};


export default api