import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProducts from '../../../../hooks/useProducts';
import appToast from '../../../../components/toast';
import type IProductAdmin from '../../../../types/products';

import { ProductHeader } from './components/ProductHeader';
import { ProductStatusState } from './components/ProductStatusState';
import { ProductInfoForm } from './components/ProductInfoForm';
import { ProductVariantsList } from './components/ProductVariantsList';
import { ProductMediaUpload } from './components/ProductMediaUpload';
import { ProductSidebar } from './components/ProductSidebar';
import { AddVariantModal } from './components/AddVariantModal';

const ViewUpdateProduct: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { getProduct, updateProduct, addVariantToProduct, deleteVariantFromProduct } = useProducts();

	const fileInputRef = useRef<HTMLInputElement>(null);
	const assetFileInputRef = useRef<HTMLInputElement>(null);

	const [isLoadingProduct, setIsLoadingProduct] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDragOver, setIsDragOver] = useState(false);
	const [isAssetDragOver, setIsAssetDragOver] = useState(false);

	const [product, setProduct] = useState<IProductAdmin | null>(null);

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		inStock: true,
		status: true,
		amount: 0,
		discount: 0,
		supplierEmail: '',
		supplierCost: 0,
		fabric: '',
		tag: '',
		size: ''
	});

	const [baseImage, setBaseImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [assetFile, setAssetFile] = useState<File | null>(null);

	// Add Variant Modal States
	const [isAddVariantModalOpen, setIsAddVariantModalOpen] = useState(false);
	const [isSubmittingVariant, setIsSubmittingVariant] = useState(false);
	const [variantFormData, setVariantFormData] = useState({
		color: '',
		hexCode: '#000000'
	});
	const [variantImages, setVariantImages] = useState<{
		frontFace: File | null;
		backFace: File | null;
		frontFull: File | null;
		backFull: File | null;
	}>({
		frontFace: null,
		backFace: null,
		frontFull: null,
		backFull: null
	});
	const [variantPreviews, setVariantPreviews] = useState<{
		frontFace: string | null;
		backFace: string | null;
		frontFull: string | null;
		backFull: string | null;
	}>({
		frontFace: null,
		backFace: null,
		frontFull: null,
		backFull: null
	});

	const getProductRef = useRef(getProduct);
	useEffect(() => {
		getProductRef.current = getProduct;
	}, [getProduct]);

	const loadProductData = useCallback(async () => {
		if (!id) return;
		setIsLoadingProduct(true);
		try {
			const data = await getProductRef.current(id);
			if (data) {
				setProduct(data);
				setFormData({
					title: data.title || '',
					description: data.description || '',
					inStock: data.inStock ?? true,
					status: data.status ?? true,
					amount: data.amount || 0,
					discount: data.discount || 0,
					supplierEmail: data.supplierEmail || '',
					supplierCost: data.supplierCost || 0,
					fabric: data.fabric || '',
					tag: Array.isArray(data.tag) ? data.tag.join(', ') : '',
					size: Array.isArray(data.size) ? data.size.join(', ') : ''
				});
				if (data.baseImage) {
					const cloudfrontUrl = import.meta.env.VITE_CLOUDFRONT_URL || '';
					const fullImgUrl = data.baseImage.startsWith('http')
						? data.baseImage
						: `${cloudfrontUrl}/${data.baseImage}`;
					setImagePreview(fullImgUrl);
				}
			}
		} catch (error) {
			console.error('Failed to load product:', error);
		} finally {
			setIsLoadingProduct(false);
		}
	}, [id]);

	useEffect(() => {
		loadProductData();
	}, [loadProductData]);

	const handleDeleteVariant = async (variantId: string) => {
		if (!id) return;
		await deleteVariantFromProduct(id, variantId);
		await loadProductData();
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;
		if (type === 'checkbox') {
			const checked = (e.target as HTMLInputElement).checked;
			setFormData((prev) => ({ ...prev, [name]: checked }));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleImageChange = (file: File) => {
		if (file.type === 'image/png') {
			setBaseImage(file);
			setImagePreview(URL.createObjectURL(file));
		} else {
			appToast.error('Please upload a PNG image file');
		}
	};

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			handleImageChange(e.target.files[0]);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = () => {
		setIsDragOver(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleImageChange(e.dataTransfer.files[0]);
		}
	};

	const removeImage = () => {
		setBaseImage(null);
		setImagePreview(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleAssetChange = (file: File) => {
		const allowedZipMimeTypes = ['application/zip', 'application/x-zip-compressed'];
		const isZipExtension = file.name.endsWith('.zip');
		if (allowedZipMimeTypes.includes(file.type) || isZipExtension) {
			setAssetFile(file);
		} else {
			appToast.error('Please upload a valid ZIP file');
		}
	};

	const handleAssetFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			handleAssetChange(e.target.files[0]);
		}
	};

	const handleAssetDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsAssetDragOver(true);
	};

	const handleAssetDragLeave = () => {
		setIsAssetDragOver(false);
	};

	const handleAssetDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsAssetDragOver(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleAssetChange(e.dataTransfer.files[0]);
		}
	};

	const removeAssetFile = () => {
		setAssetFile(null);
		if (assetFileInputRef.current) {
			assetFileInputRef.current.value = '';
		}
	};

	// Variant Image Upload Handler
	const handleVariantImageChange = (
		field: 'frontFace' | 'backFace' | 'frontFull' | 'backFull',
		file: File
	) => {
		if (file.type !== 'image/png') {
			appToast.error('Variant images must be PNG files');
			return;
		}
		setVariantImages((prev) => ({ ...prev, [field]: file }));
		setVariantPreviews((prev) => ({ ...prev, [field]: URL.createObjectURL(file) }));
	};

	const handleAddVariantSubmit = async (e: React.FormEvent<Element>) => {
		e.preventDefault();
		if (!id) return;
		if (!variantFormData.color.trim()) {
			appToast.error('Color name is required');
			return;
		}
		if (
			!variantImages.frontFace ||
			!variantImages.backFace ||
			!variantImages.frontFull ||
			!variantImages.backFull
		) {
			appToast.error('All 4 variant images (Front Face, Back Face, Front Full, Back Full) are required');
			return;
		}

		setIsSubmittingVariant(true);
		try {
			const submitData = new FormData();
			submitData.append('color', variantFormData.color.trim());
			submitData.append('hexCode', variantFormData.hexCode.trim());
			submitData.append('frontFace', variantImages.frontFace);
			submitData.append('backFace', variantImages.backFace);
			submitData.append('frontFull', variantImages.frontFull);
			submitData.append('backFull', variantImages.backFull);

			await addVariantToProduct(id, submitData);
			setIsAddVariantModalOpen(false);

			// Reset modal state
			setVariantFormData({ color: '', hexCode: '#000000' });
			setVariantImages({ frontFace: null, backFace: null, frontFull: null, backFull: null });
			setVariantPreviews({ frontFace: null, backFace: null, frontFull: null, backFull: null });

			// Refresh product data
			await loadProductData();
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmittingVariant(false);
		}
	};

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!id) return;

		setIsSubmitting(true);
		try {
			const submitData = new FormData();
			submitData.append('title', formData.title);
			submitData.append('description', formData.description);
			submitData.append('inStock', String(formData.inStock));
			submitData.append('status', String(formData.status));
			submitData.append('amount', String(formData.amount));
			submitData.append('discount', String(formData.discount));
			submitData.append('supplierEmail', formData.supplierEmail);
			submitData.append('supplierCost', String(formData.supplierCost));
			submitData.append('fabric', formData.fabric);
			if (baseImage) submitData.append('baseImg', baseImage);
			if (assetFile) submitData.append('assetFile', assetFile);
			submitData.append('tags', formData.tag);
			submitData.append('sizes', formData.size);

			await updateProduct(id, submitData as unknown as Parameters<typeof updateProduct>[1]);
			navigate('/admin/products');
		} catch (err) {
			console.error(err);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoadingProduct || !product) {
		return <ProductStatusState isLoading={isLoadingProduct} hasProduct={Boolean(product)} />;
	}

	return (
		<div className="w-full space-y-6 max-w-7xl 2xl:max-w-384 4k:max-w-[2560px] mx-auto px-4 sm:px-6">
			{/* Page Header Component */}
			<ProductHeader />

			{/* Form Container */}
			<form onSubmit={handleSubmit} className="space-y-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
					{/* Left 2 Columns */}
					<div className="lg:col-span-2 space-y-6">
						{/* Product Info Form Component */}
						<ProductInfoForm formData={formData} onChange={handleChange} />

						{/* Product Variants List Component */}
						<ProductVariantsList
							productId={id}
							variants={product.variants}
							onOpenAddModal={() => setIsAddVariantModalOpen(true)}
							onDeleteVariant={handleDeleteVariant}
						/>

						{/* Product Media Upload Component */}
						<ProductMediaUpload
							imagePreview={imagePreview}
							assetFile={assetFile}
							isDragOver={isDragOver}
							isAssetDragOver={isAssetDragOver}
							fileInputRef={fileInputRef}
							assetFileInputRef={assetFileInputRef}
							onImageChange={handleFileInputChange}
							onAssetChange={handleAssetFileInputChange}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
							onAssetDragOver={handleAssetDragOver}
							onAssetDragLeave={handleAssetDragLeave}
							onAssetDrop={handleAssetDrop}
							onRemoveImage={removeImage}
							onRemoveAsset={removeAssetFile}
						/>
					</div>

					{/* Right 1 Column Sidebar */}
					<ProductSidebar
						formData={formData}
						isSubmitting={isSubmitting}
						onChange={handleChange}
					/>
				</div>
			</form>

			{/* Add Variant Modal Component */}
			<AddVariantModal
				isOpen={isAddVariantModalOpen}
				isSubmitting={isSubmittingVariant}
				variantFormData={variantFormData}
				variantPreviews={variantPreviews}
				onClose={() => setIsAddVariantModalOpen(false)}
				onFormChange={(field, value) =>
					setVariantFormData((prev) => ({ ...prev, [field]: value }))
				}
				onImageChange={handleVariantImageChange}
				onSubmit={handleAddVariantSubmit}
			/>
		</div>
	);
};

export default ViewUpdateProduct;
