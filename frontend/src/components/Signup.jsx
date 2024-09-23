import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authController from "../controller/authController";
import "../styles/Signup.css"; // Assuming you're using a similar structure for CSS files

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword || !username) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!termsAccepted) {
            setError("You must accept the terms and conditions");
            return;
        }

        const response = await authController.registerUser(
            username,
            email,
            password
        );
        if (response.status === 201) {
            setError("");
            setSuccess("Signup successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else {
            setError(response.data.message);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up for MelodyVerse</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-box-container">
                    <label>UserName</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <div className="input-box-container">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="terms-container">
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={() => setTermsAccepted(!termsAccepted)}
                    />
                    <label>I accept the terms and conditions</label>
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit">Sign Up</button>
            </form>
            <div className="login-link-container">
                <p>Already have an account? </p>
                <a href="/login" className="login-link">
                    Log in here.
                </a>
            </div>
        </div>
    );
};

export default Signup;
