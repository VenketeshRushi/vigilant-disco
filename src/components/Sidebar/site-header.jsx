import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Bell } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import { removeAuthCookies, checkAuthCookieExists } from "@/utils/ext";

export function SiteHeader() {
	const navigate = useNavigate();

	useEffect(() => {
		if (!checkAuthCookieExists()) {
			console.log("RoleGuard: No auth cookies found, redirecting to login");
			removeAuthCookies();
			navigate("/login", { replace: true });
		}
	}, [navigate]);

	const handleLogout = () => {
		removeAuthCookies();
		navigate("/login", { replace: true });
	};

	return (
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4"
				/>
				<h1 className="text-base font-medium">Dashboard</h1>
				<div className="ml-auto flex items-center gap-2">
					<div className="flex items-center space-x-6">
						<div className="hidden md:flex items-center space-x-2 bg-muted-800/50 rounded-full px-3 py-1.5 border border-muted-700/50 backdrop-blur-sm">
							<Search className="h-4 w-4 text-dark-400" />
							<input
								type="text"
								placeholder="Search..."
								className="bg-transparent border-none focus:outline-none text-sm w-50 placeholder:text-dark-500"
							/>
						</div>
						<div className="items-center space-x-3 hidden sm:flex">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="outline"
											size="icon"
											className="relative text-dark-400 hover:text-dark-100"
										>
											<Bell className="h-5 w-5" />
											<span className="absolute -top-1 -right-1 h-2 w-2 bg-green-600 rounded-full animate-pulse"></span>
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Notifications</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<ModeToggle />
									</TooltipTrigger>
									<TooltipContent>
										<p>Toggle theme</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<Button
								onClick={handleLogout}
								variant="outline"
								className="dark:text-foreground hidden sm:flex cursor-pointer"
							>
								Logout
							</Button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
