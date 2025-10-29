import express from "express";
import { protect, adminOrGovOnly } from "../middleware/authMiddleware.js";
import { getAllUsersForAdmin, loginUser, registerUser } from "../Controller/authController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", protect, adminOrGovOnly, getAllUsersForAdmin);
router.get("/",(req,res)=>{
  res.send("API is running...");
})
export default router;
