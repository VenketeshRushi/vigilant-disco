import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, Bot } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { removeAuthCookies, checkAuthCookieExists } from "@/utils/ext";

export default function Navbar() {
	const isAuthenticated = checkAuthCookieExists();
	const navigate = useNavigate();
	const sheetRef = useRef(null);

	const navItems = [
		{ label: "Feature", to: "/feature" },
		{ label: "Pricing", to: "/pricing" },
		{ label: "Contact", to: "/contact" },
		{ label: "About", to: "/about" },
	];

	const handleMobileClick = () => {
		sheetRef.current?.close();
	};

	const handleLogout = () => {
		removeAuthCookies();
		navigate("/");
	};

	return (
		<nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className="flex items-center justify-between h-20 px-6 backdrop-blur-sm border-b drop-shadow-sidebar-border border-muted-500 border-accent sticky top-0 left-0 w-full z-50"
		>
			{/* Logo */}
			<Link
				to={!isAuthenticated ? "/" : "/dashboard"}
				className="flex items-center space-x-2"
			>
				<Bot className="w-8 h-8 text-primary-500" />
			</Link>

			{/* Desktop Nav */}
			<div className="hidden lg:flex items-center space-x-8">
				{navItems.map((item) => (
					<CustomNavLink key={item.to} to={item.to}>
						{item.label}
					</CustomNavLink>
				))}
			</div>

			{/* Desktop Buttons */}
			<div className="hidden md:flex items-center space-x-4">
				{isAuthenticated ? (
					<Button variant="outline" onClick={handleLogout}>
						Logout
					</Button>
				) : (
					<>
						<Button
							variant="outline"
							onClick={() => navigate("/login")}
							className="cursor-pointer"
						>
							Login
						</Button>
						<Button
							className="cursor-pointer"
							onClick={() => navigate("/signup")}
						>
							Sign Up
						</Button>
					</>
				)}

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
			</div>

			{/* Mobile Menu */}
			<Sheet ref={sheetRef}>
				<SheetTrigger
					asChild
					className="md:hidden border-2 rounded p-2 hover:bg-muted/50"
				>
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden hover:text-muted"
						aria-label="Open menu"
					>
						<Menu className="w-6 h-6" />
					</Button>
				</SheetTrigger>

				<SheetContent side="right" className="w-64 p-2">
					<SheetHeader className="border-b">
						<SheetTitle>Menu</SheetTitle>
					</SheetHeader>

					<ScrollArea className="relative h-full">
						{/* Nav links */}
						<nav className="space-y-4 pb-16">
							{navItems.map((item) => (
								<NavLink
									key={item.to}
									to={item.to}
									onClick={handleMobileClick}
									className={({ isActive }) =>
										`block px-4 py-2 rounded-md border bg-muted/90 font-medium hover:bg-accent hover:text-accent-foreground ${
											isActive ? "text-foreground" : "text-foreground"
										}`
									}
								>
									{item.label}
								</NavLink>
							))}
						</nav>

						{/* Mobile Auth Buttons */}
						<div className="w-full absolute bottom-6 space-y-4 pb-16">
							<div className="absolute w-full flex flex-1 flex-col gap-2">
								{isAuthenticated ? (
									<Button
										onClick={() => {
											handleLogout();
											handleMobileClick();
										}}
										className="P-2"
									>
										Logout
									</Button>
								) : (
									<>
										<Button
											onClick={() => {
												navigate("/login");
												handleMobileClick();
											}}
											className="P-2"
										>
											Login
										</Button>
										<Button
											onClick={() => {
												navigate("/signup");
												handleMobileClick();
											}}
											className="P-2"
										>
											Sign Up
										</Button>
									</>
								)}
							</div>
						</div>
					</ScrollArea>
				</SheetContent>
			</Sheet>
		</nav>
	);
}

// Separate NavLink component for desktop navigation
function CustomNavLink({ to, children }) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`text-dark hover:text-primary transition-colors relative group ${
					isActive ? "text-white" : ""
				}`
			}
		>
			{children}
			<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-muted-foreground transition-all group-hover:w-full" />
		</NavLink>
	);
}
