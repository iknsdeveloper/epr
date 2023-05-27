"use client";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

const Signin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false); // Loading state
	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (password === '' || email === '') {
			toast.error("Fill all fields!");
			return;
		}

		if (password.length < 6) {
			toast.error("Password must be at least 6 characters long");
			return;
		}

		setIsLoading(true); // Set loading state to true

		try {
			const res = await signIn('credentials', { email, password, redirect: false });

			if (res?.error == null) {
				router.push("/dashboard/queue");
			} else {
				toast.error("Error occurred while logging in");
			}
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false); // Set loading state to false
	};

	async function handleGoogleSignin() {
		signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_DASHBOARD });
	}

	return (
		<>
			<section className="bg-gray-50">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
								Sign in to your account
							</h1>

							<form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
								<div>
									<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
									<input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
								</div>
								<div>
									<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
									<input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-start">
										<div className="flex items-center h-5">
											<input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
										</div>
										<div className="ml-3 text-sm">
											<label htmlFor="remember" className="text-gray-500">Remember me</label>
										</div>
									</div>
									<a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
								</div>

								<button type="submit" className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3.5 text-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
									{isLoading ? 'Loading...' : 'Sign in'}
								</button>

								<button type="button" onClick={handleGoogleSignin} className="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-3.5 text-center justify-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
									<svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
									Sign in with Google
								</button>

								<p className="text-sm font-light text-gray-500">
									Don&#39;t have an account yet? <Link href="/register" className="font-medium text-primary-600 hover:underline">Sign up</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
			<ToastContainer />
		</>
	);
};

export default Signin;
