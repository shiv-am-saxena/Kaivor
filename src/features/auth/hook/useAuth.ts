import { axiosInstance } from "../../../utils/axios";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../context/hooks";
import { AxiosError } from "axios";
import { clearUser, setUser } from "../slice";
import appToast from "../../../components/toast";
const useAuth = () => {
	const dispatch = useAppDispatch();
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const handleRegister = async (data: {
		fullName: string;
		email: string;
		password: string;
		phoneNumber: string;
	}) => {
		try {
			const response = await axiosInstance.post("/auth/register", {
				fullName: data.fullName,
				email: data.email,
				password: data.password,
				phoneNumber: data.phoneNumber
			});
			const res = await response.data;
			appToast.success(res.message);
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.data.statusCode === 409) {
					appToast.error(error.response.data.message);
				}
			}
		}
	};
	const handleLogin = async (data: { email: string; password: string }) => {
		try {
			const response = await axiosInstance.post("/auth/login", {
				email: data.email,
				password: data.password
			});
			const res = await response.data;
			dispatch(
				setUser({
					fullName: res.data.fullName,
					email: res.data.email,
					role: res.data.role,
					phoneNumber: res.data.phoneNumber,
					googleId: res.data.googleId,
					isVerified: res.data.isVerified
				})
			);
			appToast.success(res.message);
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.data.statusCode === 401) {
					appToast.error("Invalid email or password");
				}
				if (error.response?.data.statusCode === 403) {
					const link = encodeURI(data.email);
					appToast.error(
						"Please verify your email",
						"",
						`/resend-verification-email?email=${link}`,
						"Resend Verification Email"
					);
				}
				if (error.response?.data.statusCode === 409) {
					appToast.error(error.response.data.message);
				}
			}
		}
	};
	const handleLogout = async () => {
		await axiosInstance.get("/auth/logout");
		dispatch(clearUser());
	};
	const resendVerificationMail = async (email: string) => {
		try {
			const response = await axiosInstance.post("/auth/resend-verification-email", {
				email
			});
			const res = await response.data;
			appToast.success(res.message);
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data.message);
			} else {
				appToast.error("Something went wrong. Please try again.");
			}
		}
	};
	const handleForgetPassword = async (email: string) => {
		const response = await axiosInstance.post("/auth/forgot-password", {
			email
		});
		const res = await response.data;
		return res;
	};
	const handleResetPassword = async (
		data: { password: string; cnfPassword: string },
		token: string
	) => {
		const response = await axiosInstance.post(`/auth/reset-password?token=${token}`, {
			newPassword: data.password,
			cnfNewPassword: data.cnfPassword
		});
		const res = await response.data;
		return res;
	};
	const handleGenAccessToken = async () => {
		const response = await axiosInstance.post("/auth/regen-access-token");
		const res = await response.data;
		return res;
	};

	const handleFetchUser = useCallback(async () => {
		try {
			const response = await axiosInstance.get("/auth/profile");
			const res = await response.data;
			dispatch(
				setUser({
					fullName: res.data.fullName,
					email: res.data.email,
					role: res.data.role,
					phoneNumber: res.data.phoneNumber,
					googleId: res.data.googleId,
					isVerified: res.data.isVerified
				})
			);
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 401) {
					dispatch(clearUser());
				}
			}
		}
	}, [dispatch]);

	const handleDeleteUser = async () => {
		try {
			const response = await axiosInstance.get("/auth/delete");
			const res = await response.data;
			dispatch(clearUser());
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			return res;
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 401) {
					appToast.error("You are not authorized to delete this account");
				} else {
					appToast.error("Failed to delete account");
				}
			}
		}
	};
	const handleEmailVerification = useCallback(async (token: string) => {
		try {
			const response = await axiosInstance.get(`/auth/verify-email?token=${token}`);
			const res = await response.data;
			appToast.success(res.message);
			return res;
		} catch (error) {
			if (error instanceof AxiosError) {
				appToast.error(error.response?.data.message);
			}
			throw error;
		}
	}, []);
	useEffect(() => {
		if (user === null) {
			handleFetchUser();
		}
	}, [isAuthenticated, handleFetchUser, user]);
	return {
		handleRegister,
		handleLogin,
		handleLogout,
		resendVerificationMail,
		handleForgetPassword,
		handleResetPassword,
		handleGenAccessToken,
		handleDeleteUser,
		handleEmailVerification,
		handleFetchUser
	};
};

export default useAuth;
