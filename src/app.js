import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
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

export default app;
