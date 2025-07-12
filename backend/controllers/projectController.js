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
    const { page = 1, limit = 5, search = '',status } = req.query;

    const query = {
      user: req.user._id,
      title: { $regex: search, $options: 'i' }, // case-insensitive search
    };
    if (status) {
      query.status = status;
    }
    const total = await Project.countDocuments(query);

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.json({
      success: true,
      projects,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch projects' });
  }
};

//get project by id
export const getProjectById = async (req, res) => {
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

    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
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

    await project.deleteOne();

    res.json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Server error" });
  }
};
