import { Router } from "express";
import {
  getApplicationStatus,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
import { authorizePermissions } from "../middlewares/authMiddleware.js";
import { ROLE } from "../utils/constants.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get(
  "/admin/app-status",
  authorizePermissions(ROLE.ADMIN),
  getApplicationStatus
);
router.patch("/update-user", validateUpdateUserInput, updateUser);

export default router;