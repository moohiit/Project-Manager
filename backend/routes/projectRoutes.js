import express from "express";
import {
  createProject,
  getUserProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected Routes
router.route("/").post(protect, createProject).get(protect, getUserProjects);
router.route("/:id").put(protect, updateProject).delete(protect, deleteProject);

export default router;
