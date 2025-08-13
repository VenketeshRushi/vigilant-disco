import { checkAuthCookieExists } from "@/utils/ext";
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
	// withCredentials: true, // allow cookies for refresh token
	// timeout: 10000,
});

// Attach token to every request
axiosInstance.interceptors.request.use((config) => {
	if (checkAuthCookieExists()) {
		config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
		config.headers["x-refresh-token"] = Cookies.get("refreshToken");
		config.headers["x-user-role"] = Cookies.get("role");
	}
	return config;
});

export default axiosInstance;
