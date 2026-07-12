import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },

    licenseCategory: {
      type: String,
      default: "",
    },

    licenseExpiry: {
      type: Date,
      required: true,
    },

    contactNumber: {
      type: String,
      default: "",
    },

    safetyScore: {
      type: Number,
      default: 100,
    },

    status: {
      type: String,
      enum: ["Available", "On Trip", "Off Duty", "Suspended"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Driver", driverSchema);