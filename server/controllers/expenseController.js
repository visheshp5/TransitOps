import Expense from "../models/Expense.js";
import Vehicle from "../models/vehicle.js";

export const createExpense = async (req, res) => {
  try {
    const { vehicle: vehicleId, trip, type, amount, description, date } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (
      amount == null ||
      amount <= 0 ||
      !type
    ) {
      return res.status(400).json({
          success: false,
         message: "Invalid expense details"
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

export const getExpenses = async (req, res) => {
  try {
    // Get filters from query parameters
    const {
      vehicle,
      trip,
      type,
      startDate,
      endDate,
    } = req.query;

    // Create empty filter object
    const filter = {};

    // Filter by vehicle
    if (vehicle) {
      filter.vehicle = vehicle;
    }

    // Filter by trip
    if (trip) {
      filter.trip = trip;
    }

    // Filter by expense type
    if (type) {
      filter.type = type;
    }

    // Filter by date range
    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }

      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    // Fetch expenses using filters
    const expenses = await Expense.find(filter)
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