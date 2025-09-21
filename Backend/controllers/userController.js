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
  try {
    const newUser = { ...req.body };
    delete newUser.password;

    // Remove undefined or string "undefined" values to avoid overwriting
    ["name", "lastName", "email", "location"].forEach((k) => {
      if (newUser[k] === undefined || newUser[k] === "undefined")
        delete newUser[k];
    });

    // Fetch previous user for cleanup if needed
    const prevUser = await User.findById(req.user.userId);

    // Only attempt upload if a real image file is present
    if (
      req.file &&
      req.file.buffer &&
      req.file.mimetype?.startsWith("image/")
    ) {
      try {
        const file = formatImage(req.file); // buffer -> data URI
        const response = await cloudinary.v2.uploader.upload(file, {
          folder: "jobify/avatars",
        });
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;

        // Best-effort cleanup of old avatar
        if (prevUser?.avatarPublicId) {
          try {
            await cloudinary.v2.uploader.destroy(prevUser.avatarPublicId);
          } catch (e) {
            // Don't fail request on cleanup
            console.warn("Cloudinary destroy failed:", e?.message || e);
          }
        }
      } catch (e) {
        console.error("Cloudinary upload error:", e);
        const cloudMsg =
          e?.message || e?.error?.message || "Image upload failed";
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: cloudMsg });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser, {
      new: true,
      runValidators: true,
    });

    return res.status(StatusCodes.OK).json({ user: updatedUser.toJSON() });
  } catch (err) {
    // Fallback explicit response so client doesn't see generic message
    const message = err?.message || "Failed to update profile";
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: message });
  }
};
