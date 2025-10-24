import { Router } from "express";
import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/authController";
import { authenticate } from "../middlewares/auth";

const router = Router();

// Register new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Refresh access token
router.post("/refresh", refresh);

// Logout (invalidate refresh token)
router.post("/logout", authenticate, logout);

export default router;
