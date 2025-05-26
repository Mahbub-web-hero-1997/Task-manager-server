import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/User.controller.js";

const router = new Router();

router.route("/register").post(registerUser);
router.route("/login").get(loginUser);

export default router;
