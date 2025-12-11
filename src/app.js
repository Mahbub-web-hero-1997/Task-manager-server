// server.js / app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./route/user.route.js";
import taskRoute from "./route/task.route.js";
import ApiResponse from "./utils/ApiResponse.js";

const app = express();

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manager-client-zeta-five.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman বা direct curl request এর জন্য
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
    credentials: true, // cookie allow করতে
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/task", taskRoute);

// Test route
app.get("/", (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "API is working"));
});

// Global error handler
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ success: false, message: err.message });
  }
  console.error(err.stack);
  res
    .status(500)
    .json({ success: false, message: "Server Error", error: err.message });
});

export default app;
