import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    vehicleName: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Truck', 'Van', 'Mini Truck', 'Pickup', 'Container'],
      required: true,
    },
    maxLoadCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    odometer: {
      type: Number,
      default: 0,
      min: 0,
    },
    acquisitionCost: {
      type: Number,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Available', 'On Trip', 'In Shop', 'Retired'],
      default: 'Available',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Vehicle', vehicleSchema);
