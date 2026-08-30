import { AxiosError } from "axios";
import appToast from "../components/toast";
import { axiosInstance } from "../utils/axios";
import type { ICartProduct } from "../types/cart";

const useCart = () => {
	const addProductToCart = async (data: ICartProduct) => {
		try {
			const response = await axiosInstance.post("/cart/add", data);
			const res = await response.data;
			appToast.success("Product added to cart successfully");
			return res;
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data.message);
			}
		}
	};

	const removeProductFromCart = async (cartId: string, itemId: string) => {
		try {
			const response = await axiosInstance.delete(`/cart/${cartId}/remove/${itemId}`);
			const res = await response.data;
			appToast.success("Product removed from cart successfully");
			return res;
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data.message);
			}
		}
	};

	const updateQuantityOfProductInCart = async (
		cartId: string,
		itemId: string,
		quantity: number
	) => {
		try {
			const response = await axiosInstance.put(`/cart/${cartId}/update/${itemId}`, {
				quantity
			});
			const res = await response.data;
			appToast.success("Product quantity updated successfully");
			return res;
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data.message);
			}
		}
	};

	const getCart = async () => {
		try {
			const response = await axiosInstance.get("/cart");
			const res = await response.data;
			return res;
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data.message);
			}
		}
	};

	return { addProductToCart, removeProductFromCart, updateQuantityOfProductInCart, getCart };
};

export default useCart;
