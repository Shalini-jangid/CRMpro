const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  adminLogin,
  sendLoginOtp,
  loginWithOtp,
  sendResetOtp,
  verifyOtpAndResetPassword,
  getAllUsers,
  getProfile,
  updateUser,
  deleteUser,
} = require("../controllers/authController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendLoginOtp);
router.post("/login-with-otp", loginWithOtp);
router.post("/send-reset-otp", sendResetOtp);
router.post("/verify-otp-and-reset-password", verifyOtpAndResetPassword);
router.post("/logout", logoutUser);
router.post("/admin/login", adminLogin);

// Admin protected routes
router.get("/users", protect, isAdmin, getAllUsers);
router.get("/user", protect, getProfile);
router.put("/user/:id", protect, isAdmin, updateUser);
router.delete("/user/:id", protect, isAdmin, deleteUser);

module.exports = router;
