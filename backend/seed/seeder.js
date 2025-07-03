import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Project from "../models/projectModel.js";
import Task from "../models/taskModel.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();

    // Create a user
    const hashedPassword = await bcrypt.hash("Test@123", 10);
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
    });

    console.log("User created:", user.email);

    // Create two projects
    const project1 = await Project.create({
      title: "Project One",
      description: "First dummy project",
      status: "active",
      user: user._id,
    });

    const project2 = await Project.create({
      title: "Project Two",
      description: "Second dummy project",
      status: "active",
      user: user._id,
    });

    console.log("Projects created");

    // Create tasks for each project
    const tasks = [];

    for (const project of [project1, project2]) {
      for (let i = 1; i <= 3; i++) {
        const task = {
          title: `Task ${i} for ${project.title}`,
          description: `This is task ${i} of ${project.title}`,
          status: i === 1 ? "todo" : i === 2 ? "in-progress" : "done",
          dueDate: new Date(),
          project: project._id,
        };
        tasks.push(task);
      }
    }

    await Task.insertMany(tasks);

    console.log("Tasks created");
    console.log("Database seeded successfully ✅");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
