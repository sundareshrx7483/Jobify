import Job from "../model/jobModel.js";
import "express-async-errors";

import { nanoid } from "nanoid";
let jobs = [
  { id: nanoid(), company: "Apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "backend" },
];

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res
      .status(400)
      .json({ msg: `the job for the id:${id} is not found` });
  }
  res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedJob) {
    return res
      .status(400)
      .json({ msg: `the job for the id:${id} is not found` });
  }

  res.status(200).json({ job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  if (!removedJob) {
    return res
      .status(400)
      .json({ msg: `the job for the id:${id} is not found` });
  }

  res.status(200).json({ job: removedJob });
};
