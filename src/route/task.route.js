import Router from "express";

import {
  createTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../controllers/task.controllers.js";
// import upload from "../middleware/multer.middleware.js";
import verifyJwt from "../middleware/auth.middleware.js";

const router = Router();

// Define routes here

router.route("/post").post(verifyJwt, createTask);
router.route("/all").get(verifyJwt, getAllTask);
router.route("/single/:id").get(getSingleTask);
router.route("/update/:id").patch(verifyJwt, updateTask);
router.route("/delete/:id").delete(verifyJwt, deleteTask);
router.route("/status/:id").patch(verifyJwt, updateTaskStatus);

export default router;
