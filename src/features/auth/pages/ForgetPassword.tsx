import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, KeyRound } from "lucide-react";
import useAuth from "../hook/useAuth";
import appToast from "../../../components/toast";

const ForgotPassword = (): React.ReactNode => {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const { handleForgetPassword } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email) return;

		try {
			setIsLoading(true);
			await handleForgetPassword(email);
			setIsSubmitted(true);
			appToast.success("Reset instructions sent to your email");
		} catch (error) {
			appToast.error("Failed to send reset link. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="flex h-[calc(100dvh-64px)] items-center justify-center bg-white sm:h-[calc(100dvh-80px)] 2xl:h-[calc(100dvh-96px)] dark:bg-black">
			<div className="center-modal transition-height flex max-h-fit w-4/5 items-stretch justify-between overflow-hidden rounded-3xl border border-black/50 shadow-[0_0px_30px_0px_rgba(0,0,0,0.25)] md:max-w-[70%] dark:border-white/25 dark:shadow-[0_0px_30px_0px_rgba(255,255,255,0.25)]">
				{/* Left Side: Brand Editorial Banner */}
				<div className="relative hidden w-1/2 flex-col justify-between border-r border-black/10 bg-neutral-100 p-8 dark:border-white/10 dark:bg-neutral-900/60 lg:flex 2xl:p-12">
					TODO: 3D product showcase
				</div>

				{/* Right Side: Form Container */}
				<div className="flex h-full w-full flex-col justify-center gap-4 p-6 sm:p-8 lg:w-1/2 2xl:gap-6">
					<motion.form
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						onSubmit={handleSubmit}
						className="my-auto flex w-full flex-col justify-center gap-5 self-center 2xl:w-4/5 2xl:gap-8"
					>
						{/* Icon Header */}
						<div className="flex flex-col items-center gap-2 text-center">
							<div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-black/5 text-black sm:h-14 sm:w-14 2xl:h-16 2xl:w-16 dark:border-white/20 dark:bg-white/5 dark:text-white">
								<KeyRound className="h-6 w-6 sm:h-7 sm:w-7 2xl:h-8 2xl:w-8" />
							</div>
							<h1 className="font-serif text-2xl font-bold tracking-tight text-black sm:text-3xl 2xl:text-4xl dark:text-white">
								Forgot Password?
							</h1>
							<p className="text-xs text-neutral-500 sm:text-sm 2xl:text-base dark:text-neutral-400">
								{isSubmitted
									? "Check your inbox for instructions to reset your password."
									: "Enter your registered email and we'll send you a password reset link."}
							</p>
						</div>

						{/* Input Field */}
						{!isSubmitted && (
							<div className="flex flex-col gap-1.5">
								<label
									htmlFor="email"
									className="font-mono text-xs tracking-wider text-neutral-600 uppercase sm:text-sm 2xl:text-base dark:text-neutral-400"
								>
									Email Address
								</label>
								<input
									type="email"
									id="email"
									className="w-full rounded-full border border-black/20 bg-transparent px-4 py-2.5 text-xs placeholder-neutral-400 transition-colors outline-none sm:text-sm 2xl:px-6 2xl:py-3.5 2xl:text-base dark:border-white/20 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
									placeholder="name@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
						)}

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading}
							className="w-full rounded-full bg-black py-3 text-xs font-semibold tracking-widest text-white uppercase transition-transform active:scale-[0.99] disabled:opacity-50 sm:py-3.5 sm:text-sm 2xl:py-4 2xl:text-base dark:bg-white dark:text-black"
						>
							{isLoading
								? "Sending Link..."
								: isSubmitted
								? "Resend Reset Link"
								: "Send Reset Link"}
						</button>

						{/* Back to Login Link */}
						<div className="flex justify-center pt-2">
							<Link
								to="/auth"
								className="group inline-flex items-center gap-2 text-xs font-semibold text-black transition-colors hover:text-neutral-700 sm:text-sm 2xl:text-base dark:text-white dark:hover:text-neutral-300"
							>
								<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
								<span>Back to Login</span>
							</Link>
						</div>
					</motion.form>
				</div>
			</div>
		</section>
	);
};

export default ForgotPassword;