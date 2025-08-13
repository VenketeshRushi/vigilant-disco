import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import PublicRoute from "@/routes/PublicRoute";
import PrivateRoute from "@/routes/PrivateRoute";
import RoleGuard from "@/routes/RoleGuard";
import NotFound from "@/components/NotFound";
import Loader from "@/components/Loader";
import RootLayout from "@/layouts/RootLayout";

const Home = React.lazy(() => import("@/pages/Home"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const AdminDashboard = React.lazy(() => import("@/pages/AdminDashboard"));
const Login = React.lazy(() => import("@/pages/Login"));
const Signup = React.lazy(() => import("@/pages/Signup"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			// ******** Public routes – only for users who are not logged in
			{
				element: <PublicRoute />,
				children: [
					{
						index: true,
						element: (
							<Suspense fallback={<Loader />}>
								<Home />
							</Suspense>
						),
					},
				],
			},
			{
				element: <PublicRoute />,
				children: [
					{
						path: "login",
						element: (
							<Suspense fallback={<Loader />}>
								<Login />
							</Suspense>
						),
					},
				],
			},
			{
				element: <PublicRoute />,
				children: [
					{
						path: "signup",
						element: (
							<Suspense fallback={<Loader />}>
								<Signup />
							</Suspense>
						),
					},
				],
			},

			// ******** Private dashboard – any logged-in user
			{
				element: <PrivateRoute />,
				children: [
					{
						path: "dashboard",
						element: (
							<Suspense fallback={<Loader />}>
								<Dashboard />
							</Suspense>
						),
					},
				],
			},

			// ******** Admin-only section
			{
				element: (
					<RoleGuard role="admin">
						<Outlet />
					</RoleGuard>
				),
				children: [
					{
						path: "admin",
						element: (
							<Suspense fallback={<Loader />}>
								<AdminDashboard />
							</Suspense>
						),
					},
				],
			},

			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} fallbackElement={<Loader />} />;
}
