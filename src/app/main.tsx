import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "../context/store.ts";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../utils/AppRouter.tsx";
import { Toaster } from "sonner";
import Navbar from "../components/Navbar.tsx";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Provider store={store}>
			<StrictMode>
				<>
					<Navbar />
					<AppRouter />
					<Toaster position="top-right" richColors closeButton duration={5000} />
				</>
			</StrictMode>
		</Provider>
	</BrowserRouter>
);
