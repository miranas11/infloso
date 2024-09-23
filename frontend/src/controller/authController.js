import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import config from "../config";

const API_URL = config.API_URL;

const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signUp`, {
            username,
            email,
            password,
        });
        localStorage.setItem("token", response.data.token);
        const decodedToken = jwtDecode(response.data.token);
        Cookies.set("UserData", JSON.stringify(decodedToken), { expires: 1 });
        return response;
    } catch (error) {
        console.log("Error registering User:", error.response.data);
        return error.response;
    }
};

const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
        });
        localStorage.setItem("token", response.data.token);
        const decodedToken = jwtDecode(response.data.token);
        Cookies.set("UserData", JSON.stringify(decodedToken), { expires: 1 });
        return response;
    } catch (error) {
        return error.response;
    }
};

const validateToken = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/auth/validateToken`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export default {
    registerUser,
    loginUser,
    validateToken,
};
