import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ApiResponse from "./Utils/ApiResponse.js";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.static("./public/"));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// import router
import userRouter from "./Routes/user.routes.js";

// define routes
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).json(new ApiResponse(200, "Welcome to Daily Lens API"));
});
export default app;
