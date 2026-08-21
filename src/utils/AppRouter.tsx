import { Navigate, Route, Routes } from "react-router-dom";
import App from "../app/App";
import Auth from "../features/auth/pages/index";
import ForgotPassword from "../features/auth/components/ForgetPassword";
import ResetPassword from "../features/auth/components/ResetPassword";
import VerifyEmail from "../features/auth/components/VerifyEmail";
import ResendVerification from "../features/auth/components/ResendVerification";
import PrivacyPolicy from "../app/Footer-Links/PrivacyPolicy";
import useAuth from "../features/auth/hook/useAuth";

const AppRouter = () => {
	useAuth();
	return (
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/auth" element={<Auth />} />
			<Route path="/auth/callback" element={<Navigate to="/" replace={true} />} />
			<Route path="/auth/verify-email" element={<VerifyEmail />} />
			<Route path="/resend-verification-email" element={<ResendVerification />} />
			<Route path="/auth/forgot-password" element={<ForgotPassword />} />
			<Route path="/auth/reset-password" element={<ResetPassword />} />
			<Route path="/privacy" element={<PrivacyPolicy />} />
		</Routes>
	);
};

export default AppRouter;
