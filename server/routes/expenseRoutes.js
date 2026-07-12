const express = require("express");

const {
  createExpense,
  getExpenses,
} = require("../controllers/expenseController");

const router = express.Router();

router.get("/", getExpenses);
router.post("/", createExpense);

module.exports = router;