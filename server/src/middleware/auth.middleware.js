// middleware\auth.middleware.js

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    let token; // Get token from cookies or headers
    if (req.cookies?.token) token = req.cookies.token;
    else if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token == No authorization
    if (!token) return res.status(401).json({ success: false, message: "Not authorized" });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve user from DB (ex. password)
    const user = await User.findById(decoded.id)

    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.log("Protect error: " + error);
    
    return res
      .status(401)
      .json({ success: false, message: "Not authorized"});
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
};
