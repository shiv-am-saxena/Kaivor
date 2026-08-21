import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import useAuth from "../hook/useAuth";
import appToast from "../../../components/toast";

const VerifyEmail: React.FC = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token") as string;
	const { handleEmailVerification } = useAuth();
	const navigate = useNavigate();

	const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
	const isVerifying = useRef(false);

	useEffect(() => {
		if (isVerifying.current) return;
		isVerifying.current = true;

		let isMounted = true;

		const verify = async () => {
			if (!token) {
				if (isMounted) {
					setStatus("error");
					appToast.error("Verification token is missing");
				}
				return;
			}

			try {
				await handleEmailVerification(token);
				if (isMounted) {
					setStatus("success");
				}
			} catch (error) {
				console.error(error);
				if (isMounted) {
					setStatus("error");
				}
			}
		};

		verify();

		return () => {
			isMounted = false;
		};
	}, [token, handleEmailVerification]);

	return (
		<section className="flex h-[calc(100dvh-64px)] items-center justify-center bg-white sm:h-[calc(100dvh-80px)] 2xl:h-[calc(100dvh-96px)] dark:bg-black">
			<div className="center-modal transition-height flex max-h-fit w-4/5 items-stretch justify-between overflow-hidden rounded-3xl border border-black/50 shadow-[0_0px_30px_0px_rgba(0,0,0,0.25)] md:max-w-[70%] dark:border-white/25 dark:shadow-[0_0px_30px_0px_rgba(255,255,255,0.25)]">
				{/* Left Side: Editorial Banner */}
				<div className="relative hidden w-1/2 flex-col justify-between border-r border-black/10 bg-neutral-100 p-8 dark:border-white/10 dark:bg-neutral-900/60 lg:flex 2xl:p-12">
					<div className="flex items-center gap-2">
						<span className="font-serif text-xl font-bold tracking-tight text-black dark:text-white">
							Kaivor
						</span>
					</div>
					<div className="flex flex-col gap-2">
						<p className="font-serif text-2xl font-medium text-black dark:text-white">
							Email Verification
						</p>
						<p className="text-sm text-neutral-500 dark:text-neutral-400">
							Verifying your identity to grant full access to Kaivor platform features.
						</p>
					</div>
				</div>

				{/* Right Side: Status Container */}
				<div className="flex h-full w-full flex-col justify-center gap-4 p-6 sm:p-8 lg:w-1/2 2xl:gap-6">
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="my-auto flex w-full flex-col items-center justify-center gap-5 text-center self-center 2xl:w-4/5 2xl:gap-8"
					>
						{status === "loading" && (
							<>
								<div className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-500 sm:h-16 sm:w-16">
									<Loader2 className="h-7 w-7 animate-spin sm:h-8 sm:w-8" />
								</div>
								<h1 className="font-serif text-2xl font-bold tracking-tight text-black sm:text-3xl dark:text-white">
									Verifying Email...
								</h1>
								<p className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
									Please wait while we validate your verification token.
								</p>
							</>
						)}

						{status === "success" && (
							<>
								<div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 sm:h-16 sm:w-16">
									<CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8" />
								</div>
								<h1 className="font-serif text-2xl font-bold tracking-tight text-black sm:text-3xl dark:text-white">
									Email Verified Successfully!
								</h1>
								<p className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
									Your email address has been verified. You can now log in and access all features.
								</p>
								<button
									onClick={() => navigate("/auth")}
									className="w-full rounded-full bg-black py-3 text-xs font-semibold tracking-widest text-white uppercase transition-transform active:scale-[0.99] sm:py-3.5 sm:text-sm dark:bg-white dark:text-black"
								>
									Proceed to Login
								</button>
							</>
						)}

						{status === "error" && (
							<>
								<div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-500 sm:h-16 sm:w-16">
									<XCircle className="h-7 w-7 sm:h-8 sm:w-8" />
								</div>
								<h1 className="font-serif text-2xl font-bold tracking-tight text-black sm:text-3xl dark:text-white">
									Verification Failed
								</h1>
								<p className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
									The verification link is invalid, expired, or has already been used.
								</p>
								<div className="flex w-full flex-col gap-3">
									<button
										onClick={() => navigate("/auth")}
										className="w-full rounded-full bg-black py-3 text-xs font-semibold tracking-widest text-white uppercase transition-transform active:scale-[0.99] sm:py-3.5 sm:text-sm dark:bg-white dark:text-black"
									>
										Back to Auth
									</button>
									<Link
										to="/"
										className="text-xs text-neutral-500 underline transition-colors hover:text-black dark:hover:text-white"
									>
										Go to Home
									</Link>
								</div>
							</>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default VerifyEmail;
