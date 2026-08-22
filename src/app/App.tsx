import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Globe, Mail, Camera, Home, Search, Heart } from "lucide-react";

const PRODUCTS = [
	{
		id: 1,
		name: "Sculpted Cashmere Knit",
		price: "$280.00",
		tag: "New",
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB90CpRJomjTgqRXAZBPwtnyY6rPlHnrrVq5_kptjbZDfVNX4-QEFm6xLyXjJLbPuTQ-55wqhka2dFBlUjiCzS6-4jkW6UupAeHifyO2juY0-1e23vHoPGHMm-zvYJttjvmubtYqq9TuSSJ5cfKjMeB-ZYOP0AlfkgYBnwAGVF_8cdCWnUpv9kwlAvyR-SHZelJ1cUHY1QNiqF8xO0wGX_DEJ6wfvAa8W71_4m_EUQIJ8luPI_vW5n1yg"
	},
	{
		id: 2,
		name: "Chelsea Archive Boot",
		price: "$450.00",
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByTv8LSyg8bkzSkVqkHCeBHPZUdFpnvKnWk3OQWTaK6_yHvdouz79oX7UpMfnYtFYyQ80YGVsfnOtD3H8IrSaDKieM1qAiy8NDEfXAL5nkX5wXc13aZQhkOZzqBQKexk3kpa4xkLMN5Xq_klwkWPumTbAnETodLmd1E2YfUY74dkewB1qsbuHoPdhH0DrU8bqXKSzmATgi_gGH3-5hRBSb7fhrA9QEsh-prdMNbSJyVo9aZNnCqSudmw"
	},
	{
		id: 3,
		name: "Structured Evening Blazer",
		price: "$620.00",
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAghMgYnWGsCjbmJidcTPYNJOlFM9mu8OLyYsLi67PshHYxEAj4jb6GA7tZ3pNbO0y_5Sizs957wRKDeAnICJTCvJFjsxbc1kWdwPBKDJHvdjdK3t5ZBSbW43l4rhvV_XRyHghO_N4dYYzoMfHoKn5REdtYcZEs8Vdr1509WUXXwTNZ2Yq6-Oj8r1pxDdtYsSppIRMf3HbVdCicENhW7LSTUVynws7p69DJeGdlAuluFIylbAbvTEqo-Q"
	},
	{
		id: 4,
		name: "The Essential Tote",
		price: "$890.00",
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk7KRfxBzi8MT5as3JDsDMYEd_bUPTSFniA33maBkR_uFH710RcXXbJl8io-lKlNGJrnrZdzcAm9K0Dy5TfpYotMfIDZWHhHj6ud9norEVeYphKxoeWIhO85VDs_pqXJ7C3vEiOgrR0ySzDDgSe5n_7DpqxwLFz0KOI5qr7XR3H4FG-ESlZFrQsGAN0Y-QU8cjWOJcGiRflwKl3xpaTOdiQ1vUdi584jy4q5IrJYkey4LgNaBLckiX1A"
	}
];

const App = () => {
	return (
		<div className="min-h-screen bg-[#fdf8f8] font-sans text-[#1c1b1b] antialiased selection:bg-[#000000] selection:text-[#ffffff]">
			<main>
				{/* Hero Section */}
				<section className="relative h-205 w-full overflow-hidden">
					{/* Hero Background Image */}
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{
							backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuALcRlYIDJfZF6U77xf3rL_zK17yzpULfFZFkIeEXAWugeAPNML7w74_dJvYkV3kKOrYOFPll311aUs8y-1jZozhgY9AC4kKb4ZijIwmeFczB_eIiznYBAURJNxkYXxsCOKqVAS6a2p9Ujp-hWbbnMB-17AR76PVCJVZhVz-8FK4IexpPOjF9qgjiYYlYvoxI3oZ0g1ce_PBU7FqBaX0pE2DTfuigCaWVi-55zqMAll9n6UEDDPpXC61w')`
						}}
					/>

					{/* Gradient Vignette Overlay */}
					<div
						className="absolute inset-0"
						style={{
							background:
								"linear-gradient(180deg, rgba(253, 248, 248, 0) 0%, rgba(253, 248, 248, 0.8) 100%)"
						}}
					/>

					{/* Content Overlay */}
					<div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-[80px] md:px-[64px]">
						<div className="max-w-2xl">
							<h1 className="mb-3 text-[32px] leading-[1.1] font-medium tracking-tighter text-[#000000] md:text-[64px]">
								Curated Modernity.
							</h1>
							<p className="mb-[48px] max-w-lg text-[18px] leading-[1.6] text-[#444748]">
								Discover a collection where architectural silhouettes meet
								Italian-milled fabrics. Designed for the intentional wardrobe.
							</p>
							<div className="flex gap-4">
								<button className="rounded-full bg-[#000000] px-10 py-4 text-[12px] font-semibold tracking-[0.1em] text-[#ffffff] uppercase shadow-lg transition-transform duration-300 hover:scale-[1.02] active:scale-95">
									Shop the Collection
								</button>
							</div>
						</div>
					</div>
				</section>

				{/* Featured Collections Grid */}
				<section className="mx-auto max-w-[1440px] px-5 py-[80px] md:px-[64px]">
					<div className="mb-[48px] flex items-end justify-between">
						<div>
							<span className="text-[12px] font-semibold tracking-[0.1em] text-[#444748] uppercase">
								The Season
							</span>
							<h2 className="mt-2 text-[40px] font-medium tracking-tight text-[#000000]">
								New Arrivals
							</h2>
						</div>
						<Link
							to="/collections"
							className="hidden border-b border-[#000000]/20 pb-1 text-[12px] font-semibold tracking-[0.1em] text-[#000000] uppercase transition-all hover:border-[#000000] md:block"
						>
							View All Items
						</Link>
					</div>

					{/* Bento Product Grid */}
					<div className="grid grid-cols-1 gap-[24px] md:grid-cols-12">
						{/* Large Feature Card */}
						<div className="group relative overflow-hidden rounded-[16px] bg-[#f7f3f2] transition-all duration-500 md:col-span-8">
							<div className="aspect-[16/9] w-full overflow-hidden">
								<img
									src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwlO_N6aK1tQmt4DOQe7iIPs3fhq9AMgeK3vXG6GMbww4O8MpCuxL4JqEd8H_RdTi6I6hWnwsXYo-e3BaGd2rj-bSk8Hsgd_KUVLOHrw2TJjANwqc3o5XfKUVb5qZ6JJlS_ORhxpxLMwPli9qbu6xbFBpWizFuTc0v8IlEE0cIJZ2_nWxGj8HOqBB9fTJc49WeRXLIrf5iWnn6lYPNs4XXuXUgTCUCc-F_O_dCWeiGepG03fzkUZDDVA"
									alt="Seasonal Outerwear"
									className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
								/>
							</div>
							<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/40 to-transparent p-[48px]">
								<div className="max-w-xs rounded-[16px] border border-black/5 bg-white/70 p-6 backdrop-blur-[20px] transition-all duration-300 group-hover:-translate-y-2">
									<h3 className="mb-1 text-[24px] font-medium text-[#000000]">
										Seasonal Outerwear
									</h3>
									<p className="mb-4 text-[16px] text-[#444748]">
										Limited edition technical wool.
									</p>
									<button className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.1em] text-[#000000] uppercase transition-all hover:gap-4">
										Discover <ArrowRight className="h-4 w-4" />
									</button>
								</div>
							</div>
						</div>

						{/* Product Card 1 */}
						{PRODUCTS.map((prod) => (
							<div key={prod.id} className="group flex flex-col gap-4 md:col-span-4">
								<div className="relative aspect-[3/4] overflow-hidden rounded-[16px] bg-[#f7f3f2]">
									<img
										src={prod.image}
										alt={prod.name}
										className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div className="absolute right-4 bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
										<button
											onClick={() => handleQuickAdd(prod.name)}
											className="w-full rounded-full border border-black/5 bg-white/70 py-3 text-[12px] font-semibold tracking-[0.1em] text-[#000000] uppercase backdrop-blur-[20px] active:scale-95"
										>
											Quick Add — {prod.price}
										</button>
									</div>
									{prod.tag && (
										<span className="absolute top-4 left-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-[#000000] uppercase backdrop-blur">
											{prod.tag}
										</span>
									)}
								</div>
								<div>
									<p className="text-[16px] font-medium text-[#000000]">
										{prod.name}
									</p>
									<p className="text-[12px] font-semibold tracking-[0.1em] text-[#444748] uppercase">
										{prod.price}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Editorial Section */}
				<section className="bg-[#f1edec] py-[80px]">
					<div className="mx-auto grid max-w-[1440px] items-center gap-[48px] px-5 md:grid-cols-2 md:px-[64px]">
						<div className="order-2 md:order-1">
							<span className="text-[12px] font-semibold tracking-[0.1em] text-[#444748] uppercase">
								Journal
							</span>
							<h2 className="mt-4 mb-6 text-[40px] leading-tight font-medium tracking-tight text-[#000000]">
								The Art of Conscious Curation
							</h2>
							<p className="mb-8 max-w-md text-[18px] leading-[1.6] text-[#444748]">
								We believe in buying better and keeping longer. Our editorial series
								explores the philosophy behind our sustainable sourcing and timeless
								design language.
							</p>
							<Link
								to="/editorial"
								className="group inline-flex items-center gap-4 text-[12px] font-semibold tracking-[0.1em] text-[#000000] uppercase"
							>
								Read the Editorial
								<span className="h-[1px] w-12 bg-[#000000] transition-all duration-300 group-hover:w-16" />
							</Link>
						</div>
						<div className="order-1 aspect-square overflow-hidden rounded-[16px] md:order-2 md:aspect-auto md:h-[600px]">
							<img
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgI8H8fnNtKuKvJ-axoTtkNEDNIjXhUGNe-iHZydFH0IfK3kmwS58R-s1kg0qOL-98mMadfQ_LH5YFwWq0iMxuKdWs3oYZYq_6ThM06ZqIT9W_zfJnfhs8b26flN9mntGbKb7_7-ViaX11CNohBGgHZEBl3OIAe2f2FEpV5RHuoofTGpM0dVIG1wJNYGqa-rx_3WjfUQhL_Nb8pcaO2j98MbWqDvXvsfsmC5k50Dsd2ddJc5kTdFEZEA"
								alt="Art of Conscious Curation"
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
				</section>

				{/* Newsletter */}
				<section className="mx-auto max-w-[1440px] px-5 py-[80px] text-center md:px-[64px]">
					<div className="mx-auto max-w-xl">
						<h3 className="mb-4 text-[40px] font-medium tracking-tight text-[#000000]">
							Join the Collective
						</h3>
						<p className="mb-8 text-[#444748]">
							Access private collections, exclusive previews, and seasonal insights.
						</p>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleQuickAdd("Newsletter Subscription");
							}}
							className="flex flex-col gap-4 md:flex-row"
						>
							<input
								type="email"
								required
								placeholder="Email Address"
								className="flex-1 rounded-full border-none bg-[#f1edec] px-8 py-4 text-[16px] text-[#1c1b1b] outline-none focus:ring-1 focus:ring-[#000000]"
							/>
							<button
								type="submit"
								className="rounded-full bg-[#000000] px-10 py-4 text-[12px] font-semibold tracking-[0.1em] text-[#ffffff] uppercase transition-transform hover:scale-105"
							>
								Subscribe
							</button>
						</form>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="w-full border-t border-[#c4c7c7]/10 bg-[#fdf8f8] py-[80px]">
				<div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 px-5 md:flex-row md:items-center md:px-[64px]">
					<div>
						<h2 className="text-[40px] font-medium text-[#000000]">Kaivor</h2>
						<p className="mt-4 max-w-xs text-[#444748]">
							Premium modern essentials for the refined wardrobe.
						</p>
					</div>
					<div className="flex flex-wrap gap-x-12 gap-y-6">
						<div className="flex flex-col gap-3">
							<span className="text-[12px] font-semibold tracking-[0.1em] text-[#000000] uppercase">
								Company
							</span>
							<Link
								to="/editorial"
								className="text-[16px] text-[#444748] transition-colors hover:text-[#000000]"
							>
								Editorial
							</Link>
							<Link
								to="/sustainable"
								className="text-[16px] text-[#444748] transition-colors hover:text-[#000000]"
							>
								Sustainable
							</Link>
							<Link
								to="/contact"
								className="text-[16px] text-[#444748] transition-colors hover:text-[#000000]"
							>
								Contact Us
							</Link>
						</div>
						<div className="flex flex-col gap-3">
							<span className="text-[12px] font-semibold tracking-[0.1em] text-[#000000] uppercase">
								Legal
							</span>
							<Link
								to="/privacy"
								className="text-[16px] text-[#444748] transition-colors hover:text-[#000000]"
							>
								Privacy Policy
							</Link>
							<Link
								to="/terms"
								className="text-[16px] text-[#444748] transition-colors hover:text-[#000000]"
							>
								Terms of Service
							</Link>
							<Link
								to="/shipping"
								className="text-[16px] text-[#444748] transition-colors hover:text-[#000000]"
							>
								Shipping & Returns
							</Link>
						</div>
					</div>
				</div>

				<div className="mx-auto mt-[48px] flex max-w-[1440px] flex-col items-center justify-between gap-4 border-t border-[#c4c7c7]/10 px-5 pt-[12px] md:flex-row md:px-[64px]">
					<span className="text-[12px] font-semibold tracking-[0.1em] text-[#444748] uppercase">
						© 2026 Kaivor. All rights reserved.
					</span>
					<div className="flex gap-6 text-[#444748]">
						<Link to="#" className="transition-opacity hover:opacity-70">
							<Globe className="h-5 w-5" />
						</Link>
						<Link to="#" className="transition-opacity hover:opacity-70">
							<Mail className="h-5 w-5" />
						</Link>
						<Link to="#" className="transition-opacity hover:opacity-70">
							<Camera className="h-5 w-5" />
						</Link>
					</div>
				</div>
			</footer>

			{/* Mobile Bottom Navigation Anchor Bar */}
			<div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-[#c4c7c7]/10 bg-[#fdf8f8]/80 px-6 py-4 backdrop-blur-xl md:hidden">
				<Link to="/" className="flex flex-col items-center text-[#000000]">
					<Home className="h-5 w-5" />
					<span className="mt-1 text-[10px] font-semibold tracking-[0.1em] uppercase">
						Shop
					</span>
				</Link>
				<Link to="/search" className="flex flex-col items-center text-[#444748]">
					<Search className="h-5 w-5" />
					<span className="mt-1 text-[10px] font-semibold tracking-[0.1em] uppercase">
						Search
					</span>
				</Link>
				<Link to="/saved" className="flex flex-col items-center text-[#444748]">
					<Heart className="h-5 w-5" />
					<span className="mt-1 text-[10px] font-semibold tracking-[0.1em] uppercase">
						Saved
					</span>
				</Link>
				<Link to="/cart" className="flex flex-col items-center text-[#444748]">
					<ShoppingBag className="h-5 w-5" />
					<span className="mt-1 text-[10px] font-semibold tracking-[0.1em] uppercase">
						Cart
					</span>
				</Link>
			</div>
		</div>
	);
};

export default App;
