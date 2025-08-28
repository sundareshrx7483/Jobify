import { Router } from "express";
import {
  getApplicationStatus,
  getCurrentUser,
  updateUser,
} from "../controllers/userController";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-status", getApplicationStatus);
router.patch("/update-user", updateUser);
