import axios from "axios";

console.log("Base URL:", import.meta.env.VITE_BACKEND_URL);

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
	},
	// timeout: 10000, // Optional
});

export default axiosInstance;
