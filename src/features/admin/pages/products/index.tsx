import React, { useEffect, useRef, useState } from 'react';
import {
	Plus,
	Search,
	Trash2,
	Edit3,
	Package,
	ChevronLeft,
	ChevronRight,
	Tag,
	CheckCircle,
	XCircle,
	IndianRupee,
	Percent,
	ToggleLeft,
	Eye
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../context/hooks';
import useProducts from '../../../../hooks/useProducts';
import type IProductAdmin from '../../../../types/products';
import appToast from '../../../../components/toast';

const AllProducts: React.FC = () => {
	const navigate = useNavigate();
	const {
		fetchProducts,
		deleteProduct,
		getProductsBySearch,
		handleBulkDeleteProducts,
		handleBulkStatusUpdate,
		updateBulkStock,
		handleBulkDiscountUpdate
	} = useProducts();
	const { products, totalProducts, currentPage, limit } = useAppSelector(
		(state) => state.products
	);

	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	// Selection & Bulk Action States
	const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
	const [bulkDiscount, setBulkDiscount] = useState<string>('');
	const [isBulkDiscountOpen, setIsBulkDiscountOpen] = useState(false);
	const [isBulkProcessing, setIsBulkProcessing] = useState(false);

	const totalPages = Math.ceil(totalProducts / limit) || 1;

	// Ref to hold latest fetchProducts without triggering effect re-runs
	const fetchProductsRef = useRef(fetchProducts);
	useEffect(() => {
		fetchProductsRef.current = fetchProducts;
	}, [fetchProducts]);

	const loadProducts = async (page: number) => {
		setIsLoading(true);
		try {
			if (searchQuery.trim()) {
				await getProductsBySearch(searchQuery.trim(), page);
			} else {
				await fetchProducts(page);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		let isMounted = true;
		const init = async () => {
			try {
				await fetchProductsRef.current(1);
			} finally {
				if (isMounted) setIsLoading(false);
			}
		};
		init();
		return () => {
			isMounted = false;
		};
	}, []);

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		loadProducts(1);
	};

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			loadProducts(newPage);
		}
	};

	const handleDelete = async (productId: string) => {
		if (!window.confirm('Are you sure you want to delete this product?')) return;
		setDeletingId(productId);
		try {
			await deleteProduct(productId);
			await loadProducts(currentPage);
		} finally {
			setDeletingId(null);
		}
	};

	// Checkbox Selection Logic
	const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			const allIds = products.map((p) => p._id as string).filter(Boolean);
			setSelectedProductIds(allIds);
		} else {
			setSelectedProductIds([]);
		}
	};

	const handleSelectOne = (productId: string) => {
		setSelectedProductIds((prev) =>
			prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
		);
	};

	// Bulk Operations using useProducts hook methods
	const handleBulkDelete = async () => {
		if (selectedProductIds.length === 0) return;
		if (!window.confirm(`Are you sure you want to delete ${selectedProductIds.length} selected products?`)) return;

		setIsBulkProcessing(true);
		try {
			await handleBulkDeleteProducts(selectedProductIds);
			setSelectedProductIds([]);
			await loadProducts(currentPage);
		} finally {
			setIsBulkProcessing(false);
		}
	};

	const handleBulkToggleStatus = async (statusState: boolean) => {
		if (selectedProductIds.length === 0) return;
		setIsBulkProcessing(true);
		try {
			await handleBulkStatusUpdate(selectedProductIds, statusState);
			setSelectedProductIds([]);
			await loadProducts(currentPage);
		} finally {
			setIsBulkProcessing(false);
		}
	};

	const handleBulkToggleStock = async (inStockState: boolean) => {
		if (selectedProductIds.length === 0) return;
		setIsBulkProcessing(true);
		try {
			await updateBulkStock(selectedProductIds, inStockState);
			setSelectedProductIds([]);
			await loadProducts(currentPage);
		} finally {
			setIsBulkProcessing(false);
		}
	};

	const handleBulkApplyDiscount = async () => {
		const discountNum = Number(bulkDiscount);
		if (isNaN(discountNum) || discountNum < 0 || discountNum > 50) {
			appToast.error('Please enter a valid discount percentage (0-50)');
			return;
		}
		if (selectedProductIds.length === 0) return;

		setIsBulkProcessing(true);
		try {
			await handleBulkDiscountUpdate(selectedProductIds, discountNum);
			setSelectedProductIds([]);
			setIsBulkDiscountOpen(false);
			setBulkDiscount('');
			await loadProducts(currentPage);
		} finally {
			setIsBulkProcessing(false);
		}
	};

	const isAllSelected =
		products.length > 0 && products.every((p) => selectedProductIds.includes(p._id as string));

	return (
		<div className="w-full space-y-6 max-w-7xl 2xl:max-w-384 4k:max-w-[2560px] mx-auto">
			{/* Page Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
				<div>
					<h1 className="text-2xl sm:text-3xl 2xl:text-4xl 4k:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
						Products Directory
					</h1>
					<p className="text-xs sm:text-sm 2xl:text-base 4k:text-lg text-zinc-500 dark:text-zinc-400 mt-1">
						Manage, search, and monitor all product catalog listings.
					</p>
				</div>

				<Link
					to="/admin/products/add"
					className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity text-sm shadow-sm"
				>
					<Plus className="w-4 h-4" />
					<span>Add Product</span>
				</Link>
			</div>

			{/* Bulk Actions Toolbar */}
			{selectedProductIds.length > 0 && (
				<div className="p-4 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex flex-wrap items-center justify-between gap-3 shadow-md animate-in fade-in transition-all">
					<div className="text-xs sm:text-sm font-semibold flex items-center gap-2">
						<span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-800">
							{selectedProductIds.length} Selected
						</span>
					</div>

					<div className="flex flex-wrap items-center gap-2">
						{/* Modify Discount Popover / Inline Input */}
						{isBulkDiscountOpen ? (
							<div className="flex items-center gap-1 bg-zinc-800 dark:bg-zinc-200 p-1 rounded-lg">
								<input
									type="number"
									min={0}
									max={100}
									placeholder="%"
									value={bulkDiscount}
									onChange={(e) => setBulkDiscount(e.target.value)}
									className="w-16 px-2 py-1 text-xs rounded border border-zinc-700 dark:border-zinc-300 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 focus:outline-none"
								/>
								<button
									onClick={handleBulkApplyDiscount}
									disabled={isBulkProcessing}
									className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
								>
									Apply
								</button>
								<button
									onClick={() => setIsBulkDiscountOpen(false)}
									className="px-2 py-1 text-xs text-zinc-400 dark:text-zinc-600 hover:text-white"
								>
									Cancel
								</button>
							</div>
						) : (
							<button
								onClick={() => setIsBulkDiscountOpen(true)}
								disabled={isBulkProcessing}
								className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 dark:border-zinc-300 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-medium cursor-pointer"
							>
								<Percent className="w-3.5 h-3.5" />
								<span>Set Discount</span>
							</button>
						)}

						<button
							onClick={() => handleBulkToggleStatus(true)}
							disabled={isBulkProcessing}
							className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 dark:border-zinc-300 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-medium cursor-pointer"
						>
							<CheckCircle className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
							<span>Mark Active</span>
						</button>

						<button
							onClick={() => handleBulkToggleStatus(false)}
							disabled={isBulkProcessing}
							className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 dark:border-zinc-300 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-medium cursor-pointer"
						>
							<XCircle className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
							<span>Mark Inactive</span>
						</button>

						<button
							onClick={() => handleBulkToggleStock(true)}
							disabled={isBulkProcessing}
							className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 dark:border-zinc-300 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-medium cursor-pointer"
						>
							<ToggleLeft className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
							<span>Mark In Stock</span>
						</button>

						<button
							onClick={() => handleBulkToggleStock(false)}
							disabled={isBulkProcessing}
							className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 dark:border-zinc-300 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-medium cursor-pointer"
						>
							<ToggleLeft className="w-3.5 h-3.5 text-rose-400 dark:text-rose-600" />
							<span>Mark Out of Stock</span>
						</button>

						<button
							onClick={handleBulkDelete}
							disabled={isBulkProcessing}
							className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium cursor-pointer"
						>
							<Trash2 className="w-3.5 h-3.5" />
							<span>Delete Selected</span>
						</button>
					</div>
				</div>
			)}

			{/* Search Bar & Controls */}
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
				<form onSubmit={handleSearchSubmit} className="w-full sm:max-w-md relative">
					<Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search by title, tag, fabric..."
						className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm"
					/>
					<button
						type="submit"
						className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium hover:opacity-90 cursor-pointer"
					>
						Search
					</button>
				</form>

				<div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
					Total Products: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{totalProducts}</span>
				</div>
			</div>

			{/* Products Table Card */}
			<div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs overflow-hidden">
				{isLoading ? (
					<div className="p-12 text-center text-zinc-500 dark:text-zinc-400 animate-pulse">
						Loading products...
					</div>
				) : products.length === 0 ? (
					<div className="p-12 text-center space-y-3">
						<Package className="w-10 h-10 mx-auto text-zinc-400" />
						<p className="text-zinc-600 dark:text-zinc-400 font-medium">No products found</p>
						<p className="text-xs text-zinc-500">Try refining your search query or add a new product.</p>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-300">
							<thead className="bg-zinc-50 dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800 uppercase tracking-wider">
								<tr>
									<th className="px-4 py-4 w-10 text-center">
										<input
											type="checkbox"
											checked={isAllSelected}
											onChange={handleSelectAll}
											className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-900 dark:focus:ring-zinc-100 cursor-pointer"
										/>
									</th>
									<th className="px-6 py-4">Product</th>
									<th className="px-6 py-4">Price</th>
									<th className="px-6 py-4">Status & Stock</th>
									<th className="px-6 py-4">Supplier</th>
									<th className="px-6 py-4 text-right">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
								{products.map((item) => {
									const product = item as IProductAdmin;
									const isSelected = selectedProductIds.includes(product._id as string);
									const isActiveStatus = product.status ?? true;

									return (
										<tr
											key={product._id}
											onClick={() => navigate(`/admin/products/${product._id}`)}
											className={`cursor-pointer transition-colors ${isSelected
												? 'bg-zinc-100/80 dark:bg-zinc-900/80'
												: 'hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40'
												}`}
										>
											{/* Checkbox Column */}
											<td
												className="px-4 py-4 text-center"
												onClick={(e) => e.stopPropagation()}
											>
												<input
													type="checkbox"
													checked={isSelected}
													onChange={() => handleSelectOne(product._id as string)}
													className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-900 dark:focus:ring-zinc-100 cursor-pointer"
												/>
											</td>

											{/* Product Title & Image */}
											<td className="px-6 py-4">
												<div className="flex items-center gap-3">
													<img
														src={`${import.meta.env.VITE_CLOUDFRONT_URL}/${product.baseImage}`}
														alt={product.title}
														className="w-12 h-12 rounded-lg object-cover border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shrink-0"
													/>
													<div className="min-w-0">
														<p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate max-w-xs hover:underline">
															{product.title}
														</p>
														<div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
															<Tag className="w-3 h-3" />
															<span>{product.fabric || 'Fabric N/A'}</span>
														</div>
													</div>
												</div>
											</td>

											{/* Price & Discount */}
											<td className="px-6 py-4">
												<div className="space-y-0.5">
													<div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center">
														<IndianRupee className="w-3.5 h-3.5 text-zinc-400" />
														{product.amount}
													</div>
													{product.discount > 0 && (
														<span className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
															{product.discount}% OFF
														</span>
													)}
												</div>
											</td>

											{/* Status & Stock Badges */}
											<td className="px-6 py-4">
												<div className="flex flex-col gap-1 items-start">
													{/* isActive Status */}
													{isActiveStatus ? (
														<span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40">
															<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
															Active
														</span>
													) : (
														<span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-800">
															<span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
															Inactive
														</span>
													)}

													{/* inStock Status */}
													{product.inStock ? (
														<span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
															<CheckCircle className="w-3 h-3" />
															In Stock
														</span>
													) : (
														<span className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400">
															<XCircle className="w-3 h-3" />
															Out of Stock
														</span>
													)}
												</div>
											</td>

											{/* Supplier Details */}
											<td className="px-6 py-4">
												<div className="text-xs">
													<p className="text-zinc-900 dark:text-zinc-100 font-medium">
														{product.supplierEmail || 'N/A'}
													</p>
													{product.supplierCost !== undefined && (
														<p className="text-zinc-500 dark:text-zinc-400">
															Cost: ₹{product.supplierCost}
														</p>
													)}
												</div>
											</td>

											{/* Actions */}
											<td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
												<div className="flex items-center justify-end gap-2">
													<Link
														to={`/admin/products/${product._id}`}
														className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
														title="View / Edit Product"
													>
														<Eye className="w-4 h-4" />
													</Link>
													<Link
														to={`/admin/products/${product._id}`}
														className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
														title="Edit Product"
													>
														<Edit3 className="w-4 h-4" />
													</Link>
													<button
														onClick={() => handleDelete(product._id as string)}
														disabled={deletingId === product._id}
														className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors disabled:opacity-50 cursor-pointer"
														title="Delete Product"
													>
														<Trash2 className="w-4 h-4" />
													</button>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}

				{/* Pagination Footer */}
				{totalPages > 1 && (
					<div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4 bg-zinc-50/50 dark:bg-zinc-900/30">
						<span className="text-xs text-zinc-500 dark:text-zinc-400">
							Page <span className="font-semibold text-zinc-900 dark:text-zinc-100">{currentPage}</span> of{' '}
							<span className="font-semibold text-zinc-900 dark:text-zinc-100">{totalPages}</span>
						</span>

						<div className="flex items-center gap-2">
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage <= 1}
								className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:opacity-40 transition-colors cursor-pointer"
							>
								<ChevronLeft className="w-4 h-4" />
							</button>
							<button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage >= totalPages}
								className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:opacity-40 transition-colors cursor-pointer"
							>
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AllProducts;
