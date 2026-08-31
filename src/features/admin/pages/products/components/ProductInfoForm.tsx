import React from 'react';
import { Package, Tag, Layers } from 'lucide-react';

interface ProductInfoFormProps {
	formData: {
		title: string;
		description: string;
		fabric: string;
		tag: string;
		size: string;
	};
	onChange: (_e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const ProductInfoForm: React.FC<ProductInfoFormProps> = ({ formData, onChange }) => {
	return (
		<div className="bg-white dark:bg-zinc-950 p-6 sm:p-8 2xl:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
			<h2 className="text-lg sm:text-xl 2xl:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 pb-4 border-b border-zinc-150 dark:border-zinc-850">
				<Package className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
				Product Information
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
				{/* Title */}
				<div className="sm:col-span-2 space-y-2">
					<label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
						Product Title
					</label>
					<input
						type="text"
						name="title"
						required
						value={formData.title}
						onChange={onChange}
						placeholder="e.g. Vintage Denim Jacket"
						className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
					/>
				</div>

				{/* Description */}
				<div className="sm:col-span-2 space-y-2">
					<label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
						Description
					</label>
					<textarea
						name="description"
						required
						rows={4}
						value={formData.description}
						onChange={onChange}
						placeholder="Describe the product material, design, fits..."
						className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all resize-none"
					/>
				</div>

				{/* Fabric */}
				<div className="space-y-2">
					<label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
						Fabric / Material
					</label>
					<input
						type="text"
						name="fabric"
						required
						value={formData.fabric}
						onChange={onChange}
						placeholder="e.g. 100% Cotton Denim"
						className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
					/>
				</div>

				{/* Tags */}
				<div className="space-y-2">
					<label className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
						<Tag className="w-3.5 h-3.5" />
						Tags (Comma separated)
					</label>
					<input
						type="text"
						name="tag"
						required
						value={formData.tag}
						onChange={onChange}
						placeholder="jacket, denim, vintage"
						className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
					/>
				</div>

				{/* Sizes */}
				<div className="sm:col-span-2 space-y-2">
					<label className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
						<Layers className="w-3.5 h-3.5" />
						Sizes (Comma separated)
					</label>
					<input
						type="text"
						name="size"
						required
						value={formData.size}
						onChange={onChange}
						placeholder="S, M, L, XL"
						className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
					/>
				</div>
			</div>
		</div>
	);
};

