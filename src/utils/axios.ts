import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem("accessToken");

		if (token) {
			config.headers = AxiosHeaders.from(config.headers);

			config.headers.set(
				"Authorization",
				`Bearer ${token}`,
			);
		}

		return config;
	}, (error) => {
    return Promise.reject(error);
});


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error, e.g., redirect to login page
            console.error("Unauthorized access - redirecting to login.");
        }
        return Promise.reject(error);
    }
);