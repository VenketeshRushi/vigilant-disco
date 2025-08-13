import React from "react";
import { motion } from "motion/react";

function Home() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<h1>Home</h1>
		</motion.div>
	);
}

export default Home;
