import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import {
  validateLoginInput,
  validateUserInput,
} from "../middlewares/validationMiddleware.js";

const router = Router();
router.route("/register").post(validateUserInput, register);
router.route("/login").post(validateLoginInput, login);

export default router;
