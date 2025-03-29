import axios, { AxiosInstance } from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api: AxiosInstance = axios.create({
    baseURL: Platform.OS === "android" ? "http://10.0.2.2:7254/api" : "http://localhost:7254/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

});


api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

export default api;