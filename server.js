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

app.get("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res
      .status(400)
      .json({ msg: `the job for the id:${id} is not found` });
  }
  res.status(200).json({ job });
});

app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "please provide company & position" });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ job });
});

app.patch("/api/v1/jobs/:id", (req, res) => {
  const { company, position } = req.body;
  if ((!company, !position)) {
    return res.status(400).json({ msg: "please provide company & position" });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res
      .status(400)
      .json({ msg: `the job for the id:${id} is not found` });
  }
  job.company = company;
  job.position = position;
  res.status(200).json({ job });
});
app.delete("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res
      .status(400)
      .json({ msg: `the job for the id:${id} is not found` });
  }

  const newJobs = jobs.filter((job) => job.id === id);
  jobs = newJobs;
  res.status(200).json("Job Deleted");
});




app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});
