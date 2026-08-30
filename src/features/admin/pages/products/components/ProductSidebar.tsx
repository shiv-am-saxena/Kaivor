import React from 'react';
import { DollarSign, CheckCircle, XCircle, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductSidebarProps {
	formData: {
		amount: number;
		discount: number;
		supplierCost: number;
		supplierEmail: string;
		inStock: boolean;
		status: boolean;
	};
	isSubmitting: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({
	formData,
	isSubmitting,
	onChange
}) => {
	return (
		<div className="space-y-6 lg:col-span-1">
			<div className="bg-white dark:bg-zinc-950 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
				<h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 pb-2 border-b border-zinc-150 dark:border-zinc-850">
					<DollarSign className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
					Pricing & Supplier
				</h2>

				{/* Amount */}
				<div className="space-y-2">
					<label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
						Retail Price ($)
					</label>
					<input
						type="number"
						name="amount"
						required
						min={0}
						step="0.01"
						value={formData.amount}
						onChange={onChange}
						className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base"
					/>
				</div>

				{/* Discount */}
				<div className="space-y-2">
					<label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
						Discount Percentage (%)
					</label>
					<input
						type="number"
						name="discount"
						required
						min={0}
						max={100}
						value={formData.discount}
						onChange={onChange}
						className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base"
					/>
				</div>

				{/* Supplier Cost */}
				<div className="space-y-2">
					<label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
						Supplier Cost ($)
					</label>
					<input
						type="number"
						name="supplierCost"
						required
						min={0}
						step="0.01"
						value={formData.supplierCost}
						onChange={onChange}
						className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base"
					/>
				</div>

				{/* Supplier Email */}
				<div className="space-y-2">
					<label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
						Supplier Email
					</label>
					<input
						type="email"
						name="supplierEmail"
						required
						value={formData.supplierEmail}
						onChange={onChange}
						placeholder="supplier@example.com"
						className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base"
					/>
				</div>

				{/* Stock & Active toggles */}
				<div className="space-y-2 py-2">
					<label className="flex items-center gap-3 cursor-pointer select-none">
						<input
							type="checkbox"
							name="status"
							checked={formData.status}
							onChange={onChange}
							className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-900 dark:focus:ring-zinc-100"
						/>
						<span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
							{formData.status ? (
								<CheckCircle className="w-4 h-4 text-emerald-500" />
							) : (
								<XCircle className="w-4 h-4 text-zinc-400" />
							)}
							Mark Product as Active
						</span>
					</label>

					<label className="flex items-center gap-3 cursor-pointer select-none">
						<input
							type="checkbox"
							name="inStock"
							checked={formData.inStock}
							onChange={onChange}
							className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-900 dark:focus:ring-zinc-100"
						/>
						<span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
							{formData.inStock ? (
								<CheckCircle className="w-4 h-4 text-emerald-500" />
							) : (
								<XCircle className="w-4 h-4 text-rose-500" />
							)}
							Mark Product as In-Stock
						</span>
					</label>
				</div>

				{/* Actions */}
				<div className="pt-4 space-y-3">
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full py-3 px-4 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-sm text-sm sm:text-base cursor-pointer flex items-center justify-center gap-2"
					>
						<Save className="w-4 h-4" />
						{isSubmitting ? 'Saving Changes...' : 'Save Product Changes'}
					</button>

					<Link
						to="/admin/products"
						className="block w-full py-2.5 px-4 text-center rounded-xl border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm sm:text-base"
					>
						Cancel
					</Link>
				</div>
			</div>
		</div>
	);
};

