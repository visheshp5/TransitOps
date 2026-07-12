const express = require("express");

const {
  createExpense,
  getExpenses,
} = require("../controllers/expenseController.js");

const authMiddleware = require("../middleware/authMiddleware.js");
const roleMiddleware = require("../middleware/roleMiddleware.js");
const { ROLES } = require("../utils/constants.js");

const router = express.Router();

// Authenticated users can view expenses
router.get(
  "/",
  authMiddleware,
  getExpenses
);

// Financial Analyst can create expenses
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.FINANCIAL_ANALYST),
  createExpense
);

module.exports = router;