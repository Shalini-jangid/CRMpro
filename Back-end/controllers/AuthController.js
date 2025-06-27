const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/AuthModel");
const sendOtp = require("../utils/sendOtp");

// Generate JWT
const generateToken = (id, role = "user") => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// Calculate remaining trial time
const calculateRemainingTime = (endDate) => {
  const now = new Date();
  const diff = new Date(endDate) - now;
  const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return daysLeft > 0 ? `${daysLeft} day(s)` : "Expired";
};





// Register User
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName, lastName, email, phone, company,
    jobTitle, companySize, industry, password, confirmPassword,
  } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const trialStart = new Date();
  const trialEnd = new Date(trialStart.getTime() + 5 * 24 * 60 * 60 * 1000);

  const user = await User.create({
    firstName, lastName, email, phone, company,
    jobTitle, companySize, industry,
    password: hashedPassword,
    trialPeriodStart: trialStart,
    trialPeriodEnd: trialEnd,
    remainingTime: calculateRemainingTime(trialEnd),
  });

  const token = generateToken(user._id);

  res.status(201).cookie("token", token, cookieOptions).json({
    _id: user._id,
    firstName: user.firstName,
    email: user.email,
    remainingTime: user.remainingTime,
  });
});

// Login with Email + Password
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  if (user.trialPeriodEnd && new Date() > user.trialPeriodEnd) {
    user.remainingTime = "Expired";
    await user.save();
    return res.status(403).json({ message: "Trial expired. Please upgrade." });
  }

  user.remainingTime = calculateRemainingTime(user.trialPeriodEnd);
  await user.save();

  const token = generateToken(user._id);

  res.cookie("token", token, cookieOptions).json({
    _id: user._id,
    firstName: user.firstName,
    email: user.email,
    remainingTime: user.remainingTime,
  });
});

// Send OTP for Login
const sendLoginOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Generate and hash OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  // Save to user
  user.otp = hashedOtp;
  user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
  await user.save();

  // Send OTP email
  await sendOtp({
    to: email,
    subject: "Your CRM Login OTP",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  });

  res.status(200).json({ message: "OTP sent successfully" });
});

// Login using OTP
const loginWithOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  // console.log("OTP login request:", req.body); // ✅ log request data

  const user = await User.findOne({ email });

  if (!user) {
    console.error("User not found");
    throw new Error("Invalid request");
  }
  if (!user.otp) {
    console.error("OTP not set for user");
    throw new Error("Invalid request");
  }
  if (!user.otpExpiry) {
    console.error("OTP expiry not set for user");
    throw new Error("Invalid request");
  }

  const isMatch = await bcrypt.compare(otp, user.otp);
  if (!isMatch || new Date() > user.otpExpiry) {
    console.error("OTP mismatch or expired");
    throw new Error("Invalid or expired OTP");
  }

  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  const token = generateToken(user._id);

  res.cookie("token", token, cookieOptions).json({
    _id: user._id,
    firstName: user.firstName,
    email: user.email,
    message: "Login successful",
  });
});


// Send OTP for Password Reset
const sendResetOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const otp = generateOTP();
  const hashedOtp = await bcrypt.hash(otp, 10);

  user.otp = hashedOtp;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendOtp({
    to: email,
    subject: "Reset Password OTP",
    text: `Your OTP for password reset is ${otp}. It expires in 10 minutes.`,
  });

  res.status(200).json({ message: "Reset OTP sent" });
});

// Verify OTP and Reset Password
const verifyOtpAndResetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.otp || !user.otpExpiry) {
    res.status(400);
    throw new Error("OTP verification failed");
  }

  const isMatch = await bcrypt.compare(otp, user.otp);
  if (!isMatch || new Date() > user.otpExpiry) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }


  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
});

// Logout
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", cookieOptions).status(200).json({ message: "Logged out" });
});

// Get All Users (Admin)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get Profile
const getProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    _id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    phone: req.user.phone,
    company: req.user.company,
    jobTitle: req.user.jobTitle,
    companySize: req.user.companySize,
    industry: req.user.industry,
    trialPeriodStart: req.user.trialPeriodStart,
    trialPeriodEnd: req.user.trialPeriodEnd,
    remainingTime: req.user.remainingTime,
    joinDate: req.user.createdAt,          // ✅ Added join date
    lastLogin: req.user.lastLogin || null, // ✅ Added last login
  });
});


// Update User
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
  res.json(updatedUser);
});

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: "User deleted successfully" });
});

module.exports = {

  registerUser,
  loginUser,
  sendLoginOtp,
  loginWithOtp,
  sendResetOtp,
  verifyOtpAndResetPassword,
  logoutUser,
  getAllUsers,
  getProfile,
  updateUser,
  deleteUser,
};
