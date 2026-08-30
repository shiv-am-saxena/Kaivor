import { AxiosError } from "axios";
import appToast from "../../../components/toast";
import { axiosInstance } from "../../../utils/axios";

const useAdmin = () => {
	const addUser = async (data: {
		email: string;
		fullName: string;
		role: string;
		phoneNumber: string;
		password?: string;
	}) => {
		try {
			const response = await axiosInstance.post("/admin/auth/add-new-user", data);
			const res = await response.data;
			appToast.success(res.message);
			return res;
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data.message);
			}
			throw error;
		}
	};

	const deleteUser = async (data: { email: string }) => {
		try {
			const response = await axiosInstance.delete("/admin/auth/delete-user", { data });
			const res = await response.data;
			appToast.success(res.message);
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data.message);
			}
		}
	};

	const updateUserRole = async (data: { email: string; role: string }) => {
		try {
			const response = await axiosInstance.post("/admin/auth/update-user-role", data);
			const res = await response.data;
			appToast.success(res.message);
			return res;
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data.message);
			}
		}
	};
	return { addUser, deleteUser, updateUserRole };
};

export default useAdmin;
