import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const generateAccessToken = (
  userId: string,
  roles: string[],
  permissions: string[]
) =>
  jwt.sign({ id: userId, roles, permissions }, JWT_SECRET, {
    expiresIn: "15m",
  });

const generateRefreshToken = (userId: string) =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      roles: ["user"],
      permissions: ["read:profile"],
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(
      user._id.toString(),
      user.roles,
      user.permissions
    );
    const refreshToken = generateRefreshToken(user._id.toString());

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ accessToken, roles: user.roles, permissions: user.permissions });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// REFRESH
export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refresh_token;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(401).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken(
      user._id.toString(),
      user.roles,
      user.permissions
    );
    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

// LOGOUT
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refresh_token");
    res.json({ message: "Logged out successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
