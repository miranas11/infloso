import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config.js";

const validateToken = async (req, res) => {
    const header = req.headers["authorization"];

    const token = header.slice(7);

    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    jwt.verify(token, config.secretKey, (err, user) => {
        if (err) {
            return res
                .status(500)
                .json({ error: "Failed to authenticate token" });
        }

        req.user = user;

        res.status(201).json({ message: "Token Validated" });
    });
};

const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();
        const token = jwt.sign(
            { email: user.email, name: user.username },
            config.secretKey,
            { expiresIn: "1h" }
        );
        res.status(201).json({ userCreated: true, token: token });
    } catch (error) {
        console.error(error.code);
        res.status(500).json({
            userCreated: false,
            message:
                error.code == 11000
                    ? "Duplicate Email or username"
                    : error.message,
        });
    }
};

const validateUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const foundUser = await User.findAndValidate(email, password);

        if (!foundUser) {
            res.status(401).json({ message: "Wrong Credentials" });
        } else {
            const token = jwt.sign(
                { email: foundUser.email, name: foundUser.name },
                config.secretKey,
                { expiresIn: "1h" }
            );
            res.status(200).json({ token });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default { createUser, validateUser, validateToken };
