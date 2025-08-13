import * as React from "react";
import {
	TbCamera,
	TbChartBar,
	TbDashboard,
	TbDatabase,
	TbFileAi,
	TbFileDescription,
	TbFileWord,
	TbFolder,
	TbHelp,
	TbListDetails,
	TbReport,
	TbSearch,
	TbSettings,
	TbUsers,
	TbInnerShadowTop,
} from "react-icons/tb";

import { NavDocuments } from "@/components/Sidebar/nav-documents.jsx";
import { NavMain } from "@/components/Sidebar/nav-main.jsx";
import { NavSecondary } from "@/components/Sidebar/nav-secondary.jsx";
import { NavUser } from "@/components/Sidebar/nav-user.jsx";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{ title: "Dashboard", url: "/dashboard", icon: TbDashboard },
		{ title: "Lifecycle", url: "#", icon: TbListDetails },
		{ title: "Analytics", url: "#", icon: TbChartBar },
		{ title: "Projects", url: "#", icon: TbFolder },
		{ title: "Team", url: "#", icon: TbUsers },
	],
	navClouds: [
		{
			title: "Capture",
			icon: TbCamera,
			isActive: true,
			url: "#",
			items: [
				{ title: "Active Proposals", url: "#" },
				{ title: "Archived", url: "#" },
			],
		},
		{
			title: "Proposal",
			icon: TbFileDescription,
			url: "#",
			items: [
				{ title: "Active Proposals", url: "#" },
				{ title: "Archived", url: "#" },
			],
		},
		{
			title: "Prompts",
			icon: TbFileAi,
			url: "#",
			items: [
				{ title: "Active Proposals", url: "#" },
				{ title: "Archived", url: "#" },
			],
		},
	],
	navSecondary: [
		{ title: "Settings", url: "#", icon: TbSettings },
		{ title: "Get Help", url: "#", icon: TbHelp },
		{ title: "Search", url: "#", icon: TbSearch },
	],
	documents: [
		{ name: "Data Library", url: "#", icon: TbDatabase },
		{ name: "Reports", url: "#", icon: TbReport },
		{ name: "Word Assistant", url: "#", icon: TbFileWord },
	],
};

export default function PrivateSidebar({ ...props }) {
	return (
		<Sidebar collapsible="offcanvas" {...props} className={"cursor-pointer"}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<a href={"/dashboard"}>
								<TbInnerShadowTop className="!size-5" />
								<span className="text-base font-semibold">MY WEBSITE</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavDocuments items={data.documents} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
