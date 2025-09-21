import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import cloudinary from "./utils/cloudinary.js";

const app = express();

// Trust proxy - MUST be first
app.set("trust proxy", 1);

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Security
app.use(helmet());
app.use(mongoSanitize());

// CORS - MUST be before other middlewares
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://jobify-jln2.vercel.app",
      "https://jobify-jln2-1cj7bmncn-sundareshrx7483s-projects.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ];

    // Allow requests with no origin (mobile apps, Postman, etc)
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      origin.includes("vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));

// Body parsing and cookies
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 5000;

// Routes
app.get("/", (req, res) => {
  res.json({ msg: "Jobify API Running!" });
});

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route working!" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// Error handler
app.use(errorHandlerMiddleware);

// Start server
try {
  await mongoose.connect(process.env.MONGO_URL);
  cloudinary.v2.config();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
