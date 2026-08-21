import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../context/hooks";
import { NavLink } from "react-router-dom";
import {
	ShoppingBag,
	Menu,
	X,
	LogOut,
	User,
	Heart,
	Package,
	Shirt,
	Sparkles,
	Handbag
} from "lucide-react";
import { clearUser } from "../features/auth/slice";
import { AnimatePresence, motion } from "motion/react";
import { TextRoll } from "./ui/TextRoll";
import useAuth from "../features/auth/hook/useAuth";
import appToast from "./toast";

const Navbar = () => {
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const menuRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const { handleLogout } = useAuth();
	useEffect(() => {
		let lastScrollY = window.scrollY;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			// Check if scrolled near the bottom (within 50px of bottom)
			const isAtBottom = currentScrollY + windowHeight >= documentHeight - 50;

			if (currentScrollY <= 10) {
				// Show navbar when at/near top
				setIsVisible(true);
			} else if (isAtBottom) {
				// Hide navbar when at bottom
				setIsVisible(false);
			} else if (currentScrollY > lastScrollY && currentScrollY > 100) {
				// Hide navbar on scroll down
				setIsVisible(false);
			} else if (currentScrollY < lastScrollY) {
				// Show navbar on scroll up
				setIsVisible(true);
			}

			lastScrollY = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleUserLogout = async() => {
		try {
			await handleLogout();
			appToast.success("Logged Out");
		} catch (error) {
			console.error("API Failed", error);
		} finally {
			dispatch(clearUser());
			setIsOpen(false);
		}
	};

	const avatarInitial = user?.fullName?.[0]?.toUpperCase() || "U";

	const navLinkClass = ({ isActive }: { isActive: boolean }) =>
		`text-base lg:text-lg 2xl:text-xl font-medium transition-colors ${
			isActive
				? "text-white font-semibold"
				: "text-neutral-300 hover:text-white dark:text-neutral-200 dark:hover:text-white"
		}`;

	const sidebarNavLinkClass = ({ isActive }: { isActive: boolean }) =>
		`flex items-center gap-3 text-base sm:text-lg 2xl:text-xl font-medium transition-all py-2.5 px-3.5 rounded-xl ${
			isActive
				? "bg-white/10 text-white font-semibold"
				: "text-neutral-300 hover:bg-neutral-800 hover:text-white dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
		}`;

	return (
		<>
			<motion.header
				initial={{ y: 0 }}
				animate={{ y: isVisible ? 0 : "-100%" }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="sticky top-0 z-30 w-full border-b border-neutral-800 bg-black/90 backdrop-blur-md transition-colors"
			>
				<div className="mx-auto flex h-16 max-w-[2560px] items-center justify-between px-4 sm:h-20 sm:px-6 md:px-10 lg:px-12 2xl:h-24 2xl:px-20">
					{/* Desktop Navigation */}
					<nav className="hidden items-center gap-6 md:flex lg:gap-8">
						<NavLink to="/new-arrivals" className={navLinkClass}>
							<TextRoll>New Arrivals</TextRoll>
						</NavLink>
						<NavLink
							to="/sale"
							className={({ isActive }) =>
								`text-base font-medium transition-colors lg:text-lg 2xl:text-xl ${
									isActive
										? "font-semibold text-red-400"
										: "text-red-500 hover:text-red-400"
								}`
							}
						>
							<TextRoll>Sale</TextRoll>
						</NavLink>
					</nav>

					{/* Brand Logo */}
					<NavLink to="/" className="group flex items-center">
						<h1 className="text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-neutral-300 sm:text-3xl lg:text-4xl 2xl:text-5xl">
							<TextRoll stagger>Kaivor</TextRoll>
						</h1>
					</NavLink>

					{/* Right Action Icons & Controls */}
					<div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
						<NavLink
							to="/cart"
							className="relative p-2 text-neutral-300 transition-colors hover:text-white"
							aria-label="Shopping Cart"
						>
							<ShoppingBag className="h-5 w-5 text-white sm:h-6 sm:w-6 2xl:h-7 2xl:w-7" />
						</NavLink>

						{!isAuthenticated ? (
							<div className="hidden items-center gap-3 sm:flex">
								<NavLink
									to="/auth?tab=login"
									onClick={() => setIsOpen(false)}
									className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:text-base 2xl:px-6 2xl:py-2.5 2xl:text-lg"
								>
									<TextRoll>Sign In</TextRoll>
								</NavLink>
								<NavLink
									to="/auth?tab=sign-up"
									onClick={() => setIsOpen(false)}
									className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 sm:text-base 2xl:px-6 2xl:py-2.5 2xl:text-lg"
								>
									<TextRoll>Sign Up</TextRoll>
								</NavLink>
							</div>
						) : null}

						{/* Menu Drawer Button */}
						<button
							className="rounded-lg p-2 text-white transition-all hover:bg-neutral-800"
							onClick={() => setIsOpen(!isOpen)}
							aria-label="Toggle menu"
						>
							{isOpen ? (
								<X className="h-6 w-6 sm:h-7 sm:w-7 2xl:h-8 2xl:w-8" />
							) : (
								<Menu className="h-6 w-6 sm:h-7 sm:w-7 2xl:h-8 2xl:w-8" />
							)}
						</button>
					</div>
				</div>
			</motion.header>

			{/* Sidebar & Backdrop */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Overlay backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
							className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
						/>

						{/* Right Sidebar */}
						<motion.div
							ref={menuRef}
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "spring", damping: 25, stiffness: 220 }}
							className="fixed top-0 right-0 z-50 flex h-dvh w-full flex-col justify-between border-l border-neutral-800 bg-neutral-950 p-5 text-white shadow-2xl sm:w-100 sm:p-6 2xl:w-115 2xl:p-8"
						>
							<div className="flex h-full flex-col overflow-y-auto">
								{/* Sidebar Header */}
								<div className="flex items-center justify-between border-b border-neutral-800 pb-4">
									<h2 className="text-xl font-bold text-white sm:text-2xl 2xl:text-3xl">
										Menu
									</h2>
									<button
										onClick={() => setIsOpen(false)}
										className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
										aria-label="Close menu"
									>
										<X className="h-6 w-6 2xl:h-7 2xl:w-7" />
									</button>
								</div>

								{/* Navigation Links */}
								<nav className="mt-6 flex grow flex-col gap-2">
									{isAuthenticated && (
										<>
											<NavLink
												to="/profile"
												onClick={() => setIsOpen(false)}
												className={sidebarNavLinkClass}
											>
												<User className="h-5 w-5 text-white" />
												<TextRoll>Profile</TextRoll>
											</NavLink>
											<NavLink
												to="/orders"
												onClick={() => setIsOpen(false)}
												className={sidebarNavLinkClass}
											>
												<Package className="h-5 w-5 text-white" />
												<TextRoll>My Orders</TextRoll>
											</NavLink>
										</>
									)}

									<NavLink
										to="/new-arrivals"
										onClick={() => setIsOpen(false)}
										className={sidebarNavLinkClass}
									>
										<Sparkles className="h-5 w-5 text-white" />
										<TextRoll>New Arrivals</TextRoll>
									</NavLink>

									<NavLink
										to="/t-shirts"
										onClick={() => setIsOpen(false)}
										className={sidebarNavLinkClass}
									>
										<Shirt className="h-5 w-5 text-white" />
										<TextRoll>T-shirts Collection</TextRoll>
									</NavLink>

									<NavLink
										to="/patches"
										onClick={() => setIsOpen(false)}
										className={sidebarNavLinkClass}
									>
										<Sparkles className="h-5 w-5 text-white" />
										<TextRoll>Embroidered Patches</TextRoll>
									</NavLink>

									<NavLink
										to="/anime-t-shirts"
										onClick={() => setIsOpen(false)}
										className={sidebarNavLinkClass}
									>
										<Shirt className="h-5 w-5 text-white" />
										<TextRoll>Anime Collection</TextRoll>
									</NavLink>

									<NavLink
										to="/tote-bags"
										onClick={() => setIsOpen(false)}
										className={sidebarNavLinkClass}
									>
										<Handbag className="h-5 w-5 text-white" />
										<TextRoll>Tote Bags</TextRoll>
									</NavLink>

									<NavLink
										to="/wishlist"
										onClick={() => setIsOpen(false)}
										className={sidebarNavLinkClass}
									>
										<Heart className="h-5 w-5 text-white" />
										<TextRoll>Wishlist</TextRoll>
									</NavLink>
								</nav>

								{/* Sidebar Footer / User Account */}
								<div className="mt-6 border-t border-neutral-800 pt-6">
									{isAuthenticated ? (
										<div className="flex flex-col gap-4">
											<div className="flex items-center gap-3">
												<div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold text-black">
													{avatarInitial}
												</div>
												<div className="flex flex-col truncate">
													<span className="truncate font-semibold text-white">
														{user?.fullName || "User"}
													</span>
													<span className="truncate text-xs text-neutral-400">
														{user?.email || ""}
													</span>
												</div>
											</div>
											<button
												onClick={handleUserLogout}
												className="flex items-center justify-center gap-2 rounded-xl border border-red-500/80 py-2.5 font-medium text-red-400 transition-colors hover:bg-red-500 hover:text-white"
											>
												<LogOut className="h-4 w-4" />
												<TextRoll>Logout</TextRoll>
											</button>
										</div>
									) : (
										<div className="flex flex-col gap-3 sm:hidden">
											<NavLink
												to="/auth?tab=login"
												onClick={() => setIsOpen(false)}
												className="flex items-center justify-center rounded-xl border border-white/30 py-2.5 font-medium text-white transition-colors hover:bg-white/10"
											>
												<User className="mr-2 h-4 w-4" />
												Sign In
											</NavLink>
											<NavLink
												to="/auth?tab=sign-up"
												onClick={() => setIsOpen(false)}
												className="flex items-center justify-center rounded-xl bg-white py-2.5 font-semibold text-black transition-colors hover:bg-neutral-200"
											>
												Sign Up
											</NavLink>
										</div>
									)}
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

export default Navbar;
