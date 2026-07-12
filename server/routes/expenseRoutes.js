import express from "express";

import {
  createExpense,
  getExpenses,
} from "../controllers/expenseController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

// Authenticated users can view expenses
router.get("/", authMiddleware, getExpenses);

// Financial Analyst can create expenses
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.FINANCIAL_ANALYST),
  createExpense
);

export default router;