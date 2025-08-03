import React from "react";
import { Outlet } from "react-router-dom";

export default function PublicPageLayout() {
	return (
		<div className="flex flex-col h-screen bg-background">
			<main className="flex-1 bg-dark-300 overflow-y-auto px-4">
				<Outlet />
			</main>
		</div>
	);
}
