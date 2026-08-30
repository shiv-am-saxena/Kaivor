import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Upload, X, Package, Tag, DollarSign, Layers, Image as ImageIcon, FileArchive } from 'lucide-react';
import useProducts from '../../../../hooks/useProducts';
import appToast from '../../../../components/toast';

interface AddProductFormData {
    title: string;
    description: string;
    inStock: boolean;
    isActive: boolean;
    amount: number;
    discount: number;
    supplierEmail: string;
    supplierCost: number;
    fabric: string;
    tag: string;
    size: string;
}

const AddProducts: React.FC = () => {
    const navigate = useNavigate();
    const { addNewProduct } = useProducts();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const assetFileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<AddProductFormData>({
        title: '',
        description: '',
        inStock: true,
        isActive: true,
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isAssetDragOver, setIsAssetDragOver] = useState(false);

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

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!baseImage) {
            appToast.error('Please upload a PNG base image');
            return;
        }
        if (!assetFile) {
            appToast.error('Please upload an asset ZIP file');
            return;
        }

        setIsSubmitting(true);
        try {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('description', formData.description);
            submitData.append('inStock', String(formData.inStock));
            submitData.append('isActive', String(formData.isActive));
            submitData.append('amount', String(formData.amount));
            submitData.append('discount', String(formData.discount));
            submitData.append('supplierEmail', formData.supplierEmail);
            submitData.append('supplierCost', String(formData.supplierCost));
            submitData.append('fabric', formData.fabric);
            submitData.append('baseImg', baseImage);
            submitData.append('assetFile', assetFile);
            submitData.append('tags', formData.tag);
            submitData.append('sizes', formData.size);

            await addNewProduct(submitData as unknown as Parameters<typeof addNewProduct>[0]);
            navigate('/admin/products');
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full space-y-6 max-w-7xl 2xl:max-w-384 4k:max-w-[2560px] mx-auto px-4 sm:px-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="space-y-1.5">

                    <h1 className="text-2xl sm:text-3xl 2xl:text-4xl 4k:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Add New Product
                    </h1>
                    <p className="text-xs sm:text-sm 2xl:text-base 4k:text-lg text-zinc-500 dark:text-zinc-400">
                        Add a new item to the shop catalog with images, details, and cost configuration.
                    </p>
                </div>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Left 2 Columns: Main Form Fields & Upload Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Product Info Card */}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        placeholder="e.g. 100% Cotton Denim"
                                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
                                    />
                                </div>

                                {/* Tags */}
                                <div className="space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                                        <Layers className="w-3.5 h-3.5" />
                                        Sizes (Comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        name="size"
                                        required
                                        value={formData.size}
                                        onChange={handleChange}
                                        placeholder="S, M, L, XL"
                                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
                                    />
                                </div>

                                {/* Sizes */}
                                <div className="sm:col-span-2 space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                                        <Tag className="w-3.5 h-3.5" />
                                        Tags (Comma separated)

                                    </label>
                                    <input
                                        type="text"
                                        name="tag"
                                        required
                                        value={formData.tag}
                                        onChange={handleChange}
                                        placeholder="jacket, denim, vintage"
                                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Combined File Uploads Section */}
                        <div className="bg-white dark:bg-zinc-950 p-6 sm:p-8 2xl:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
                            <h2 className="text-lg sm:text-xl 2xl:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 pb-4 border-b border-zinc-150 dark:border-zinc-850">
                                <Upload className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                                Product Media & Assets
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Base Image Upload */}
                                <div className="space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                                        <ImageIcon className="w-4 h-4 text-zinc-500" />
                                        Base Image (PNG)
                                    </label>
                                    <div
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
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
                                                        removeImage();
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
                                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                                                    or click to browse
                                                </p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileInputChange}
                                            accept="image/png"
                                            className="hidden"
                                        />
                                    </div>
                                </div>

                                {/* Production Asset ZIP Upload */}
                                <div className="space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                                        <FileArchive className="w-4 h-4 text-zinc-500" />
                                        Assets (ZIP File)
                                    </label>
                                    <div
                                        onDragOver={handleAssetDragOver}
                                        onDragLeave={handleAssetDragLeave}
                                        onDrop={handleAssetDrop}
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
                                                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                                                    ({(assetFile.size / (1024 * 1024)).toFixed(2)} MB)
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeAssetFile();
                                                    }}
                                                    className="absolute top-2 right-2 p-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center space-y-2 pointer-events-none">
                                                <Upload className="w-8 h-8 mx-auto text-zinc-400" />
                                                <p className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                    Drag & drop ZIP file
                                                </p>
                                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                                                    or click to select ZIP file
                                                </p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            ref={assetFileInputRef}
                                            onChange={handleAssetFileInputChange}
                                            accept=".zip,application/zip,application/x-zip-compressed"
                                            className="hidden"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right 1 Column: Pricing & Actions */}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                    placeholder="supplier@example.com"
                                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base"
                                />
                            </div>

                            {/* Stock & Active toggles */}
                            <div className="space-y-2 py-2">
                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleChange}
                                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                    />
                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Mark Product as Active
                                    </span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        name="inStock"
                                        checked={formData.inStock}
                                        onChange={handleChange}
                                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                    />
                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Mark Product as In-Stock
                                    </span>
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 space-y-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 px-4 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-sm text-sm sm:text-base cursor-pointer"
                                >
                                    {isSubmitting ? 'Creating Product...' : 'Create Product'}
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
                </div>
            </form>
        </div>
    );
};

export default AddProducts;
