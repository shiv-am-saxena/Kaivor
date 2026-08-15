import { Route, Routes } from "react-router-dom"
import App from "../app/App";
import Auth from "../features/auth/pages/index"
const AppRouter = () => {
	return (
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/auth" element={<Auth/>}/>
        </Routes>
	);
};

export default AppRouter;