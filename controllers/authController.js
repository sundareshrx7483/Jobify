import { StatusCodes } from "http-status-codes";
import User from "../model/userModel.js";
import { ROLE } from "../utils/constants.js";
import { comparePassword, hashPassword } from "../utils/hashedPasswordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? ROLE.ADMIN : ROLE.USER;
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created successfully!!!" });
};
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValidUser = user && comparePassword(req.body.password, user.password);
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials!!!");
  res.status(200).json({ msg: "user logged in successfully!!!" });
};
