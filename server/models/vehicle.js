import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },

    vehicleName: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "Van",
    },

    maxLoadCapacity: {
      type: Number,
      required: true,
    },

    odometer: {
      type: Number,
      default: 0,
    },

    acquisitionCost: {
      type: Number,
      default: 0,
    },

    region: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Available", "On Trip", "In Shop", "Retired"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", vehicleSchema);