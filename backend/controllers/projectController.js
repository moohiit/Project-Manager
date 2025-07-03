import Project from "../models/projectModel.js";

// Create Project
export const createProject = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const project = await Project.create({
      title,
      description,
      status,
      user: req.user._id,
    });

    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Projects (User-Specific) with Pagination and Search
export const getUserProjects = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const keyword = req.query.search
      ? { title: { $regex: req.query.search, $options: 'i' } }
      : {};

    const total = await Project.countDocuments({
      ...keyword,
      user: req.user._id,
    });

    const projects = await Project.find({
      ...keyword,
      user: req.user._id,
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      projects,
      page,
      totalPages: Math.ceil(total / limit),
      totalProjects: total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Update Project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const { title, description, status } = req.body;

    project.title = title || project.title;
    project.description = description || project.description;
    project.status = status || project.status;

    const updatedProject = await project.save();

    res.json({ success: true, project: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    await project.remove();

    res.json({ success: true, message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
