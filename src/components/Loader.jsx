import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function Loader() {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="flex flex-col items-center space-y-4">
				<Button variant="secondary" size="icon" className="size-8">
					<Loader2 className="animate-spin font-extrabold" />
				</Button>
			</div>
		</div>
	);
}

export default Loader;
