import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const CustomInputField = React.forwardRef(
	(
		{
			id,
			label,
			className,
			type = "text",
			value,
			onChange,
			radius = 100,
			glowColor = "#3b82f6",
			...props
		},
		ref
	) => {
		const [visible, setVisible] = React.useState(false);
		const mouseX = useMotionValue(0);
		const mouseY = useMotionValue(0);

		function handleMouseMove({ currentTarget, clientX, clientY }) {
			const { left, top } = currentTarget.getBoundingClientRect();
			mouseX.set(clientX - left);
			mouseY.set(clientY - top);
		}

		const background = useMotionTemplate`
      radial-gradient(
        ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
        ${glowColor},
        transparent 80%
      )
    `;

		return (
			<div className="space-y-2">
				{label && (
					<Label
						htmlFor={id}
						className="text-md font-semibold text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						{label}
					</Label>
				)}
				<motion.div
					style={{ background }}
					onMouseMove={handleMouseMove}
					onMouseEnter={() => setVisible(true)}
					onMouseLeave={() => setVisible(false)}
					className="group/input rounded-lg p-[2px] transition duration-300"
				>
					<Input
						id={id}
						type={type}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						ref={ref}
						va
						className={cn(
							`shadow-input dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-gray-200 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600`,
							className
						)}
						{...props}
					/>
				</motion.div>
			</div>
		);
	}
);

CustomInputField.displayName = "CustomInputField";

export default CustomInputField;
