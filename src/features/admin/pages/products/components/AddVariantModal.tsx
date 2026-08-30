import React from 'react';
import { Palette, X, Image as ImageIcon } from 'lucide-react';

interface AddVariantModalProps {
	isOpen: boolean;
	isSubmitting: boolean;
	variantFormData: {
		color: string;
		hexCode: string;
	};
	variantPreviews: {
		frontFace: string | null;
		backFace: string | null;
		frontFull: string | null;
		backFull: string | null;
	};
	onClose: () => void;
	onFormChange: (field: 'color' | 'hexCode', value: string) => void;
	onImageChange: (field: 'frontFace' | 'backFace' | 'frontFull' | 'backFull', file: File) => void;
	onSubmit: (e: React.FormEvent) => void;
}

export const AddVariantModal: React.FC<AddVariantModalProps> = ({
	isOpen,
	isSubmitting,
	variantFormData,
	variantPreviews,
	onClose,
	onFormChange,
	onImageChange,
	onSubmit
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
			<div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl w-full max-w-2xl p-6 sm:p-8 space-y-6 my-8">
				<div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
					<h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
						<Palette className="w-5 h-5" />
						Add New Variant
					</h3>
					<button
						onClick={onClose}
						className="p-1 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<form onSubmit={onSubmit} className="space-y-6">
					{/* Color & HexCode inputs */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="space-y-2">
							<label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
								Color Name
							</label>
							<input
								type="text"
								required
								value={variantFormData.color}
								onChange={(e) => onFormChange('color', e.target.value)}
								placeholder="e.g. Navy Blue"
								className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
							/>
						</div>

						<div className="space-y-2">
							<label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
								Hex Code
							</label>
							<div className="flex items-center gap-3">
								<input
									type="color"
									value={variantFormData.hexCode}
									onChange={(e) => onFormChange('hexCode', e.target.value)}
									className="w-10 h-10 rounded-lg border border-zinc-300 dark:border-zinc-800 cursor-pointer bg-transparent"
								/>
								<input
									type="text"
									required
									value={variantFormData.hexCode}
									onChange={(e) => onFormChange('hexCode', e.target.value)}
									placeholder="#000000"
									className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 uppercase"
								/>
							</div>
						</div>
					</div>

					{/* 4 Image Upload Zones */}
					<div className="space-y-2">
						<label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
							Variant Images (4 PNG files required)
						</label>
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
							{(
								[
									{ key: 'frontFace', label: 'Front Face' },
									{ key: 'backFace', label: 'Back Face' },
									{ key: 'frontFull', label: 'Front Full' },
									{ key: 'backFull', label: 'Back Full' }
								] as const
							).map(({ key, label }) => (
								<div key={key} className="space-y-1.5 text-center">
									<span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
										{label}
									</span>
									<label className="relative border-2 border-dashed border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer min-h-28 aspect-square transition-all bg-zinc-50/50 dark:bg-zinc-900/50 overflow-hidden group">
										{variantPreviews[key] ? (
											<img
												src={variantPreviews[key]!}
												alt={label}
												className="w-full h-full object-cover rounded-lg"
											/>
										) : (
											<div className="space-y-1 pointer-events-none">
												<ImageIcon className="w-5 h-5 mx-auto text-zinc-400" />
												<span className="text-[10px] text-zinc-500 block">PNG</span>
											</div>
										)}
										<input
											type="file"
											accept="image/png"
											onChange={(e) => {
												if (e.target.files && e.target.files[0]) {
													onImageChange(key, e.target.files[0]);
												}
											}}
											className="hidden"
										/>
									</label>
								</div>
							))}
						</div>
					</div>

					{/* Modal Footer Actions */}
					<div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-xs"
						>
							{isSubmitting ? 'Adding Variant...' : 'Add Variant'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

