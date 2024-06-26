import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        const response = await axios.get("/refresh", {
            withCredentials: true,
        });
        setAuth((prev) => {
            const updatedAuth = {
                ...prev,
                userId: response.data.id,
                name: response.data.name,
                firstName: response.data.firstName,
                role: response.data.role,
                email: response.data.email,
                accessToken: response.data.token,
            };
            return updatedAuth;
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
