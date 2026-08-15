import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, User as UserIcon, LogOut, Settings, ShieldCheck, ChevronRight } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../context/hooks";
import { clearUser } from "../features/auth/slice";

const Navbar = () => {
	const dispatch = useAppDispatch();
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const handleLogout = () => {
		dispatch(clearUser());
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false);
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const avatarInitial = user?.fullName?.[0]?.toUpperCase() || "U";
	const userHandle = user?.email ? `@${user.email.split("@")[0]}` : "@user";

	return (
		<header className="relative flex items-center justify-between px-6 py-3 bg-[#0f0f0f] text-white border-b border-[#272727]">
			<nav>
				<ul className="flex items-center gap-5 text-sm font-medium">
					<li>
						<Link to="/new-arrivals" className="text-[#aaaaaa] hover:text-white transition-colors">
							New Arrivals
						</Link>
					</li>
					<li>
						<Link to="/collections" className="text-[#aaaaaa] hover:text-white transition-colors">
							Collections
						</Link>
					</li>
				</ul>
			</nav>

			<h1 className="text-xl font-bold tracking-tight">Kaivor</h1>

			<div className="flex items-center gap-4 relative" ref={menuRef}>
				<Link
					to="/cart"
					className="flex items-center justify-center w-9 h-9 rounded-full text-white hover:bg-white/10 transition-colors"
					aria-label="Shopping Cart"
				>
					<ShoppingBag size={20} />
				</Link>

				{!isAuthenticated && user ? (
					<div className="relative">
						<button
							type="button"
							className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#3ea6ff]"
							onClick={() => setIsOpen((prev) => !prev)}
							aria-expanded={isOpen}
							aria-label="User menu"
						>
							<div className="w-8 h-8 rounded-full bg-[#cc0000] text-white flex items-center justify-center font-semibold text-sm select-none">
								{avatarInitial}
							</div>
						</button>

						{isOpen && (
							<div className="absolute right-0 top-full mt-2 w-72 bg-[#282828] border border-[#3f3f3f] rounded-xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
								{/* Identity Header */}
								<div className="flex items-start gap-3 px-4 py-3">
									<div className="w-10 h-10 rounded-full bg-[#cc0000] text-white flex items-center justify-center font-bold text-base select-none shrink-0">
										{avatarInitial}
									</div>
									<div className="flex flex-col min-w-0">
										<h3 className="text-sm font-semibold text-[#f1f1f1] truncate">{user.fullName}</h3>
										<p className="text-xs text-[#aaaaaa] truncate mb-1">{userHandle}</p>
										<Link
											to="/account"
											className="text-xs text-[#3ea6ff] hover:underline"
											onClick={() => setIsOpen(false)}
										>
											View your profile
										</Link>
									</div>
								</div>

								<div className="h-px bg-[#3f3f3f] my-1" />

								{/* Menu Links */}
								<div className="flex flex-col">
									<Link
										to="/profile"
										className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#f1f1f1] hover:bg-white/10 transition-colors"
										onClick={() => setIsOpen(false)}
									>
										<UserIcon size={18} />
										<span className="flex-1">Your Account</span>
										<ChevronRight size={16} className="text-[#aaaaaa]" />
									</Link>

									{user.role === "admin" && (
										<Link
											to="/admin"
											className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#f1f1f1] hover:bg-white/10 transition-colors"
											onClick={() => setIsOpen(false)}
										>
											<ShieldCheck size={18} />
											<span className="flex-1">Admin Dashboard</span>
											<ChevronRight size={16} className="text-[#aaaaaa]" />
										</Link>
									)}

									<Link
										to="/settings"
										className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#f1f1f1] hover:bg-white/10 transition-colors"
										onClick={() => setIsOpen(false)}
									>
										<Settings size={18} />
										<span className="flex-1">Settings</span>
									</Link>
								</div>

								<div className="h-px bg-[#3f3f3f] my-1" />

								{/* Sign out */}
								<div className="flex flex-col">
									<button
										type="button"
										className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#f1f1f1] hover:bg-red-500/20 hover:text-red-400 transition-colors text-left"
										onClick={handleLogout}
									>
										<LogOut size={18} />
										<span>Sign out</span>
									</button>
								</div>
							</div>
						)}
					</div>
				) : (
					<Link
						to="/login"
						className="text-xs font-semibold text-[#3ea6ff] border border-[#3ea6ff]/40 px-3.5 py-1.5 rounded-full hover:bg-[#3ea6ff]/15 hover:border-[#3ea6ff] transition-colors"
					>
						Sign in
					</Link>
				)}
			</div>
		</header>
	);
};

export default Navbar;
