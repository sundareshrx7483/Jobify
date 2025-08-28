import { StatusCodes } from "http-status-codes";
import Job from "../model/jobModel.js";
import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get current user" });
};

export const getApplicationStatus = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get application status" });
};
export const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
