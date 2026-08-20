import { useState } from "react";
import { Link } from "react-router-dom";
import {
	ShoppingBag,
	Moon,
	User,
	ArrowRight,
	Globe,
	Mail,
	Camera,
	Home,
	Search,
	Heart,
	Menu,
	X,
	Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PRODUCTS = [
	{
		id: 1,
		name: "Sculpted Cashmere Knit",
		price: "$280.00",
		tag: "New",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuB90CpRJomjTgqRXAZBPwtnyY6rPlHnrrVq5_kptjbZDfVNX4-QEFm6xLyXjJLbPuTQ-55wqhka2dFBlUjiCzS6-4jkW6UupAeHifyO2juY0-1e23vHoPGHMm-zvYJttjvmubtYqq9TuSSJ5cfKjMeB-ZYOP0AlfkgYBnwAGVF_8cdCWnUpv9kwlAvyR-SHZelJ1cUHY1QNiqF8xO0wGX_DEJ6wfvAa8W71_4m_EUQIJ8luPI_vW5n1yg",
	},
	{
		id: 2,
		name: "Chelsea Archive Boot",
		price: "$450.00",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuByTv8LSyg8bkzSkVqkHCeBHPZUdFpnvKnWk3OQWTaK6_yHvdouz79oX7UpMfnYtFYyQ80YGVsfnOtD3H8IrSaDKieM1qAiy8NDEfXAL5nkX5wXc13aZQhkOZzqBQKexk3kpa4xkLMN5Xq_klwkWPumTbAnETodLmd1E2YfUY74dkewB1qsbuHoPdhH0DrU8bqXKSzmATgi_gGH3-5hRBSb7fhrA9QEsh-prdMNbSJyVo9aZNnCqSudmw",
	},
	{
		id: 3,
		name: "Structured Evening Blazer",
		price: "$620.00",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuAghMgYnWGsCjbmJidcTPYNJOlFM9mu8OLyYsLi67PshHYxEAj4jb6GA7tZ3pNbO0y_5Sizs957wRKDeAnICJTCvJFjsxbc1kWdwPBKDJHvdjdK3t5ZBSbW43l4rhvV_XRyHghO_N4dYYzoMfHoKn5REdtYcZEs8Vdr1509WUXXwTNZ2Yq6-Oj8r1pxDdtYsSppIRMf3HbVdCicENhW7LSTUVynws7p69DJeGdlAuluFIylbAbvTEqo-Q",
	},
	{
		id: 4,
		name: "The Essential Tote",
		price: "$890.00",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuDk7KRfxBzi8MT5as3JDsDMYEd_bUPTSFniA33maBkR_uFH710RcXXbJl8io-lKlNGJrnrZdzcAm9K0Dy5TfpYotMfIDZWHhHj6ud9norEVeYphKxoeWIhO85VDs_pqXJ7C3vEiOgrR0ySzDDgSe5n_7DpqxwLFz0KOI5qr7XR3H4FG-ESlZFrQsGAN0Y-QU8cjWOJcGiRflwKl3xpaTOdiQ1vUdi584jy4q5IrJYkey4LgNaBLckiX1A",
	},
];

function App() {
	const [addedToast, setAddedToast] = useState<string | null>(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleQuickAdd = (productName: string) => {
		setAddedToast(productName);
		setTimeout(() => setAddedToast(null), 3000);
	};

	return (
		<div className="min-h-screen bg-[#fdf8f8] text-[#1c1b1b] font-sans selection:bg-[#000000] selection:text-[#ffffff] antialiased">
			<main>
				{/* Hero Section */}
				<section className="relative h-[921px] w-full overflow-hidden">
					{/* Hero Background Image */}
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{
							backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuALcRlYIDJfZF6U77xf3rL_zK17yzpULfFZFkIeEXAWugeAPNML7w74_dJvYkV3kKOrYOFPll311aUs8y-1jZozhgY9AC4kKb4ZijIwmeFczB_eIiznYBAURJNxkYXxsCOKqVAS6a2p9Ujp-hWbbnMB-17AR76PVCJVZhVz-8FK4IexpPOjF9qgjiYYlYvoxI3oZ0g1ce_PBU7FqBaX0pE2DTfuigCaWVi-55zqMAll9n6UEDDPpXC61w')`,
						}}
					/>

					{/* Gradient Vignette Overlay */}
					<div
						className="absolute inset-0"
						style={{
							background:
								"linear-gradient(180deg, rgba(253, 248, 248, 0) 0%, rgba(253, 248, 248, 0.8) 100%)",
						}}
					/>

					{/* Content Overlay */}
					<div className="relative h-full max-w-[1440px] mx-auto px-5 md:px-[64px] flex flex-col justify-end pb-[80px]">
						<div className="max-w-2xl">
							<h1 className="text-[32px] md:text-[64px] font-medium tracking-tighter leading-[1.1] text-[#000000] mb-3">
								Curated Modernity.
							</h1>
							<p className="text-[18px] text-[#444748] leading-[1.6] mb-[48px] max-w-lg">
								Discover a collection where architectural silhouettes meet
								Italian-milled fabrics. Designed for the intentional wardrobe.
							</p>
							<div className="flex gap-4">
								<button className="bg-[#000000] text-[#ffffff] px-10 py-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.1em] hover:scale-[1.02] transition-transform duration-300 active:scale-95 shadow-lg">
									Shop the Collection
								</button>
							</div>
						</div>
					</div>
				</section>

				{/* Featured Collections Grid */}
				<section className="py-[80px] max-w-[1440px] mx-auto px-5 md:px-[64px]">
					<div className="flex justify-between items-end mb-[48px]">
						<div>
							<span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#444748]">
								The Season
							</span>
							<h2 className="text-[40px] font-medium tracking-tight text-[#000000] mt-2">
								New Arrivals
							</h2>
						</div>
						<Link
							to="/collections"
							className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#000000] border-b border-[#000000]/20 hover:border-[#000000] transition-all pb-1 hidden md:block"
						>
							View All Items
						</Link>
					</div>

					{/* Bento Product Grid */}
					<div className="grid grid-cols-1 md:grid-cols-12 gap-[24px]">
						{/* Large Feature Card */}
						<div className="md:col-span-8 group relative overflow-hidden rounded-[16px] bg-[#f7f3f2] transition-all duration-500">
							<div className="aspect-[16/9] w-full overflow-hidden">
								<img
									src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwlO_N6aK1tQmt4DOQe7iIPs3fhq9AMgeK3vXG6GMbww4O8MpCuxL4JqEd8H_RdTi6I6hWnwsXYo-e3BaGd2rj-bSk8Hsgd_KUVLOHrw2TJjANwqc3o5XfKUVb5qZ6JJlS_ORhxpxLMwPli9qbu6xbFBpWizFuTc0v8IlEE0cIJZ2_nWxGj8HOqBB9fTJc49WeRXLIrf5iWnn6lYPNs4XXuXUgTCUCc-F_O_dCWeiGepG03fzkUZDDVA"
									alt="Seasonal Outerwear"
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
								/>
							</div>
							<div className="absolute inset-0 p-[48px] flex flex-col justify-end bg-gradient-to-t from-black/40 to-transparent">
								<div className="bg-white/70 backdrop-blur-[20px] border border-black/5 p-6 rounded-[16px] max-w-xs transition-all duration-300 group-hover:-translate-y-2">
									<h3 className="text-[24px] font-medium text-[#000000] mb-1">
										Seasonal Outerwear
									</h3>
									<p className="text-[#444748] text-[16px] mb-4">
										Limited edition technical wool.
									</p>
									<button className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#000000] hover:gap-4 transition-all">
										Discover{" "}
										<ArrowRight className="h-4 w-4" />
									</button>
								</div>
							</div>
						</div>

						{/* Product Card 1 */}
						{PRODUCTS.map((prod) => (
							<div
								key={prod.id}
								className="md:col-span-4 group flex flex-col gap-4"
							>
								<div className="relative aspect-[3/4] overflow-hidden rounded-[16px] bg-[#f7f3f2]">
									<img
										src={prod.image}
										alt={prod.name}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
									/>
									<div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
										<button
											onClick={() => handleQuickAdd(prod.name)}
											className="w-full bg-white/70 backdrop-blur-[20px] border border-black/5 py-3 rounded-full text-[12px] font-semibold uppercase tracking-[0.1em] text-[#000000] active:scale-95"
										>
											Quick Add — {prod.price}
										</button>
									</div>
									{prod.tag && (
										<span className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em] text-[#000000]">
											{prod.tag}
										</span>
									)}
								</div>
								<div>
									<p className="text-[16px] text-[#000000] font-medium">
										{prod.name}
									</p>
									<p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#444748]">
										{prod.price}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Editorial Section */}
				<section className="bg-[#f1edec] py-[80px]">
					<div className="max-w-[1440px] mx-auto px-5 md:px-[64px] grid md:grid-cols-2 items-center gap-[48px]">
						<div className="order-2 md:order-1">
							<span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#444748]">
								Journal
							</span>
							<h2 className="text-[40px] font-medium tracking-tight text-[#000000] mt-4 mb-6 leading-tight">
								The Art of Conscious Curation
							</h2>
							<p className="text-[18px] text-[#444748] leading-[1.6] mb-8 max-w-md">
								We believe in buying better and keeping longer. Our editorial
								series explores the philosophy behind our sustainable sourcing and
								timeless design language.
							</p>
							<Link
								to="/editorial"
								className="inline-flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#000000] group"
							>
								Read the Editorial
								<span className="w-12 h-[1px] bg-[#000000] group-hover:w-16 transition-all duration-300" />
							</Link>
						</div>
						<div className="order-1 md:order-2 overflow-hidden rounded-[16px] aspect-square md:aspect-auto md:h-[600px]">
							<img
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgI8H8fnNtKuKvJ-axoTtkNEDNIjXhUGNe-iHZydFH0IfK3kmwS58R-s1kg0qOL-98mMadfQ_LH5YFwWq0iMxuKdWs3oYZYq_6ThM06ZqIT9W_zfJnfhs8b26flN9mntGbKb7_7-ViaX11CNohBGgHZEBl3OIAe2f2FEpV5RHuoofTGpM0dVIG1wJNYGqa-rx_3WjfUQhL_Nb8pcaO2j98MbWqDvXvsfsmC5k50Dsd2ddJc5kTdFEZEA"
								alt="Art of Conscious Curation"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				</section>

				{/* Newsletter */}
				<section className="py-[80px] max-w-[1440px] mx-auto px-5 md:px-[64px] text-center">
					<div className="max-w-xl mx-auto">
						<h3 className="text-[40px] font-medium tracking-tight text-[#000000] mb-4">
							Join the Collective
						</h3>
						<p className="text-[#444748] mb-8">
							Access private collections, exclusive previews, and seasonal
							insights.
						</p>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleQuickAdd("Newsletter Subscription");
							}}
							className="flex flex-col md:flex-row gap-4"
						>
							<input
								type="email"
								required
								placeholder="Email Address"
								className="flex-1 bg-[#f1edec] border-none rounded-full px-8 py-4 focus:ring-1 focus:ring-[#000000] text-[16px] text-[#1c1b1b] outline-none"
							/>
							<button
								type="submit"
								className="bg-[#000000] text-[#ffffff] px-10 py-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.1em] hover:scale-105 transition-transform"
							>
								Subscribe
							</button>
						</form>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="bg-[#fdf8f8] w-full py-[80px] border-t border-[#c4c7c7]/10">
				<div className="max-w-[1440px] mx-auto px-5 md:px-[64px] flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
					<div>
						<h2 className="text-[40px] font-medium text-[#000000]">Kaivor</h2>
						<p className="mt-4 text-[#444748] max-w-xs">
							Premium modern essentials for the refined wardrobe.
						</p>
					</div>
					<div className="flex flex-wrap gap-x-12 gap-y-6">
						<div className="flex flex-col gap-3">
							<span className="text-[12px] font-semibold uppercase text-[#000000] tracking-[0.1em]">
								Company
							</span>
							<Link
								to="/editorial"
								className="text-[#444748] hover:text-[#000000] transition-colors text-[16px]"
							>
								Editorial
							</Link>
							<Link
								to="/sustainable"
								className="text-[#444748] hover:text-[#000000] transition-colors text-[16px]"
							>
								Sustainable
							</Link>
							<Link
								to="/contact"
								className="text-[#444748] hover:text-[#000000] transition-colors text-[16px]"
							>
								Contact Us
							</Link>
						</div>
						<div className="flex flex-col gap-3">
							<span className="text-[12px] font-semibold uppercase text-[#000000] tracking-[0.1em]">
								Legal
							</span>
							<Link
								to="/privacy"
								className="text-[#444748] hover:text-[#000000] transition-colors text-[16px]"
							>
								Privacy Policy
							</Link>
							<Link
								to="/terms"
								className="text-[#444748] hover:text-[#000000] transition-colors text-[16px]"
							>
								Terms of Service
							</Link>
							<Link
								to="/shipping"
								className="text-[#444748] hover:text-[#000000] transition-colors text-[16px]"
							>
								Shipping & Returns
							</Link>
						</div>
					</div>
				</div>

				<div className="max-w-[1440px] mx-auto px-5 md:px-[64px] mt-[48px] pt-[12px] border-t border-[#c4c7c7]/10 flex flex-col md:flex-row justify-between items-center gap-4">
					<span className="text-[#444748] text-[12px] font-semibold uppercase tracking-[0.1em]">
						© 2026 Kaivor. All rights reserved.
					</span>
					<div className="flex gap-6 text-[#444748]">
						<Link to="#" className="hover:opacity-70 transition-opacity">
							<Globe className="h-5 w-5" />
						</Link>
						<Link to="#" className="hover:opacity-70 transition-opacity">
							<Mail className="h-5 w-5" />
						</Link>
						<Link to="#" className="hover:opacity-70 transition-opacity">
							<Camera className="h-5 w-5" />
						</Link>
					</div>
				</div>
			</footer>

			{/* Mobile Bottom Navigation Anchor Bar */}
			<div className="md:hidden fixed bottom-0 left-0 w-full bg-[#fdf8f8]/80 backdrop-blur-xl border-t border-[#c4c7c7]/10 z-50 flex justify-around items-center py-4 px-6">
				<Link to="/" className="flex flex-col items-center text-[#000000]">
					<Home className="h-5 w-5" />
					<span className="text-[10px] font-semibold uppercase tracking-[0.1em] mt-1">
						Shop
					</span>
				</Link>
				<Link to="/search" className="flex flex-col items-center text-[#444748]">
					<Search className="h-5 w-5" />
					<span className="text-[10px] font-semibold uppercase tracking-[0.1em] mt-1">
						Search
					</span>
				</Link>
				<Link to="/saved" className="flex flex-col items-center text-[#444748]">
					<Heart className="h-5 w-5" />
					<span className="text-[10px] font-semibold uppercase tracking-[0.1em] mt-1">
						Saved
					</span>
				</Link>
				<Link to="/cart" className="flex flex-col items-center text-[#444748]">
					<ShoppingBag className="h-5 w-5" />
					<span className="text-[10px] font-semibold uppercase tracking-[0.1em] mt-1">
						Cart
					</span>
				</Link>
			</div>
		</div>
	);
}

export default App;
