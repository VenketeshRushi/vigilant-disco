import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="flex items-center min-h-full px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
			<div className="w-full space-y-6 text-center">
				<div className="space-y-3">
					<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
						404 Page not found!
					</h1>
					<p className="text-muted-500">
						Sorry, we couldn&#x27;t find the page you&#x27;re looking for.
					</p>
				</div>
				<Link
					to="/"
					className="inline-flex h-10 items-center rounded-md border border-muted-200 border-muted-200 shadow-sm px-8 text-md font-semibold transition-colors bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 cursor-pointer "
					prefetch={false}
				>
					Return to website
				</Link>
			</div>
		</div>
	);
}
