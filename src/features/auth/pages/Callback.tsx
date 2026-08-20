import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import appToast from "../../../components/toast";


const Callback: React.FC = () => {
    const { handleGenAccessToken } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        try{
            handleGenAccessToken()
            navigate("/", { replace: true });
        } catch (error) {

            appToast.error("Login Failed", "Please try again");
            console.error("Login Failed", error)
            navigate("/auth", { replace: true });
        }
    }, [handleGenAccessToken, navigate]);
};

export default Callback;