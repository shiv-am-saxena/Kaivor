import { axiosInstance } from "../../../utils/axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../context/hooks";
import { AxiosError } from "axios";
import { clearUser, setUser } from "../slice";
import appToast from "../../../components/toast";
const useAuth = () => {
	const [token, _setToken] = useState<string | null>(localStorage.getItem("token"));
	const dispatch = useAppDispatch();
	const {isAuthenticated} = useAppSelector(state => state.auth);
	const handleRegister = async (data) => {
		const response = await axiosInstance.post("/auth/register", {
			fullName: data.fullName,
			email: data.email,
			password: data.password,
			phoneNumber: data.phoneNumber
		});
		const res = await response.data;
		return res;
	};
	const handleLogin = async (data) => {
		try {
			const response = await axiosInstance.post("/auth/login", {
				email: data.email,
				password: data.password
			});
			const res = await response.data;
			dispatch(
				setUser({
					user: {
						fullName: res.data.fullName,
						email: res.data.email,
						role: res.data.role,
						phoneNumber: res.data.phoneNumber,
						googleId: res.data.googleId,
						isVerified: res.data.isVerified
					},
					token: res.data.token
				})
			);
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("user", JSON.stringify(res.data));
			appToast.success("Login successful");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.data.statusCode === 401) {
					appToast.error("Invalid email or password");
				}
                if(error.response?.data.statusCode === 403){
                    const link = encodeURI(data.email);
                    appToast.error("Please verify your email", "", `/resend-verification-email?email=${link}`, "Resend Verification Email");
                }
			}
		}
	};
	const handleLogout = async () => {
		await axiosInstance.get("/auth/logout");
		dispatch(clearUser());
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	};
	const resendVerificationMail = async (email: string) => {
		const response = await axiosInstance.post("/auth/resend-verification-email", {
			email
		});
		const res = await response.data;
		return res;
	};
	const handleForgetPassword = async (email: string) => {
		const response = await axiosInstance.post("/auth/forgot-password", {
			email
		});
		const res = await response.data;
		return res;
	};
	const handleResetPassword = async (data, token: string) => {
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


	const handleFetchUser = async (token: string) => {
		try {
			const response = await axiosInstance.get("/auth/profile");
			const res = await response.data;
			dispatch(
				setUser({
					user: {
						fullName: res.data.fullName,
						email: res.data.email,
						role: res.data.role,
						phoneNumber: res.data.phoneNumber,
						googleId: res.data.googleId,
						isVerified: res.data.isVerified
					},
					token
				})
			);
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 401) {
					dispatch(clearUser());
				}
			}
		}
	};

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
	useEffect(() => {
		if (!isAuthenticated) {
			handleFetchUser(token);
		}
	}, [isAuthenticated]);
	return {
		handleRegister,
		handleLogin,
		handleLogout,
		resendVerificationMail,
		handleForgetPassword,
		handleResetPassword,
		handleGenAccessToken,
		handleDeleteUser
	};
};

export default useAuth;
