import express from "express";
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
  getTasksByStatus,
  getTaskById,
} from "../controllers/taskController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected Routes
router.route("/").post(protect, createTask);
router.route("/project/:projectId").get(protect, getTasksByProject);
router.route("/status").get(protect, getTasksByStatus);
router.route("/:id").get(protect, getTaskById).put(protect, updateTask).delete(protect, deleteTask);

export default router;
