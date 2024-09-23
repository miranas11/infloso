import express from "express";
import authController from "../controller/authController.js";

const router = express.Router();

router.post("/signUp", authController.createUser);

router.post("/login", authController.validateUser);

router.get("/validateToken", authController.validateToken);

export default router;
