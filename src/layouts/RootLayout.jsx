import React from "react";
import Navbar from "@/components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import PrivateSidebar from "@/components/PrivateSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/Sidebar/site-header";
import { getAuthCookies, removeAuthCookies } from "@/utils/ext";

export default function RootLayout() {
	const navigate = useNavigate();
	const { token, refreshToken, role } = getAuthCookies();

	React.useEffect(() => {
		if (!token || !refreshToken || !role) {
			removeAuthCookies();
			navigate("/login", { replace: true });
		}
	}, [token, refreshToken, role, navigate]);

	const Header = () => (
		<header className="flex-none h-20 sticky top-0 left-0 w-full z-50 backdrop-blur-sm bg-background/80 border-b border-muted-500 drop-shadow-sidebar-border">
			<div className="h-full flex items-center justify-between px-4">
				<Navbar />
			</div>
		</header>
	);

	return (
		<>
			{token && refreshToken && role ? (
				<SidebarProvider
					style={{
						"--sidebar-width": "calc(var(--spacing) * 72)",
						"--header-height": "calc(var(--spacing) * 12)",
					}}
				>
					<PrivateSidebar variant="inset" />
					<SidebarInset>
						<SiteHeader />
						<div className="flex flex-1 flex-col px-10 overflow-y-hidden-scroll">
							<div className="@container/main flex flex-1 flex-col gap-2">
								<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
									<div className="flex flex-1 flex-col">
										<Outlet />
									</div>
								</div>
							</div>
						</div>
					</SidebarInset>
				</SidebarProvider>
			) : (
				<div className="flex flex-col h-screen bg-background">
					<Header />
					<main className="flex-1 bg-dark-300 overflow-y-auto px-4">
						<Outlet />
					</main>
				</div>
			)}
		</>
	);
}
