import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { NotFoundError } from "./errors/customErrors.js";

const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const port = process.env.PORT || 5000;

app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("*", (req, res) => {
  throw new NotFoundError("NOT FOUND!!!");
});

app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server is running on port ${port} `);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

