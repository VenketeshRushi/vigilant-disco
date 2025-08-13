import Cookies from "js-cookie";

const getBaseUrl = () => import.meta.env.VITE_PUBLIC_DOMAIN;

const getAuthCookies = () => ({
	token: Cookies.get("token") || null,
	refreshToken: Cookies.get("refreshToken") || null,
	role: Cookies.get("role") || null,
});

const checkAuthCookieExists = () => {
	const token = Cookies.get("token");
	const refreshToken = Cookies.get("refreshToken");
	const role = Cookies.get("role");

	return Boolean(token && refreshToken && role);
};

const removeAuthCookies = () => {
	Cookies.remove("token");
	Cookies.remove("refreshToken");
	Cookies.remove("role");
};

export { getBaseUrl, getAuthCookies, checkAuthCookieExists, removeAuthCookies };
