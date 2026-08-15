import { axiosInstance } from "../../../utils/axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../context/hooks";
import { AxiosError } from "axios";
const useAuth = () => {
	const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const dispatch = useAppDispatch();

    const handleRegister = async(data) =>{
        try {
            const response = await axiosInstance.post("/auth/register", {
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                phoneNumber: data.phoneNumber
            });
            const res = await response.data;
            return res;
        }catch(error){
            if(error instanceof AxiosError){
                console.log(error.response?.data.message);
            }
        }
    }
};
