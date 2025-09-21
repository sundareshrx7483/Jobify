import Job from "../model/jobModel.js";
import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

// Build query filters and sorting based on request params
const buildQuery = (req) => {
  const { search, jobStatus, jobType } = req.query;
  const queryObject = { createdBy: req.user.userId };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { jobLocation: { $regex: search, $options: "i" } },
    ];
  }
  if (jobStatus && jobStatus !== "all") queryObject.jobStatus = jobStatus;
  if (jobType && jobType !== "all") queryObject.jobType = jobType;

  return queryObject;
};

const buildSort = (sort) => {
  switch (sort) {
    case "oldest":
      return "createdAt";
    case "a-z":
      return "position";
    case "z-a":
      return "-position";
    case "newest":
    default:
      return "-createdAt";
  }
};

export const getAllJobs = async (req, res) => {
  const queryObject = buildQuery(req);
  const sortOption = buildSort(req.query.sort);

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobsQuery = Job.find(queryObject)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
  const [jobs, totalJobs] = await Promise.all([
    jobsQuery,
    Job.countDocuments(queryObject),
  ]);

  const numOfPages = Math.ceil(totalJobs / limit) || 1;

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages, page });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ job: removedJob });
};

// Stats endpoints
export const showStats = async (req, res) => {
  const stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  const defaultStats = {
    pending: 0,
    interview: 0,
    declined: 0,
  };

  stats.forEach((s) => {
    defaultStats[s._id] = s.count;
  });

  // monthly applications (last 6 months)
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = `${year}-${String(month).padStart(2, "0")}`;
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
