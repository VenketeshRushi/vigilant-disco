import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "@/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/useToast";
import CustomInputField from "@/components/ReuseableComponents/CustomInputField";

export default function Signup() {
	const { error: toastError, success: toastSuccess } = useToast();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.auth.loading);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const validate = () => {
		const messages = [];
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!name.trim()) messages.push("Name is required");
		if (!email.trim()) messages.push("Email is required");
		else if (!emailRegex.test(email.trim())) messages.push("Email is invalid");

		if (!password) messages.push("Password is required");
		if (!confirmPassword) messages.push("Confirm Password is required");
		if (password && confirmPassword && password !== confirmPassword)
			messages.push("Passwords do not match");

		if (messages.length) {
			toastError(messages.join(". "));
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;

		try {
			await dispatch(
				signupUser({ name: name.trim(), email: email.trim(), password })
			).unwrap();
			toastSuccess("Signup successful. You can now log in!");
			navigate("/login");
		} catch (err) {
			toastError(err.message || "An unexpected error occurred");
		}
	};

	return (
		<div className="flex h-full items-center justify-center bg-background">
			<Card className="w-full max-w-md rounded-2xl shadow-lg">
				<CardContent className="px-6">
					<form onSubmit={handleSubmit} noValidate className="space-y-6">
						<div className="space-y-1">
							<h1 className="text-2xl font-semibold">Create an account</h1>
							<p className="text-sm text-muted-foreground">
								Fill in your details to sign up
							</p>
						</div>

						<CustomInputField
							id="name"
							label="Name"
							type="text"
							value={name}
							onChange={setName}
							placeholder="John Doe"
						/>

						<CustomInputField
							id="email"
							label="Email"
							type="email"
							value={email}
							onChange={setEmail}
							placeholder="you@example.com"
						/>

						<CustomInputField
							id="password"
							label="Password"
							type="password"
							value={password}
							onChange={setPassword}
							placeholder="••••••••"
						/>

						<CustomInputField
							id="confirmPassword"
							label="Confirm password"
							type="password"
							value={confirmPassword}
							onChange={setConfirmPassword}
							placeholder="••••••••"
						/>

						<Button
							type="submit"
							className={
								"mt-1 w-full p-5 text-md font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-colors duration-300 cursor-pointer"
							}
							disabled={loading}
						>
							{loading ? "Signing up..." : "Sign Up"}
						</Button>

						{/* Login Link */}
						<div className="text-center text-md text-muted-foreground">
							Already have an account?{" "}
							<Link to="/login">
								<Button variant="link" className="p-0 text-md cursor-pointer">
									Login
								</Button>
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
