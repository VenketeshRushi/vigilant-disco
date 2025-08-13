import { Navigate } from "react-router-dom";
import { getAuthCookies, removeAuthCookies } from "@/utils/ext";

const RoleGuard = ({ role, children }) => {
	console.log("RoleGuard: Checking access for role:", role);

	const { token, refreshToken, role: userRole } = getAuthCookies();

	console.log("RoleGuard: Token exists:", !!token);
	console.log("RoleGuard: Role from cookie:", userRole);

	if (!token || !refreshToken) {
		console.log(
			"RoleGuard: No valid token or refresh token found, redirecting to login"
		);
		removeAuthCookies();
		return <Navigate to="/login" replace />;
	}

	if (userRole === role) {
		console.log(
			"RoleGuard: Role match successful, rendering protected content"
		);
		return children;
	} else {
		console.log(
			`RoleGuard: Role mismatch. Expected: ${role}, Got: ${userRole}`
		);
		return <Navigate to="/dashboard" replace />;
	}
};

export default RoleGuard;
