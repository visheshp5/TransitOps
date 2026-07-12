import express from "express";
import {
    registerUser,
    loginUser,
    getProfile,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

// routes/authRoutes.js
import { ROLES } from "../utils/constants.js";

const router = express.Router();



router.get("/roles", (req, res) => {
    res.json({
        success: true,
        roles: Object.values(ROLES),
    });
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

router.get("/verify", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        authenticated: true,
        user: req.user,
    });
});

export default router;