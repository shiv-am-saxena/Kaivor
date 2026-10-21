/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../context/hooks';
import useProducts from '../../hooks/useProducts';
import useCart from '../../hooks/useCart';
import { appendProduct } from '../../context/slices/cart.slice';
import HeadingBx from '../ui/HeadingBx';
import appToast from '../toast';
import type { IProductUser } from '../../types/products';

const Featured = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { featuredProduct } = useAppSelector((state) => state.homepage) as { featuredProduct: any };
    const { getProduct } = useProducts();
    const { addProductToCart } = useCart();
    const [products, setProducts] = useState<IProductUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [addingProductId, setAddingProductId] = useState<string | null>(null);

    // If products are already populated objects from SDUI endpoint, use them directly
    const rawProducts: unknown[] = Array.isArray(featuredProduct?.products) ? featuredProduct.products : [];
    const areProductsAlreadyPopulated = rawProducts.length > 0 && typeof rawProducts[0] === 'object' && rawProducts[0] !== null;

    const productIdsStr = !areProductsAlreadyPopulated
        ? rawProducts.filter((id: unknown): id is string => typeof id === 'string' && id.trim().length > 0).join(',')
        : '';

    useEffect(() => {
        if (!productIdsStr) {
            return;
        }

        const ids = productIdsStr.split(',');
        let isMounted = true;

        Promise.resolve()
            .then(() => {
                if (isMounted) setLoading(true);
                return Promise.all(ids.map((id) => getProduct(id)));
            })
            .then((results) => {
                if (isMounted) {
                    const validProducts = results.filter((p): p is IProductUser => Boolean(p));
                    setProducts(validProducts);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [productIdsStr, getProduct]);

    const visibleProducts: IProductUser[] = areProductsAlreadyPopulated
        ? (rawProducts as IProductUser[])
        : !productIdsStr
          ? []
          : products;
    const isLoading = !areProductsAlreadyPopulated && loading && Boolean(productIdsStr);

    const genSrc = (path: string) => {
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        const cfUrl = import.meta.env.VITE_CLOUDFRONT_URL;
        return cfUrl ? `${cfUrl}/${path}` : path;
    };

    const handleAddToCart = async (e: React.MouseEvent, product: IProductUser) => {
        e.preventDefault();
        e.stopPropagation();

        const defaultVariant = product.variants?.[0];
        const defaultSize = product.size?.[0];

        // If product has multiple variants or sizes, redirect to product page for proper selection
        if ((product.size && product.size.length > 1) || (product.variants && product.variants.length > 1)) {
            navigate(`/product/${product._id}`);
            return;
        }

        if (!product._id) {
            appToast.error('Invalid product');
            return;
        }

        const variantId = typeof defaultVariant === 'object' ? (defaultVariant?._id || '') : (defaultVariant || '');

        setAddingProductId(product._id);
        try {
            const cartItem = {
                productId: product._id,
                quantity: 1,
                variant: variantId,
                size: defaultSize || 'Free Size'
            };

            const res = await addProductToCart(cartItem);
            if (res) {
                dispatch(appendProduct(cartItem));
            }
        } finally {
            setAddingProductId(null);
        }
    };

    if (!featuredProduct || !featuredProduct.isActive) return null;

    return (
        <section className="relative w-full h-fit flex flex-col items-center justify-center text-neutral-900 dark:text-white select-none py-16 sm:py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 gap-10">
            <HeadingBx title={featuredProduct.title || "Featured Products"} color="orange-500" />

            {isLoading && visibleProducts.length === 0 ? (
                <div className="w-full flex items-center justify-center py-16 text-neutral-400">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                        <span className="text-sm font-medium">Loading featured products...</span>
                    </div>
                </div>
            ) : (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {visibleProducts.map((product, idx) => {
                        const imageSrc = product.baseImage || (product as any).baseImg;
                        const productTitle = product.title || (product as any).name;
                        const discountedPrice = Math.round(product.amount - (product.amount * (product.discount / 100)));
                        const isAdding = addingProductId === product._id;
                        const isOutOfStock = product.inStock === false;

                        return (
                            <div
                                key={idx}
                                className="group relative flex flex-col justify-between rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80 p-3 sm:p-3.5 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 hover:border-orange-500/30 hover:-translate-y-1"
                            >
                                <Link
                                    to={`/product/${product._id}`}
                                    className="flex flex-col gap-3"
                                >
                                    {/* Image Showcase Container */}
                                    <div className="relative w-full aspect-3/4 rounded-xl overflow-hidden bg-neutral-200/60 dark:bg-neutral-950">
                                        <img
                                            src={genSrc(imageSrc)}
                                            alt={productTitle}
                                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                        />

                                        {/* Badges Overlay */}
                                        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
                                            {product.discount > 0 && (
                                                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-orange-500 text-white shadow-xs">
                                                    {product.discount}% OFF
                                                </span>
                                            )}
                                            {isOutOfStock && (
                                                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-neutral-900/80 text-neutral-300 backdrop-blur-xs">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </div>

                                        {/* Quick View Corner Icon */}
                                        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-neutral-900/60 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                        </div>
                                    </div>

                                    {/* Product Meta */}
                                    <div className="flex flex-col gap-1.5 px-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover:text-orange-500 transition-colors">
                                                {productTitle}
                                            </h3>

                                            {/* Color Variant Dots */}
                                            {product.variants && product.variants.length > 0 && (
                                                <div className="flex items-center -space-x-1 shrink-0 pt-0.5">
                                                    {product.variants.slice(0, 3).map((variant, vIdx) => (
                                                        <span
                                                            key={vIdx}
                                                            className="w-3.5 h-3.5 rounded-full border border-white dark:border-neutral-900 shadow-xs"
                                                            style={{ backgroundColor: variant.hexCode }}
                                                            title={variant.color}
                                                        />
                                                    ))}
                                                    {product.variants.length > 3 && (
                                                        <span className="text-[10px] text-neutral-400 pl-1.5">
                                                            +{product.variants.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Pricing */}
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                                                ₹{discountedPrice}
                                            </span>
                                            {product.discount > 0 && (
                                                <span className="text-xs text-neutral-400 line-through">
                                                    ₹{product.amount}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>

                                {/* Action Button */}
                                <div className="mt-3 pt-2.5 border-t border-neutral-200/60 dark:border-neutral-800/60">
                                    <button
                                        type="button"
                                        onClick={(e) => handleAddToCart(e, product)}
                                        disabled={isAdding || isOutOfStock}
                                        className="w-full py-2.5 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 bg-neutral-900 text-white hover:bg-orange-500 dark:bg-white dark:text-neutral-950 dark:hover:bg-orange-500 dark:hover:text-white disabled:opacity-40 disabled:hover:bg-neutral-900 dark:disabled:hover:bg-white cursor-pointer active:scale-[0.98]"
                                    >
                                        <ShoppingBag className={`w-4 h-4 ${isAdding ? 'animate-bounce' : ''}`} />
                                        <span>
                                            {isAdding
                                                ? 'Adding...'
                                                : isOutOfStock
                                                  ? 'Sold Out'
                                                  : 'Add to Cart'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default Featured;