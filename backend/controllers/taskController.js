import Task from "../models/taskModel.js";
import Project from "../models/projectModel.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, projectId } = req.body;

    // Verify project belongs to user
    const project = await Project.findOne({
      _id: projectId,
      user: req.user._id,
    });
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      project: projectId,
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Tasks by Project
export const getTasksByProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user._id,
    });
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const tasks = await Task.find({ project: project._id });

    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("project");

    if (!task || task.project.user.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const { title, description, status, dueDate } = req.body;

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;

    const updatedTask = await task.save();

    res.json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("project");

    if (!task || task.project.user.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    await task.remove();

    res.json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Filter Tasks by Status
export const getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    const tasks = await Task.find({ status }).populate({
      path: "project",
      match: { user: req.user._id },
    });

    // Filter out tasks not belonging to the user
    const userTasks = tasks.filter((task) => task.project !== null);

    res.json({ success: true, tasks: userTasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
