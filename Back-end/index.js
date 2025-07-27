const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const connectDB = require("./utils/ConnectDB");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthRoutes = require("./routes/AuthRoutes");
const FeedbackRoutes = require("./routes/FeedbackRoutes");
const PipelineRoutes = require("./routes/pipelineRoutes");
const TeamRoutes = require("./routes/teamRoutes");

// Connect to DB
connectDB();

// CORS setup
const allowedOrigins = [ 
  "https://cr-mpro.vercel.app" 
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/AuthRoutes"));
app.use("/api/feedback", require("./routes/FeedbackRoutes"));
app.use("/api/pipeline", require("./routes/pipelineRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log("Server started on port", port);
});
