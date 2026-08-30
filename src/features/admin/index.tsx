import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const Admin = () => {
	return (
		<div className="flex min-h-screen bg-zinc-900 text-zinc-100 selection:bg-white selection:text-black">
			<Sidebar />
			<div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
				<main className="flex-1 w-full max-w-7xl 2xl:max-w-384 4k:max-w-[2560px] mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Admin;