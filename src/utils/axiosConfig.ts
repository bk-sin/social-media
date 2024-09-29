import { useAuthStore } from "@/store/auth";
import Axios from "axios";

const axios = Axios.create();

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || "";

axios.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
