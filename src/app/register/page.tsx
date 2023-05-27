"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false); // Added loading state

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (username === "" || email === "" || password === "") {
			toast.error("Fill all fields");
			return;
		}

		if (password.length < 6) {
			toast.error("Password must be at least 6 characters");
			return;
		}

		try {
			setIsLoading(true); // Set loading state to true

			const res = await fetch("/api/register", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({ username, email, password }),
			});

			console.log(await res.json());
			if (res.ok) {
				toast.success("Successfully registered the user");
				setTimeout(() => {
					signIn();
				}, 1500);
				return;
			} else {
				toast.error("Error occurred while registering");
				return;
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false); // Set loading state back to false
		}
	};




	return (
		<>
			<div className="flex">
				<div className="auth-bg bg-[#065ada] lg:flex h-screen w-screen hidden justify-center items-center">
					<div className="text-white">sdsd</div>
				</div>

				<div className="w-full bg-white flex h-screen justify-center items-center">
					<div className="w-6/12">
						<form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
							<div>
								<input
									type="text"
									onChange={(e) => setUsername(e.target.value)}
									name="username"
									id="username"
									className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
									placeholder="username"
								/>
							</div>

							<div>
								<input
									type="email"
									onChange={(e) => setEmail(e.target.value)}
									name="email"
									id="email"
									className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
									placeholder="name@company.com"
								/>
							</div>

							<div>
								<input
									type="password"
									onChange={(e) => setPassword(e.target.value)}
									name="password"
									id="password"
									placeholder="••••••••"
									className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
								/>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
								disabled={isLoading} // Disable button when loading
							>
								{isLoading ? "Loading..." : "Register"}
							</button>


						</form>
						<p className="text-sm font-light text-gray-500">
							Already have an account?
							<Link href="/signin?callbackUrl=/dashboard/queue" className="font-medium text-primary-600 hover:underline">
								Sign In
							</Link>
						</p>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
};

export default Register;
