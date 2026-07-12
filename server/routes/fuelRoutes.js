import express from "express";

import {
  createFuelLog,
  getFuelLogs,
} from "../controllers/fuelController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

// Authenticated users can view
router.get("/", authMiddleware, getFuelLogs);

// Financial Analyst can manually add fuel logs
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.FINANCIAL_ANALYST),
  createFuelLog
);

export default router;