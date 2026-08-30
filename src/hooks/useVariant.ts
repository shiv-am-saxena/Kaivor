import { AxiosError } from "axios";
import appToast from "../components/toast";
import { axiosInstance } from "../utils/axios";
import type { IVariant } from "../types/products";

const useVariant = () => {
	const addVariant = async (productId: string, variantData: IVariant) => {
		try {
			const response = await axiosInstance.post(
				`/admin/${productId}/variants/add`,
				variantData,
				{
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}
			);
			const res = await response.data;
			appToast.success(res.message || "Variant added successfully");
			return res.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data?.message || "Failed to add variant");
			}
		}
	};

	const deleteVariant = async (variantId: string, productId: string) => {
		try {
			const response = await axiosInstance.delete(
				`/admin/${productId}/variants/${variantId}`
			);
			const res = await response.data;
			appToast.success(res.message || "Variant deleted successfully");
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data?.message || "Failed to delete variant");
			}
		}
	};

	const updateVariant = async (variantId: string, productId: string, variantData: IVariant) => {
		try {
			const response = await axiosInstance.put(
				`/admin/${productId}/variants/${variantId}`,
				variantData,
				{
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}
			);
			const res = await response.data;
			appToast.success(res.message || "Variant updated successfully");
			return res.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data?.message || "Failed to update variant");
			}
		}
	};

	const deleteVariantImage = async (variantId: string, productId: string, imageName: string) => {
		try {
			const response = await axiosInstance.delete(
				`/admin/${productId}/variants/${variantId}/${imageName}`
			);
			const res = await response.data;
			appToast.success(res.message || "Variant image deleted successfully");
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data?.message || "Failed to delete variant image");
			}
		}
	};

	return { addVariant, deleteVariant, updateVariant, deleteVariantImage };
};

export default useVariant;
