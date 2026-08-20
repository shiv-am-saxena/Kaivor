import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff } from "lucide-react";
import useAuth from "../hook/useAuth";
import appToast from "../../../components/toast";
import { TextRoll } from "../../../components/ui/TextRoll";

const ResetPassword: React.FC = () => {
	const [password, setPassword] = useState("");
	const [cnfPassword, setCnfPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showCnfPassword, setShowCnfPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [searchParams] = useSearchParams();
	const token = searchParams.get("token") || "";
	const { handleResetPassword } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		if (!password || !cnfPassword) return;

		if (password !== cnfPassword) {
			appToast.error("Passwords do not match");
			return;
		}

		if (!token) {
			appToast.error("Invalid or missing reset token");
			return;
		}

		try {
			setIsLoading(true);
			await handleResetPassword({ password, cnfPassword }, token);
			appToast.success("Password reset successfully");
			navigate("/auth");
		} catch (error) {
			appToast.error("Failed to reset password. Link may be expired.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="flex h-[calc(100dvh-64px)] items-center justify-center bg-white sm:h-[calc(100dvh-80px)] 2xl:h-[calc(100dvh-96px)] dark:bg-black">
			<div className="center-modal transition-height flex max-h-fit w-4/5 items-stretch justify-between overflow-hidden rounded-3xl border border-black/50 shadow-[0_0px_30px_0px_rgba(0,0,0,0.25)] md:max-w-[70%] dark:border-white/25 dark:shadow-[0_0px_30px_0px_rgba(255,255,255,0.25)]">
				{/* Left Side: Brand Editorial Banner */}
				<div className="relative hidden w-1/2 flex-col justify-between border-r border-black/10 bg-neutral-100 p-8 dark:border-white/10 dark:bg-neutral-900/60 lg:flex 2xl:p-12">
					{token}
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
								<Lock className="h-6 w-6 sm:h-7 sm:w-7 2xl:h-8 2xl:w-8" />
							</div>
							<h1 className="font-serif text-2xl font-bold tracking-tight text-black sm:text-3xl 2xl:text-4xl dark:text-white">
								Reset Password
							</h1>
							<p className="text-xs text-neutral-500 sm:text-sm 2xl:text-base dark:text-neutral-400">
								Enter your new password below to secure your account.
							</p>
						</div>

						{/* Input Fields */}
						<div className="flex flex-col gap-3.5 sm:gap-4 2xl:gap-6">
							<div className="flex flex-col gap-1.5">
								<label
									htmlFor="password"
									className="font-mono text-xs tracking-wider text-neutral-600 uppercase sm:text-sm 2xl:text-base dark:text-neutral-400"
								>
									New Password
								</label>
								<div className="relative flex items-center">
									<input
										type={showPassword ? "text" : "password"}
										id="password"
										className="w-full rounded-full border border-black/20 bg-transparent px-4 py-2.5 pr-11 text-xs placeholder-neutral-400 transition-colors outline-none sm:text-sm 2xl:px-6 2xl:py-3.5 2xl:pr-14 2xl:text-base dark:border-white/20 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword((prev) => !prev)}
										className="absolute right-3 text-neutral-500 transition-colors hover:text-black 2xl:right-4 dark:text-neutral-400 dark:hover:text-white"
										aria-label={showPassword ? "Hide password" : "Show password"}
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4 sm:h-4.5 sm:w-4.5 2xl:h-5 2xl:w-5" />
										) : (
											<Eye className="h-4 w-4 sm:h-4.5 sm:w-4.5 2xl:h-5 2xl:w-5" />
										)}
									</button>
								</div>
							</div>

							<div className="flex flex-col gap-1.5">
								<label
									htmlFor="cnfPassword"
									className="font-mono text-xs tracking-wider text-neutral-600 uppercase sm:text-sm 2xl:text-base dark:text-neutral-400"
								>
									Confirm New Password
								</label>
								<div className="relative flex items-center">
									<input
										type={showCnfPassword ? "text" : "password"}
										id="cnfPassword"
										className="w-full rounded-full border border-black/20 bg-transparent px-4 py-2.5 pr-11 text-xs placeholder-neutral-400 transition-colors outline-none sm:text-sm 2xl:px-6 2xl:py-3.5 2xl:pr-14 2xl:text-base dark:border-white/20 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
										placeholder="••••••••"
										value={cnfPassword}
										onChange={(e) => setCnfPassword(e.target.value)}
										required
									/>
									<button
										type="button"
										onClick={() => setShowCnfPassword((prev) => !prev)}
										className="absolute right-3 text-neutral-500 transition-colors hover:text-black 2xl:right-4 dark:text-neutral-400 dark:hover:text-white"
										aria-label={showCnfPassword ? "Hide password" : "Show password"}
									>
										{showCnfPassword ? (
											<EyeOff className="h-4 w-4 sm:h-4.5 sm:w-4.5 2xl:h-5 2xl:w-5" />
										) : (
											<Eye className="h-4 w-4 sm:h-4.5 sm:w-4.5 2xl:h-5 2xl:w-5" />
										)}
									</button>
								</div>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading}
							className="w-full rounded-full bg-black py-3 text-xs font-semibold tracking-widest text-white uppercase transition-transform active:scale-[0.99] disabled:opacity-50 sm:py-3.5 sm:text-sm 2xl:py-4 2xl:text-base dark:bg-white dark:text-black"
						>
							<TextRoll>{isLoading ? "Resetting..." : "Reset Password"}</TextRoll>
						</button>
					</motion.form>
				</div>
			</div>
		</section>
	);
};

export default ResetPassword;