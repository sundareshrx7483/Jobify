import { StatusCodes } from "http-status-codes";
import User from "../model/userModel.js";
import { ROLE } from "../utils/constants.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? ROLE.ADMIN : ROLE.USER;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};
export const login = async (req, res) => {
  res.send("login");
};
