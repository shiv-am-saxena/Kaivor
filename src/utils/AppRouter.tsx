import { Navigate, Route, Routes } from "react-router-dom";
import App from "../app/App";
import Auth from "../features/auth/pages/index";
import ForgotPassword from "../features/auth/components/ForgetPassword";
import ResetPassword from "../features/auth/components/ResetPassword";
import VerifyEmail from "../features/auth/components/VerifyEmail";
import ResendVerification from "../features/auth/components/ResendVerification";
import PrivacyPolicy from "../app/Footer-Links/PrivacyPolicy";
import useAuth from "../features/auth/hook/useAuth";
import Role from "./Role";
import Admin from "../features/admin";
import ErrorPage from "../app/error";
import Supplier from "../features/supplier";
import Dashboard from "../features/admin/pages/Dashboard";

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
			<Route element={<Role />}>
				<Route path="/admin" element={<Admin />} >
					<Route index element={<Dashboard />} />
					<Route path="users">
						<Route index element={<div>Users</div>} />
						<Route path="add" element={<div>Add User</div>} />
						<Route path="roles" element={<div>Update User Roles</div>} />
					</Route>
					<Route path="products">
						<Route index element={<div>Products</div>} />
						<Route path="add" element={<div>Add Product</div>} />
					</Route>
					<Route path="orders">
						<Route index element={<div>Orders</div>} />
						<Route path="add" element={<div>Add Order</div>} />
					</Route>
				</Route>
				<Route path="/supplier" element={<Supplier />} />
			</Route>
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
};

export default AppRouter;
