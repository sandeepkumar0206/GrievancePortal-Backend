import express from "express";
import { verifyToken } from "../Middleware/authMiddleware.js";
import { getProfile, loginUser, registerUser, updateProfile } from "../Controller/authController.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", verifyToken, getProfile);

router.put("/profile", verifyToken, updateProfile);

export default router;
