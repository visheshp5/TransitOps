const Expense = require("../models/Expense");
const Vehicle = require("../models/Vehicle");

exports.createExpense = async (req, res) => {
  try {
    const { vehicle: vehicleId, trip, type, amount, description, date } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    const expense = await Expense.create({
      vehicle: vehicleId,
      trip: trip || null,
      type,
      amount,
      description,
      date: date || new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: expense,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate("vehicle")
      .populate("trip")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};