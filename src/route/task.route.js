import Router from "express";

import {
  createTask,

} from "../controllers/task.controllers.js";
import upload from "../middleware/multer.middleware.js";
import authorizedRoles from "../middleware/role.middleware.js";
import verifyJwt from "../middleware/auth.middleware.js";
const router = Router();

// Define routes here

router.route("/post").post(verifyJwt, createTask);
// router.route("/all").get(getAllTask);
// router.route("/single-Task/:id").get(getSingleTaskById);
// router
//   .route("/update-Task/:id")
//   .patch(
//     upload.single("image"),
//     verifyJwt,
//     authorizedRoles("admin"),
//     updateTask
//   );
// router
//   .route("/delete/:id")
//   .delete(verifyJwt, authorizedRoles("admin"), deleteTask);

export default router;
