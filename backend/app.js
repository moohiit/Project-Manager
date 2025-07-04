import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes  from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from 'cookie-parser';


const app = express();

const corsOptions = {
  origin: [
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://172.16.1.2:5173'
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);


// Error Handler
app.use(errorHandler);

export default app;
