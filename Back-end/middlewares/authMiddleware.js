const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/AuthModel");

// Middleware to protect routes (using cookies)
const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token not found in cookies");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Simulate admin user for fixed login
    if (decoded.id === "admin-id") {
      req.user = { _id: "admin-id", role: "admin", firstName: "Admin" };
    } else {
      req.user = await User.findById(decoded.id).select("-password");
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token verification failed");
  }
});

// Middleware to check admin role
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as admin");
  }
};

module.exports = { protect, isAdmin };
