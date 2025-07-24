import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
import jobRouter from "./routes/jobRouter.js";

const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const port = process.env.PORT || 5100;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/v1/jobs", jobRouter);

app.use("*", (req, res) => {
  res.status(400).json({ msg: "not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong!!!" });
});

app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});
