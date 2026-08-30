import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import store from "../context/store";
import { clearUser } from "../features/auth/slice/index";

interface RetryableConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true
});

// Dedicated instance for token refresh to avoid looping through main interceptors
const refreshAxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true
});

const canRefresh = (error: AxiosError, config?: RetryableConfig): config is RetryableConfig => {
	if (error.response?.status !== 401 || !config || config._retry) return false;
	return !config.url?.includes("/auth/login");
};

const handleRedirectToLogin = () => {
	store.dispatch(clearUser());
	if (typeof window !== "undefined" && window.location.pathname !== "/auth") {
		window.location.href = "/auth?tab=login";
	}
};

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as RetryableConfig | undefined;

		if (!canRefresh(error, originalRequest)) {
			return Promise.reject(error);
		}

		originalRequest._retry = true;

		try {
			// Perform token refresh using dedicated instance
			await refreshAxiosInstance.post("/auth/regen-access-token");
			return axiosInstance(originalRequest);
		} catch (refreshError) {
			handleRedirectToLogin();
			return Promise.reject(refreshError);
		}
	}
);
