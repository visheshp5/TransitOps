import User from "../models/User.js";
import bcrypt from "bcrypt";
import validator from "validator";
import generateToken from "../utils/generateToken.js";
import { ROLES } from "../utils/constants.js";

const userResponse = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
});

export const registerUser = async (req, res) => {
    try {
        const { name, password, role } = req.body;
        const email = req.body.email?.trim().toLowerCase();
        

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        if (!Object.values(ROLES).includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role",
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
            });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: generateToken(user._id, user.role),
            user: userResponse(user),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email?.trim().toLowerCase();

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        res.status(200).json({
            success: true,
            message: `Welcome back, ${user.name}!`,
            token: generateToken(user._id, user.role),
            user: userResponse(user),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProfile = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};