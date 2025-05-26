import Task from "../models/task.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
// Create A Task
const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    throw new ApiError(400, "Title is required");
  }
  const existingTask = await Task.findOne({ title });
  if (existingTask) {
    throw new ApiError(400, "This task already exists");
  }
  const task = await Task.create({
    title,
    description,
  });
  res.status(200).json(new ApiResponse(200, task, "Task created successfully"));
});

// Get All Task

export { createTask };
