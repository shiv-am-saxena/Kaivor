import { Route, Routes } from "react-router-dom";
import App from "../app/App";
import Auth from "../features/auth/pages/index";
import ForgotPassword from "../features/auth/pages/ForgetPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";
const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/auth" element={<Auth />} />
			<Route path="/auth/forgot-password" element={<ForgotPassword />} />
			<Route path="/auth/reset-password" element={<ResetPassword />} />
		</Routes>
	);
};

export default AppRouter;
