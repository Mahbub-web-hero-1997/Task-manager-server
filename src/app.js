import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  express.json({
    extended: true,
    limit: "16kb",
  })
);
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cosmic-frangipane-73525a.netlify.app",
    ],
    credentials: true,
    sameSite: "None",
  })
);
app.use(express.static("./public/temp"));
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(
  cookieParser({
    secure: false,
    httpOnly: true,
  })
);
// Import All routes

import userRoute from "./route/user.route.js";
import taskRoute from "./route/task.route.js";
import ApiResponse from "./utils/ApiResponse.js";
app.use("/api/v1/user", userRoute);
app.use("/api/v1/task", taskRoute);
// https://daily-lens-server.vercel.app/api/v1/news/post
app.get("/", (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "Welcome to Daily Lens API"));
});
export default app;
