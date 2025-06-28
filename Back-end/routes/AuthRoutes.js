const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  sendLoginOtp,
  loginWithOtp,
  sendResetOtp,
  verifyOtpAndResetPassword,
  getAllUsers,
  getProfile,
  updateUser,
  deleteUser,
} = require("../controllers/AuthController");
const { protect } = require("../middlewares/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendLoginOtp);
router.post("/login-with-otp", loginWithOtp);
router.post("/send-reset-otp", sendResetOtp);
router.post("/verify-otp-and-reset-password", verifyOtpAndResetPassword);
router.post("/logout", logoutUser);


// Admin protected routes
router.get("/users", protect, getAllUsers);
router.get("/user", protect, getProfile);
router.put("/user/:id", protect, updateUser);
router.delete("/user/:id", protect, deleteUser);

module.exports = router;
