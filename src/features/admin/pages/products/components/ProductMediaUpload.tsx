import React, { type RefObject } from 'react';
import { Upload, X, FileArchive } from 'lucide-react';

interface ProductMediaUploadProps {
	imagePreview: string | null;
	assetFile: File | null;
	isDragOver: boolean;
	isAssetDragOver: boolean;
	fileInputRef: RefObject<HTMLInputElement | null>;
	assetFileInputRef: RefObject<HTMLInputElement | null>;
	onImageChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
	onAssetChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
	onDragOver: (_e: React.DragEvent<HTMLDivElement>) => void;
	onDragLeave: () => void;
	onDrop: (_e: React.DragEvent<HTMLDivElement>) => void;
	onAssetDragOver: (_e: React.DragEvent<HTMLDivElement>) => void;
	onAssetDragLeave: () => void;
	onAssetDrop: (_e: React.DragEvent<HTMLDivElement>) => void;
	onRemoveImage: () => void;
	onRemoveAsset: () => void;
}

export const ProductMediaUpload: React.FC<ProductMediaUploadProps> = ({
	imagePreview,
	assetFile,
	isDragOver,
	isAssetDragOver,
	fileInputRef,
	assetFileInputRef,
	onImageChange,
	onAssetChange,
	onDragOver,
	onDragLeave,
	onDrop,
	onAssetDragOver,
	onAssetDragLeave,
	onAssetDrop,
	onRemoveImage,
	onRemoveAsset
}) => {
	return (
		<div className="bg-white dark:bg-zinc-950 p-6 sm:p-8 2xl:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
			<h2 className="text-lg sm:text-xl 2xl:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 pb-4 border-b border-zinc-150 dark:border-zinc-850">
				<Upload className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
				Update Product Media & Assets
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{/* Base Image Upload */}
				<div className="space-y-2">
					<label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
						Base Image (PNG)
					</label>
					<div
						onDragOver={onDragOver}
						onDragLeave={onDragLeave}
						onDrop={onDrop}
						className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all min-h-44 ${isDragOver
							? 'border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-900'
							: 'border-zinc-300 dark:border-zinc-800 hover:border-zinc-400'
							}`}
						onClick={() => fileInputRef.current?.click()}
					>
						{imagePreview ? (
							<div className="relative w-full aspect-square max-h-40 rounded-lg overflow-hidden group">
								<img
									src={imagePreview}
									alt="Product Preview"
									className="w-full h-full object-cover"
								/>
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										onRemoveImage();
									}}
									className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer"
								>
									<X className="w-4 h-4" />
								</button>
							</div>
						) : (
							<div className="text-center space-y-2 pointer-events-none">
								<Upload className="w-8 h-8 mx-auto text-zinc-400" />
								<p className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
									Drag & drop PNG image
								</p>
							</div>
						)}
						<input
							type="file"
							ref={fileInputRef}
							onChange={onImageChange}
							accept="image/png"
							className="hidden"
						/>
					</div>
				</div>

				{/* Production Asset ZIP Upload */}
				<div className="space-y-2">
					<label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
						Assets (ZIP File)
					</label>
					<div
						onDragOver={onAssetDragOver}
						onDragLeave={onAssetDragLeave}
						onDrop={onAssetDrop}
						className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all min-h-44 ${isAssetDragOver
							? 'border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-900'
							: 'border-zinc-300 dark:border-zinc-800 hover:border-zinc-400'
							}`}
						onClick={() => assetFileInputRef.current?.click()}
					>
						{assetFile ? (
							<div className="flex flex-col items-center justify-center w-full bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center space-y-2 relative">
								<FileArchive className="w-8 h-8 text-zinc-600 dark:text-zinc-300" />
								<span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 max-w-full truncate px-2">
									{assetFile.name}
								</span>
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										onRemoveAsset();
									}}
									className="absolute top-2 right-2 p-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer"
								>
									<X className="w-3.5 h-3.5" />
								</button>
							</div>
						) : (
							<div className="text-center space-y-2 pointer-events-none">
								<FileArchive className="w-8 h-8 mx-auto text-zinc-400" />
								<p className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
									Replace ZIP Assets
								</p>
							</div>
						)}
						<input
							type="file"
							ref={assetFileInputRef}
							onChange={onAssetChange}
							accept=".zip,application/zip,application/x-zip-compressed"
							className="hidden"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

