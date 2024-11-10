const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const reminderRoutes = require("./routes/reminderRoutes");

const { connectDB } = require("./config/db");

const cronJobs = require("./config/cronJobs");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

const PORT = process.env.PORT || 3333;

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("Missing required environment variables");
  process.exit(1);
}

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reminders", reminderRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing server...");
  server.close(() => {
    console.log("Server closed.");
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
