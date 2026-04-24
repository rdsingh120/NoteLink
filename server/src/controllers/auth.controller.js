// src/controllers/auth.controller.js

import cookieOptions from "../utils/cookieOptions.js";
import sendTokenResponse from "../utils/sendTokenResponse.js"
import serverErrorResponse from "../utils/serverErrorResponse.js"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const normalizeEmail = (email) => email.toLowerCase().trim();
const normalizeName = (name) => name.trim();
const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const nameNormalized = normalizeName(name);
  const emailNormalized = normalizeEmail(email);

  if (!isValidEmail(emailNormalized)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ success: false, message: "Password must be at least 6 characters" });
  }

  try {
    // Checks if user already exists
    const existingUser = await User.findOne({ email: emailNormalized });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // User gets created
    const user = await User.create({ name: nameNormalized, email: emailNormalized, password });

    return sendTokenResponse(user, 201, res, "User registered successfully");
  } catch (error) {
    return serverErrorResponse("Register", error, res);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const emailNormalized = normalizeEmail(email);

  if (!isValidEmail(emailNormalized)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  try {
    // Checks if user already exists
    const existingUser = await User.findOne({ email: emailNormalized }).select("+password");
    if (!existingUser) {
      return res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
    // Password check
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid Credentials" });
    }

    return sendTokenResponse(existingUser, 200, res, "User logged in successfully");
  } catch (error) {
    return serverErrorResponse("Login", error, res);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: cookieOptions.path,
  });

  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

export const getMe = (req, res) =>
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
