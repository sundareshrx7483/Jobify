import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { NotFoundError } from "./errors/customErrors.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import cloudinary from "./utils/cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// security middleware
app.set("trust proxy", 1);
app.use(express.static(path.join(__dirname, "dist")));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(helmet());
app.use(mongoSanitize());

// CORS configuration
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // allow cookies
  })
);

app.use(cookieParser());
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);
app.use("*", (req, res) => {
  throw new NotFoundError("NOT FOUND!!!");
});

app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.MONGO_URL);
  // Ensure cloudinary config is loaded by importing the module
  cloudinary.v2.config();
  app.listen(port, () => {
    console.log(`server is running on port ${port} `);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
