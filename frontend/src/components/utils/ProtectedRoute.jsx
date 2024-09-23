import { useNavigate } from "react-router-dom";
import authController from "../../controller/authController";
import Loading from "../utils/Loading";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        const validate = async () => {
            const response = await authController.validateToken();
            console.log(response);
            if (response.status === 500) {
                navigate("/login");
            } else {
                setIsLoading(false);
            }
        };

        validate();
    }, [navigate]);

    return isLoading ? <Loading /> : children;
};

export default ProtectedRoute;
