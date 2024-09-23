import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authController from "../controller/authController";
import "../styles/Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const validate = async () => {
            const response = await authController.validateToken();
            if (response.status === 201) navigate("/home");
            return;
        };
        if (token) {
            validate();
        }

        const rememberedUser = localStorage.getItem("rememberedUser");

        if (rememberedUser) {
            const user = JSON.parse(rememberedUser);
            setEmail(user.email);
            setPassword(user.password);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and Password are required");
            return;
        }

        const response = await authController.loginUser(email, password);
        if (response.status === 200) {
            if (rememberMe) {
                localStorage.setItem(
                    "rememberedUser",
                    JSON.stringify({
                        email: email,
                        password: password,
                    })
                );
            }
            navigate("/home");
        } else {
            setError(response.data.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Log in to MelodyVerse</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-box-container">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box-container">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="remember-me-container">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label>Remember Me</label>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Log In</button>
            </form>
            <a href="/forgot-password">Forgot your password?</a>
            <div className="signup-link-container">
                <p>Don't have an account? </p>
                <a href="/signup" className="signup-link">
                    Sign up
                </a>
            </div>
        </div>
    );
};

export default Login;
