import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE, ROLE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../model/jobModel.js";
import User from "../model/userModel.js";
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access this route");
        }

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid job status"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid job type"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new Error("invalid mongodb id");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job for id:${value}`);
    const isAdmin = req.user.role === ROLE.ADMIN;
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("not authorized to access this route");
  }),
]);

export const validateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email aldready exists!!!");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("the password should be atleast 8 characters"),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
]);

export const validateLoginInput = withValidationErrors([
  body("email").notEmpty().withMessage("email is required"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").custom((value, { req }) => {
    if (req.file) return true; // allow avatar-only updates
    if (!value) throw new Error("name is required");
    return true;
  }),
  body("email").custom(async (email, { req }) => {
    if (req.file && !email) return true; // allow avatar-only updates
    if (!email) throw new Error("email is required");
    const user = await User.findOne({ email });
    if (user && user._id.toString() !== req.user.userId) {
      throw new BadRequestError("email has been taken!!!");
    }
  }),
  body("location").custom((value, { req }) => {
    if (req.file) return true;
    if (!value) throw new Error("location is required");
    return true;
  }),
  body("lastName").custom((value, { req }) => {
    if (req.file) return true;
    if (!value) throw new Error("last name is required");
    return true;
  }),
]);
