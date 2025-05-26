import { Router } from "express";
import { registerUser } from "../Controllers/User.controller.js";

const router = new Router();

router.route("/register").post(registerUser);

export default router;
