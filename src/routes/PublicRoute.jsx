import { Navigate, Outlet } from "react-router-dom";
import { getAuthCookies } from "@/utils/ext";

const PublicRoute = () => {
	const { token, refreshToken, role } = getAuthCookies();

	return token && refreshToken && role ? (
		<Navigate to="/dashboard" replace />
	) : (
		<Outlet />
	);
};

export default PublicRoute;
