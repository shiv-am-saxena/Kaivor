import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../context/hooks";
import ErrorPage from "../app/error";

const Role = () => {
	const { user, isAuthenticated } = useAppSelector((state) => state.auth);
	const { pathname } = useLocation();
	if (isAuthenticated) {
		if (pathname.startsWith("/admin") && user?.role !== "admin") {
			return <ErrorPage />;
		}
		else if(pathname.startsWith("/supplier") && (user?.role !== "supplier" && user?.role !== "admin")) {
			return <ErrorPage />;
		} else {
			return <Outlet />;
		}
	} else {
		return <Navigate to={"/auth?tab=login"} replace={true} />;
	}
};

export default Role;
