import axios from "axios";
import store from "../redux/store";
import { setCredentials, logout } from "../redux/slices/authSlice";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

//Attach token on each request
axiosInstance.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

  //If 401, try refresh once
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        // If access token expired
        if(error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axiosInstance.post("/auth/refresh-token");
                store.dispatch(setCredentials({
                    user: res.data.user,
                    accessToken: res.data.accessToken,
                }));
                originalRequest.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (error) {
                store.dispatch(logout());
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;