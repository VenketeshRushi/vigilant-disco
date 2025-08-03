import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const RoleGuard = ({ role, children }) => {
	console.log("RoleGuard: Checking access for role:", role);

	const token = Cookies.get("token");
	const userRole = Cookies.get("role");

	console.log("RoleGuard: Token exists:", !!token);
	console.log("RoleGuard: Role from cookie:", userRole);

	if (!token) {
		console.log("RoleGuard: No token found, redirecting to login");
		Cookies.remove("token");
		Cookies.remove("role");
		return <Navigate to="/login" replace />;
	}

	if (userRole === role) {
		console.log(
			"RoleGuard: Role match successful, rendering protected content"
		);
		return children;
	} else {
		console.log("RoleGuard: Role mismatch. Expected:", role, "Got:", userRole);
		console.log("RoleGuard: Redirecting to dashboard");
		return <Navigate to="/dashboard" replace />;
	}
};

export default RoleGuard;
