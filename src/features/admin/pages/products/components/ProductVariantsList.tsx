import React, { useState } from 'react';
import { Eye, Trash2, Palette, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { IVariant } from '../../../../../types/products';

interface ProductVariantsListProps {
	productId?: string;
	variants?: (IVariant | string)[];
	onOpenAddModal: () => void;
	onDeleteVariant?: (_variantId: string) => Promise<void>;
}

export const ProductVariantsList: React.FC<ProductVariantsListProps> = ({
	variants,
	onOpenAddModal,
	onDeleteVariant
}) => {
	const cloudfrontUrl = import.meta.env.VITE_CLOUDFRONT_URL || '';

	const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);
	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const handleOpenViewModal = (variant: IVariant) => {
		setSelectedVariant(variant);
		setActiveImageIndex(0);
	};

	const handleCloseViewModal = () => {
		setSelectedVariant(null);
		setActiveImageIndex(0);
	};

	const handleDelete = async (variantId: string) => {
		if (!window.confirm('Are you sure you want to delete this variant?')) return;
		if (!onDeleteVariant) return;
		setDeletingId(variantId);
		try {
			await onDeleteVariant(variantId);
		} finally {
			setDeletingId(null);
		}
	};

	// Helper function to resolve S3 / CloudFront URLs
	const resolveImageUrl = (path?: string) => {
		if (!path) return '';
		if (path.startsWith('http')) return path;
		return cloudfrontUrl ? `${cloudfrontUrl}/${path}` : path;
	};

	// Collect existing image slides for selected variant modal carousel
	const getVariantImageSlides = (v: IVariant) => {
		const slides = [
			{ title: 'Front Face', url: resolveImageUrl(v.frontFace) },
			{ title: 'Back Face', url: resolveImageUrl(v.backFace) },
			{ title: 'Front Full', url: resolveImageUrl(v.frontFull) },
			{ title: 'Back Full', url: resolveImageUrl(v.backFull) }
		].filter((s) => Boolean(s.url));
		return slides;
	};

	const modalSlides = selectedVariant ? getVariantImageSlides(selectedVariant) : [];

	return (
		<div className="bg-white dark:bg-zinc-950 p-6 sm:p-8 2xl:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
			{/* Section Header */}
			<div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-150 dark:border-zinc-850">
				<h2 className="text-lg sm:text-xl 2xl:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
					<Palette className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
					Product Variants ({variants?.length || 0})
				</h2>
				<button
					type="button"
					onClick={onOpenAddModal}
					className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
				>
					<Plus className="w-4 h-4" />
					<span>Add Variant</span>
				</button>
			</div>

			{/* Variant Cards List */}
			{!variants || variants.length === 0 ? (
				<div className="p-8 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800">
					<Palette className="w-8 h-8 mx-auto text-zinc-400 mb-2" />
					<p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
						No color variants added yet
					</p>
					<p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
						Click "Add Variant" above to upload color images.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{variants.map((v: IVariant | string, idx: number) => {
						if (typeof v === 'string') {
							return (
								<div
									key={v || idx}
									className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400"
								>
									Variant ID: {v}
								</div>
							);
						}

						const frontImg = resolveImageUrl(v.frontFace) || 'https://via.placeholder.com/100';

						return (
							<div
								key={v._id || idx}
								className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4"
							>
								<div className="flex items-center gap-3.5 min-w-0">
									<img
										src={frontImg}
										alt={v.color || 'Variant'}
										className="w-14 h-14 rounded-lg object-cover border border-zinc-200 dark:border-zinc-700 shrink-0 bg-white"
									/>
									<div className="space-y-1 min-w-0">
										<div className="flex items-center gap-2">
											<span
												className="w-3.5 h-3.5 rounded-full border border-zinc-300 dark:border-zinc-700 shrink-0"
												style={{ backgroundColor: v.hexCode || '#000' }}
											/>
											<span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">
												{v.color || 'Default Color'}
											</span>
										</div>
										<p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
											HEX: {v.hexCode || 'N/A'}
										</p>
									</div>
								</div>

								{/* Action Buttons: View & Delete */}
								<div className="flex items-center gap-2 shrink-0">
									<button
										type="button"
										onClick={() => handleOpenViewModal(v)}
										title="View Variant details"
										className="p-2 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
									>
										<Eye className="w-4 h-4" />
									</button>
									<button
										type="button"
										onClick={() => v._id && handleDelete(v._id)}
										disabled={deletingId === v._id}
										title="Delete Variant"
										className="p-2 rounded-lg bg-rose-100 dark:bg-rose-950/60 hover:bg-rose-200 dark:hover:bg-rose-900 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer disabled:opacity-50"
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{/* Responsive Swiper/Carousel Modal for Viewing Variant Details */}
			{selectedVariant && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 overflow-y-auto">
					<div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl w-full max-w-xl p-6 space-y-6 my-8">
						{/* Modal Header */}
						<div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
							<div className="flex items-center gap-3">
								<span
									className="w-5 h-5 rounded-full border border-zinc-300 dark:border-zinc-700 shadow-xs"
									style={{ backgroundColor: selectedVariant.hexCode || '#000' }}
								/>
								<div>
									<h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
										{selectedVariant.color || 'Variant Details'}
									</h3>
									<p className="text-xs text-zinc-500 font-mono">
										HEX Code: {selectedVariant.hexCode || 'N/A'}
									</p>
								</div>
							</div>
							<button
								type="button"
								onClick={handleCloseViewModal}
								className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Responsive Image Carousel */}
						{modalSlides.length > 0 ? (
							<div className="space-y-4">
								<div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 group flex items-center justify-center">
									<img
										src={modalSlides[activeImageIndex].url}
										alt={modalSlides[activeImageIndex].title}
										className="w-full h-full object-contain transition-all duration-300"
									/>

									{/* Current Slide Badge */}
									<div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-semibold backdrop-blur-xs">
										{modalSlides[activeImageIndex].title}
									</div>

									{/* Navigation Buttons */}
									{modalSlides.length > 1 && (
										<>
											<button
												type="button"
												onClick={() =>
													setActiveImageIndex((prev) =>
														prev === 0 ? modalSlides.length - 1 : prev - 1
													)
												}
												className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all cursor-pointer shadow-md"
											>
												<ChevronLeft className="w-5 h-5" />
											</button>
											<button
												type="button"
												onClick={() =>
													setActiveImageIndex((prev) =>
														prev === modalSlides.length - 1 ? 0 : prev + 1
													)
												}
												className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all cursor-pointer shadow-md"
											>
												<ChevronRight className="w-5 h-5" />
											</button>
										</>
									)}
								</div>

								{/* Thumbnail Indicator Dots / Carousel Strips */}
								<div className="flex items-center justify-center gap-2">
									{modalSlides.map((slide, i) => (
										<button
											key={i}
											type="button"
											onClick={() => setActiveImageIndex(i)}
											className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-white dark:bg-zinc-900 ${
												activeImageIndex === i
													? 'border-zinc-900 dark:border-zinc-100 scale-105 shadow-sm'
													: 'border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100'
											}`}
										>
											<img
												src={slide.url}
												alt={slide.title}
												className="w-full h-full object-cover"
											/>
										</button>
									))}
								</div>
							</div>
						) : (
							<div className="p-8 text-center text-zinc-500">No images available for this variant.</div>
						)}

						{/* Modal Footer */}
						<div className="flex justify-end pt-3 border-t border-zinc-200 dark:border-zinc-800">
							<button
								type="button"
								onClick={handleCloseViewModal}
								className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
