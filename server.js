import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { nanoid } from "nanoid";

dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

let jobs = [
  { id: nanoid(), company: "Apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "backend" },
];

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});




app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});
