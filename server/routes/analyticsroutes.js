import express from "express";

import {
  getDashboardKPIs,
  getVehicleAnalytics,
} from "../controllers/analyticscontroller.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(ROLES.FLEET_MANAGER, ROLES.FINANCIAL_ANALYST),
  getDashboardKPIs
);

router.get(
  "/vehicles",
  authMiddleware,
  roleMiddleware(ROLES.FLEET_MANAGER, ROLES.FINANCIAL_ANALYST),
  getVehicleAnalytics
);

export default router;