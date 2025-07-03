import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes  from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);


// Error Handler
app.use(errorHandler);

export default app;
