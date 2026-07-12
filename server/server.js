import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

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