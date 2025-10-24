import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middlewares/errorHandler";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

export default app;
