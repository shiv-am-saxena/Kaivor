import { AxiosError } from "axios";
import { useAppDispatch } from "../context/hooks";
import { appendProducts, setCurrentPage, setTotalProducts } from "../context/slices/products.slice";
import { axiosInstance } from "../utils/axios";
import appToast from "../components/toast";
import type IProductAdmin from "../types/products";

interface SearchOptions {
	query?: string;
	color?: string;
	size?: string;
	tag?: string;
	fabric?: string;
	minPrice?: number;
	maxPrice?: number;
	minDiscount?: number;
	maxDiscount?: number;
	inStock?: boolean;
	sortBy?: "price_asc" | "price_desc" | "discount_desc" | "newest" | "oldest";
	page?: number;
	limit?: number;
}

const buildSearchParams = (options: string | SearchOptions, page: number) => {
	const params = new URLSearchParams();

	if (typeof options === "string") {
		const query = options.trim();
		if (query) params.append("query", query);
		params.append("page", page.toString());
		return params;
	}

	Object.entries(options).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== "") {
			params.append(key, String(value));
		}
	});

	return params;
};

const useProducts = () => {
	const dispatch = useAppDispatch();

	const fetchProducts = async (page: number) => {
		try {
			const response = await axiosInstance.get(`/products?page=${page}`);
			const res = await response.data;
			dispatch(
				appendProducts(res.data),
				setTotalProducts(res.pagination.totalProducts),
				setCurrentPage(res.pagination.currentPage)
			);
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data?.message || "Failed to fetch products");
			}
		}
	};

	const addNewProduct = async (productData: IProductAdmin) => {
		try {
			const response = await axiosInstance.post("/admin/products/add", productData, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			});
			const res = await response.data;
			appToast.success(res.message || "Product added successfully");
			return res.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data?.message || "Failed to add product");
			}
		}
	};

	const deleteProduct = async (productId: string) => {
		try {
			const response = await axiosInstance.delete(`/admin/products/${productId}`);
			const res = await response.data;
			appToast.success(res.message || "Product deleted successfully");
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data?.message || "Failed to delete product");
			}
		}
	};

	const updateProduct = async (productId: string, productData: IProductAdmin) => {
		try {
			const response = await axiosInstance.put(`/admin/products/${productId}`, productData,
				{
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}
			);
			const res = await response.data;
			appToast.success(res.message || "Product updated successfully");
			return res.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data?.message || "Failed to update product");
			}
		}
	};

	const getProduct = async (productId: string) => {
		try {
			const response = await axiosInstance.get(`/products/${productId}`);
			const res = await response.data;
			return res.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data?.message || "Failed to fetch product");
			}
		}
	};

	const getProductsBySearch = async (options: string | SearchOptions, page: number = 1) => {
		try {
			const params = buildSearchParams(options, page);
			const response = await axiosInstance.get(`/products/search?${params.toString()}`);
			const res = await response.data;
			return res.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(
					error.response?.data?.message || "Failed to fetch products by search"
				);
			}
		}
	};

	return {
		fetchProducts,
		addNewProduct,
		deleteProduct,
		updateProduct,
		getProduct,
		getProductsBySearch
	};
};

export default useProducts;
