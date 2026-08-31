import React from 'react';
import { RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductStatusStateProps {
    isLoading: boolean;
    hasProduct: boolean;
}

export const ProductStatusState: React.FC<ProductStatusStateProps> = ({
    isLoading,
    hasProduct
}) => {
    if (isLoading) {
        return (
            <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3 text-zinc-500 dark:text-zinc-400">
                <RefreshCw className="w-8 h-8 animate-spin text-zinc-700 dark:text-zinc-300" />
                <p className="text-sm font-medium">Loading product details...</p>
            </div>
        );
    }

    if (!hasProduct) {
        return (
            <div className="w-full space-y-6 max-w-7xl mx-auto px-4 py-12 text-center">
                <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Product not found</p>
                <Link
                    to="/admin/products"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Link>
            </div>
        );
    }

    return null;
};

