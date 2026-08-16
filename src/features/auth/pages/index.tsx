import React, { useState } from "react";
import useAuth from "../hook/useAuth";
import { useAppSelector } from "../../../context/hooks";
import { Link, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Eye, EyeOff } from "lucide-react";

const Auth = (): React.ReactNode => {
	//login states
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	//register states
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [agreeTerms, setAgreeTerms] = useState(false);

	const { handleRegister, handleLogin } = useAuth();
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	const [mode, setMode] = useState<"login" | "register">("login");

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}
	return (
		<section className="flex h-[calc(100dvh-64px)] items-center justify-center bg-white sm:h-[calc(100dvh-80px)] 2xl:h-[calc(100dvh-96px)] dark:bg-black">
			<div className="center-modal transition-height flex max-h-fit w-4/5 items-stretch justify-between overflow-hidden rounded-3xl border border-black/50 shadow-[0_0px_30px_0px_rgba(0,0,0,0.25)] md:max-w-[70%] dark:border-white/25 dark:shadow-[0_0px_30px_0px_rgba(255,255,255,0.25)]">
				{/* Left Side: Brand Experience / Editorial Banner */}
				<div className="relative hidden w-1/2 flex-col justify-between border-r border-black/10 bg-neutral-100 p-8 dark:border-white/10 dark:bg-neutral-900/60 lg:flex 2xl:p-12">
					TODO: 3D product showcase
				</div>
				<div className="flex h-full w-full flex-col gap-4 p-6 sm:p-8 lg:w-1/2 2xl:gap-6">
					<div className="relative flex w-fit items-center justify-center gap-1 self-center rounded-full border border-white/50 bg-black/30 p-1">
						<button
							type="button"
							onClick={() => setMode("login")}
							className={`relative z-10 rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
								mode === "login"
									? "text-black"
									: "text-neutral-300 hover:text-white"
							}`}
						>
							{mode === "login" && (
								<motion.div
									layoutId="active-pill"
									className="absolute inset-0 z-[-1] rounded-full bg-white shadow-md"
									transition={{ type: "spring", stiffness: 500, damping: 35 }}
								/>
							)}
							Login
						</button>
						<button
							type="button"
							onClick={() => setMode("register")}
							className={`relative z-10 rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
								mode === "register"
									? "text-black"
									: "text-neutral-300 hover:text-white"
							}`}
						>
							{mode === "register" && (
								<motion.div
									layoutId="active-pill"
									className="absolute inset-0 z-[-1] rounded-full bg-white shadow-md"
									transition={{ type: "spring", stiffness: 500, damping: 35 }}
								/>
							)}
							Register
						</button>
					</div>

					<AnimatePresence mode="wait">
						{mode === "login" ? (
							<motion.form
								key="login-form"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{ duration: 0.25, ease: "easeInOut" }}
								onSubmit={(e) => {
									e.preventDefault();
									handleLogin({ email, password });
								}}
								className="my-auto flex w-full flex-col justify-center gap-4 self-center sm:gap-5 2xl:w-4/5 2xl:gap-8"
							>
								{/* Google Social Button */}
								<a
									href={`${import.meta.env.VITE_API_URL}/auth/google`}
									className="group flex w-full items-center justify-center gap-3 rounded-full border border-black/20 bg-black/5 px-4 py-3 text-xs font-semibold text-black transition-all hover:bg-black hover:text-white sm:text-sm 2xl:py-4 2xl:text-base dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white dark:hover:text-black"
								>
									<svg
										className="h-4 w-4 fill-current sm:h-5 sm:w-5 2xl:h-6 2xl:w-6"
										viewBox="0 0 24 24"
									>
										<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.987 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
									</svg>
									<span>Continue with Google</span>
								</a>

								{/* Divider */}
								<div className="flex items-center justify-between gap-4">
									<div className="h-px grow bg-black/20 dark:bg-white/20" />
									<span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase sm:text-xs dark:text-neutral-400">
										or
									</span>
									<div className="h-px grow bg-black/20 dark:bg-white/20" />
								</div>

								{/* Input Fields */}
								<div className="flex flex-col gap-3.5 sm:gap-4 2xl:gap-6">
									<div className="flex flex-col gap-1.5">
										<label
											htmlFor="email"
											className="font-mono text-xs tracking-wider text-neutral-600 uppercase sm:text-sm 2xl:text-base dark:text-neutral-400"
										>
											Email
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

									<div className="flex flex-col gap-1.5">
										<label
											htmlFor="password"
											className="font-mono text-xs tracking-wider text-neutral-600 uppercase sm:text-sm 2xl:text-base dark:text-neutral-400"
										>
											Password
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
												aria-label={
													showPassword ? "Hide password" : "Show password"
												}
											>
												{showPassword ? (
													<EyeOff className="h-4 w-4 sm:h-4.5 sm:w-4.5 2xl:h-5 2xl:w-5" />
												) : (
													<Eye className="h-4 w-4 sm:h-4.5 sm:w-4.5 2xl:h-5 2xl:w-5" />
												)}
											</button>
										</div>
									</div>
								</div>

								{/* Controls */}
								<div className="flex items-center justify-between text-xs text-neutral-600 sm:text-sm 2xl:text-base dark:text-neutral-400">
									<label className="flex cursor-pointer items-center gap-2 select-none">
										<input
											type="checkbox"
											id="remember"
											className="rounded border-black/20 bg-transparent text-black focus:ring-0 dark:border-white/20 dark:text-white"
										/>
										<span>Remember me</span>
									</label>
									<Link
										to="/forgot-password"
										className="font-medium underline underline-offset-4 transition-colors hover:text-black dark:hover:text-white"
									>
										Forgot password?
									</Link>
								</div>

								{/* Submit Button */}
								<button
									type="submit"
									className="mt-2 w-full rounded-full bg-black py-3 text-xs font-semibold tracking-widest text-white uppercase transition-transform active:scale-[0.99] sm:py-3.5 sm:text-sm 2xl:py-4 2xl:text-base dark:bg-white dark:text-black"
								>
									Login
								</button>

								{/* Switch Mode Prompt */}
								<p className="text-center text-xs text-neutral-500 sm:text-sm 2xl:text-base dark:text-neutral-400">
									Don't have an account?{" "}
									<button
										type="button"
										onClick={() => setMode("register")}
										className="font-semibold text-black underline underline-offset-4 hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300"
									>
										Register
									</button>
								</p>
							</motion.form>
						) : (
							<motion.form
								key="register-form"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.25, ease: "easeInOut" }}
								onSubmit={(e) => {
									e.preventDefault();
									if (!agreeTerms) return;
									handleRegister({ fullName, email, password, phoneNumber });
								}}
								className="my-auto flex max-h-full w-full flex-col justify-center gap-3.5 self-center overflow-y-auto py-1 sm:gap-4 2xl:w-4/5 2xl:gap-6"
							>
								{/* Google Social Button */}
								<a
									href={`${import.meta.env.VITE_API_URL}/auth/google`}
									className="group flex w-full items-center justify-center gap-3 rounded-full border border-black/20 bg-black/5 px-4 py-2.5 text-xs font-semibold text-black transition-all hover:bg-black hover:text-white sm:py-3 sm:text-sm 2xl:py-4 2xl:text-base dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white dark:hover:text-black"
								>
									<svg
										className="h-4 w-4 fill-current sm:h-5 sm:w-5 2xl:h-6 2xl:w-6"
										viewBox="0 0 24 24"
									>
										<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.987 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
									</svg>
									<span>Register with Google</span>
								</a>

								{/* Divider */}
								<div className="flex items-center justify-between gap-4">
									<div className="h-px grow bg-black/20 dark:bg-white/20" />
									<span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase sm:text-xs dark:text-neutral-400">
										or
									</span>
									<div className="h-px grow bg-black/20 dark:bg-white/20" />
								</div>

								{/* Input Fields */}
								<div className="flex flex-col gap-3 sm:gap-3.5 2xl:gap-5">
									<div className="flex flex-col gap-1">
										<label
											htmlFor="fullName"
											className="font-mono text-xs tracking-wider text-neutral-600 uppercase sm:text-sm 2xl:text-base dark:text-neutral-400"
										>
											Full Name
										</label>
										<input
											type="text"
											id="fullName"
											className="w-full rounded-full border border-black/20 bg-transparent px-4 py-2 text-xs placeholder-neutral-400 transition-colors outline-none sm:py-2.5 sm:text-sm 2xl:px-6 2xl:py-3.5 2xl:text-base dark:border-white/20 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
											placeholder="John Doe"
											value={fullName}
											onChange={(e) => setFullName(e.target.value)}
											required
										/>
									</div>

									<div className="flex flex-col gap-1">
										<label
											htmlFor="reg-email"
											className="font-mono text-xs tracking-wider text-neutral-600 uppercase sm:text-sm 2xl:text-base dark:text-neutral-400"
										>
											Email
										</label>
										<input
											type="email"
											id="reg-email"
											className="w-full rounded-full border border-black/20 bg-transparent px-4 py-2 text-xs placeholder-neutral-400 transition-colors outline-none sm:py-2.5 sm:text-sm 2xl:px-6 2xl:py-3.5 2xl:text-base dark:border-white/20 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
											placeholder="name@example.com"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
										/>
									</div>

									<div className="flex flex-col gap-1">
										<label
											htmlFor="phoneNumber"
											className="font-mono text-xs tracking-wider text-neutral-600 uppercase sm:text-sm 2xl:text-base dark:text-neutral-400"
										>
											Phone Number
										</label>
										<input
											type="tel"
											id="phoneNumber"
											className="w-full rounded-full border border-black/20 bg-transparent px-4 py-2 text-xs placeholder-neutral-400 transition-colors outline-none sm:py-2.5 sm:text-sm 2xl:px-6 2xl:py-3.5 2xl:text-base dark:border-white/20 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
											placeholder="+1 (555) 000-0000"
											value={phoneNumber}
											onChange={(e) => setPhoneNumber(e.target.value)}
											required
										/>
									</div>

									<div className="flex flex-col gap-1">
										<label
											htmlFor="reg-password"
											className="font-mono text-xs tracking-wider text-neutral-600 uppercase sm:text-sm 2xl:text-base dark:text-neutral-400"
										>
											Password
										</label>
										<div className="relative flex items-center">
											<input
												type={showPassword ? "text" : "password"}
												id="reg-password"
												className="w-full rounded-full border border-black/20 bg-transparent px-4 py-2 pr-11 text-xs placeholder-neutral-400 transition-colors outline-none sm:py-2.5 sm:text-sm 2xl:px-6 2xl:py-3.5 2xl:pr-14 2xl:text-base dark:border-white/20 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
												placeholder="••••••••"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												required
											/>
											<button
												type="button"
												onClick={() => setShowPassword((prev) => !prev)}
												className="absolute right-3 text-neutral-500 transition-colors hover:text-black 2xl:right-4 dark:text-neutral-400 dark:hover:text-white"
												aria-label={
													showPassword ? "Hide password" : "Show password"
												}
											>
												{showPassword ? (
													<EyeOff className="h-4 w-4 sm:h-4.5 sm:w-4.5 2xl:h-5 2xl:w-5" />
												) : (
													<Eye className="h-4 w-4 sm:h-4.5 sm:w-4.5 2xl:h-5 2xl:w-5" />
												)}
											</button>
										</div>
									</div>
								</div>

								{/* Agreement Checkbox */}
								<div className="flex items-center gap-2 pt-1 text-xs text-neutral-600 sm:text-sm 2xl:text-base dark:text-neutral-400">
									<input
										type="checkbox"
										id="agreeTerms"
										checked={agreeTerms}
										onChange={(e) => setAgreeTerms(e.target.checked)}
										className="cursor-pointer rounded border-black/20 bg-transparent text-black focus:ring-0 dark:border-white/20 dark:text-white"
									/>
									<label htmlFor="agreeTerms" className="cursor-pointer select-none">
										I agree to the{" "}
										<Link
											to="/terms"
											className="font-medium text-black underline underline-offset-4 dark:text-white"
										>
											Terms of Service
										</Link>{" "}
										and{" "}
										<Link
											to="/privacy"
											className="font-medium text-black underline underline-offset-4 dark:text-white"
										>
											Privacy Policy
										</Link>
									</label>
								</div>

								{/* Submit Button */}
								<button
									type="submit"
									disabled={!agreeTerms}
									className="mt-1 w-full rounded-full bg-black py-2.5 text-xs font-semibold tracking-widest text-white uppercase transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 sm:py-3 sm:text-sm 2xl:py-4 2xl:text-base dark:bg-white dark:text-black"
								>
									Register
								</button>

								{/* Switch Mode Prompt */}
								<p className="text-center text-xs text-neutral-500 sm:text-sm 2xl:text-base dark:text-neutral-400">
									Already have an account?{" "}
									<button
										type="button"
										onClick={() => setMode("login")}
										className="font-semibold text-black underline underline-offset-4 hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300"
									>
										Login
									</button>
								</p>
							</motion.form>
						)}
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
};

export default Auth;
