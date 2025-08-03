import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = () => {
	const token = Cookies.get("token");
	const userRole = Cookies.get("role");
	return token && userRole ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
