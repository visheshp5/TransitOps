import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import tripRoutes from "./routes/tripRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import fuelRoutes from "./routes/fuelRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import analyticsRoutes from "./routes/analyticsroutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/trips", tripRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/fuel", fuelRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Test server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });