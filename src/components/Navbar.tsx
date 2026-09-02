import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../context/hooks";
import { NavLink, useLocation } from "react-router-dom";
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

const computeNavbarVisibility = (currentY: number, prevY: number) => {
	const isAtTop = currentY <= 10;
	const isNearBottom = currentY + window.innerHeight >= document.documentElement.scrollHeight - 50;

	if (isAtTop || currentY < prevY) return true;
	if (isNearBottom || (currentY > prevY && currentY > 100)) return false;
	return true;
};

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
	`text-base lg:text-lg 2xl:text-xl font-medium transition-colors ${
		isActive
			? "text-neutral-900 font-semibold dark:text-white"
			: "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
	}`;

const sidebarNavLinkClass = ({ isActive }: { isActive: boolean }) =>
	`flex items-center gap-3 text-base sm:text-lg 2xl:text-xl font-medium transition-all py-2.5 px-3.5 rounded-xl ${
		isActive
			? "bg-neutral-100 text-neutral-900 font-semibold dark:bg-white/10 dark:text-white"
			: "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
	}`;

interface NavDrawerProps {
	isOpen: boolean;
	setIsOpen: (_open: boolean) => void;
	isAuthenticated: boolean;
	user: { fullName?: string; email?: string } | null;
	handleUserLogout: () => void;
	menuRef: React.RefObject<HTMLDivElement | null>;
}

const DrawerNavLinks = ({
	isAuthenticated,
	closeMenu
}: {
	isAuthenticated: boolean;
	closeMenu: () => void;
}) => (
	<nav className="mt-6 flex grow flex-col gap-2">
		{isAuthenticated && (
			<>
				<NavLink to="/profile" onClick={closeMenu} className={sidebarNavLinkClass}>
					<User className="h-5 w-5 text-current" />
					<TextRoll>Profile</TextRoll>
				</NavLink>
				<NavLink to="/orders" onClick={closeMenu} className={sidebarNavLinkClass}>
					<Package className="h-5 w-5 text-current" />
					<TextRoll>My Orders</TextRoll>
				</NavLink>
			</>
		)}
		<NavLink to="/new-arrivals" onClick={closeMenu} className={sidebarNavLinkClass}>
			<Sparkles className="h-5 w-5 text-current" />
			<TextRoll>New Arrivals</TextRoll>
		</NavLink>
		<NavLink to="/t-shirts" onClick={closeMenu} className={sidebarNavLinkClass}>
			<Shirt className="h-5 w-5 text-current" />
			<TextRoll>T-shirts Collection</TextRoll>
		</NavLink>
		<NavLink to="/patches" onClick={closeMenu} className={sidebarNavLinkClass}>
			<Sparkles className="h-5 w-5 text-current" />
			<TextRoll>Embroidered Patches</TextRoll>
		</NavLink>
		<NavLink to="/anime-t-shirts" onClick={closeMenu} className={sidebarNavLinkClass}>
			<Shirt className="h-5 w-5 text-current" />
			<TextRoll>Anime Collection</TextRoll>
		</NavLink>
		<NavLink to="/tote-bags" onClick={closeMenu} className={sidebarNavLinkClass}>
			<Handbag className="h-5 w-5 text-current" />
			<TextRoll>Tote Bags</TextRoll>
		</NavLink>
		<NavLink to="/wishlist" onClick={closeMenu} className={sidebarNavLinkClass}>
			<Heart className="h-5 w-5 text-current" />
			<TextRoll>Wishlist</TextRoll>
		</NavLink>
	</nav>
);

const DrawerUserSection = ({
	isAuthenticated,
	user,
	handleUserLogout,
	closeMenu
}: {
	isAuthenticated: boolean;
	user: { fullName?: string; email?: string } | null;
	handleUserLogout: () => void;
	closeMenu: () => void;
}) => {
	const avatarInitial = user?.fullName?.[0]?.toUpperCase() || "U";

	if (isAuthenticated) {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-3">
					<div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-lg font-bold text-white dark:bg-white dark:text-black">
						{avatarInitial}
					</div>
					<div className="flex flex-col truncate">
						<span className="truncate font-semibold text-neutral-900 dark:text-white">
							{user?.fullName || "User"}
						</span>
						<span className="truncate text-xs text-neutral-500 dark:text-neutral-400">
							{user?.email || ""}
						</span>
					</div>
				</div>
				<button
					onClick={handleUserLogout}
					className="flex items-center justify-center gap-2 rounded-xl border border-red-500/60 py-2.5 font-medium text-red-600 transition-colors hover:bg-red-500 hover:text-white dark:border-red-500/80 dark:text-red-400 cursor-pointer"
				>
					<LogOut className="h-4 w-4" />
					<TextRoll>Logout</TextRoll>
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3 sm:hidden">
			<NavLink
				to="/auth?tab=login"
				onClick={closeMenu}
				className="flex items-center justify-center rounded-xl border border-neutral-300 py-2.5 font-medium text-neutral-900 transition-colors hover:bg-neutral-100 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
			>
				<User className="mr-2 h-4 w-4" />
				Sign In
			</NavLink>
			<NavLink
				to="/auth?tab=sign-up"
				onClick={closeMenu}
				className="flex items-center justify-center rounded-xl bg-neutral-900 py-2.5 font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
			>
				Sign Up
			</NavLink>
		</div>
	);
};

const NavDrawer = ({
	isOpen,
	setIsOpen,
	isAuthenticated,
	user,
	handleUserLogout,
	menuRef
}: NavDrawerProps) => {
	const closeMenu = () => setIsOpen(false);

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={closeMenu}
				className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs dark:bg-black/60"
			/>
			<motion.div
				ref={menuRef}
				initial={{ x: "100%" }}
				animate={{ x: 0 }}
				exit={{ x: "100%" }}
				transition={{ type: "spring", damping: 25, stiffness: 220 }}
				className="fixed top-0 right-0 z-50 flex h-dvh w-full flex-col justify-between border-l border-neutral-200 bg-white p-5 text-neutral-900 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 dark:text-white sm:w-100 sm:p-6 2xl:w-115 2xl:p-8"
			>
				<div className="flex h-full flex-col overflow-y-auto">
					<div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
						<h2 className="text-xl font-bold text-neutral-900 sm:text-2xl dark:text-white 2xl:text-3xl">
							Menu
						</h2>
						<button
							onClick={closeMenu}
							className="rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white cursor-pointer"
							aria-label="Close menu"
						>
							<X className="h-6 w-6 2xl:h-7 2xl:w-7" />
						</button>
					</div>

					<DrawerNavLinks isAuthenticated={isAuthenticated} closeMenu={closeMenu} />

					<div className="mt-6 border-t border-neutral-200 pt-6 dark:border-neutral-800">
						<DrawerUserSection
							isAuthenticated={isAuthenticated}
							user={user}
							handleUserLogout={handleUserLogout}
							closeMenu={closeMenu}
						/>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

const Navbar = () => {
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const menuRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const { handleLogout } = useAuth();

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const handleScroll = () => {
			const currentY = window.scrollY;
			setIsVisible(computeNavbarVisibility(currentY, lastScrollY));
			lastScrollY = currentY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const handleUserLogout = async () => {
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

	if (pathname.startsWith("/admin") || pathname.startsWith("/supplier")) {
		return null;
	}

	return (
		<>
			<motion.header
				initial={{ y: 0 }}
				animate={{ y: isVisible ? 0 : "-100%" }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="sticky top-0 z-30 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md transition-colors dark:border-neutral-800 dark:bg-black/90"
			>
				<div className="mx-auto flex h-16 max-w-[2560px] items-center justify-between px-4 sm:h-20 sm:px-6 md:px-10 lg:px-12 2xl:h-24 2xl:px-20">
					<nav className="hidden items-center gap-6 md:flex lg:gap-8">
						<NavLink to="/new-arrivals" className={navLinkClass}>
							<TextRoll>New Arrivals</TextRoll>
						</NavLink>
						<NavLink
							to="/sale"
							className={({ isActive }) =>
								`text-base font-medium transition-colors lg:text-lg 2xl:text-xl ${
									isActive
										? "font-semibold text-red-600 dark:text-red-400"
										: "text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
								}`
							}
						>
							<TextRoll>Sale</TextRoll>
						</NavLink>
					</nav>

					<NavLink to="/" className="group flex items-center">
						<h1 className="text-2xl font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300 sm:text-3xl lg:text-4xl 2xl:text-5xl">
							<TextRoll stagger>Kaivor</TextRoll>
						</h1>
					</NavLink>

					<div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
						<NavLink
							to="/cart"
							className="relative p-2 text-neutral-700 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
							aria-label="Shopping Cart"
						>
							<ShoppingBag className="h-5 w-5 text-neutral-900 dark:text-white sm:h-6 sm:w-6 2xl:h-7 2xl:w-7" />
						</NavLink>

						{!isAuthenticated && (
							<div className="hidden items-center gap-3 sm:flex">
								<NavLink
									to="/auth?tab=login"
									onClick={() => setIsOpen(false)}
									className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100 dark:border-white/30 dark:text-white dark:hover:bg-white/10 sm:text-base 2xl:px-6 2xl:py-2.5 2xl:text-lg"
								>
									<TextRoll>Sign In</TextRoll>
								</NavLink>
								<NavLink
									to="/auth?tab=register"
									onClick={() => setIsOpen(false)}
									className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 sm:text-base 2xl:px-6 2xl:py-2.5 2xl:text-lg"
								>
									<TextRoll>Sign Up</TextRoll>
								</NavLink>
							</div>
						)}

						<button
							className="rounded-lg p-2 text-neutral-900 transition-all hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800 cursor-pointer"
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

			<NavDrawer
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				isAuthenticated={isAuthenticated}
				user={user}
				handleUserLogout={handleUserLogout}
				menuRef={menuRef}
			/>
		</>
	);
};

export default Navbar;
