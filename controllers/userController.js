import { StatusCodes } from "http-status-codes";
import Job from "../model/jobModel.js";
import User from "../model/userModel.js";
import cloudinary from "../utils/cloudinary.js";
import formatImage from "../utils/formatImage.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    // Using memory storage: convert to Data URI and upload to Cloudinary
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const prevUser = await User.findById(req.user.userId);
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser, {
    new: true,
    runValidators: true,
  });

  // If a new file was uploaded and user had an old avatar, destroy old one
  if (req.file && prevUser?.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(prevUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ user: updatedUser.toJSON() });
};
