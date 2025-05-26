import Task from "../models/task.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
// Create A Task
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;
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
    status,
    user: req.user._id,
  });
  res.status(200).json(new ApiResponse(200, task, "Task created successfully"));
});

// Get All task

const getAllTask = asyncHandler(async (req, res) => {
  const task = await Task.find({ user: req.user._id });
  if (!task || !task.length) return "No task available";
  res.status(200).json(new ApiResponse(200, task, "All task fetched"));
});

// Get Single Task by id

const getSingleTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, "task not found");
  }

  res.status(200).json(new ApiResponse(200, task, "task fetched successfully"));
});

// Update Task
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  // Find the existing task
  let task = await Task.findById(id);
  if (!task) {
    throw new ApiError(404, "task not found");
  }
  // Update the task
  task = await Task.findByIdAndUpdate(
    id,
    {
      title: title || task.title,
      description: description || task.description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(new ApiResponse(200, task, "task updated successfully"));
});
// Delete Task
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    throw new ApiError(404, "task not found");
  }
  res.status(200).json(new ApiResponse(200, null, "task deleted successfully"));
});

// update Task Status
const updateTaskStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["pending", "completed"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }
  const task = await Task.findByIdAndUpdate({ _id: id, user: req.user._id });
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  task.status = status;
  task.updatedAt = Date.now();
  await task.save();
  res.status(200).json(new ApiResponse(200, task, "Task status updated"));
});
export {
  createTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
