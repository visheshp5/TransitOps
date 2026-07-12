import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import dns from "dns";


dns.setServers(["8.8.8.8", "8.8.4.4"]);

import tripRoutes from "./routes/tripRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import fuelRoutes from "./routes/fuelRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import analyticsRoutes from "./routes/analyticsroutes.js";

import vehicleRoutes from "./routes/vehicleRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Basic Routes
app.get("/", (req, res) => {
    res.send("🚀 TransitOps Backend Running");
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        service: "TransitOps Backend",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
    });
});

// API Routes
app.use("/api/auth", authRoutes);

// Future Routes

app.use("/api/trips", tripRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/fuel", fuelRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
// app.use("/api/vehicles", vehicleRoutes);
// app.use("/api/drivers", driverRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API Route Not Found",
    });
});

// Error Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});