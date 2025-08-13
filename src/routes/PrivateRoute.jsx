import { Navigate, Outlet } from "react-router-dom";
import { getAuthCookies } from "@/utils/ext";

const PrivateRoute = () => {
	const { token, refreshToken, role } = getAuthCookies();

	return token && refreshToken && role ? (
		<Outlet />
	) : (
		<Navigate to="/login" replace />
	);
};

export default PrivateRoute;
