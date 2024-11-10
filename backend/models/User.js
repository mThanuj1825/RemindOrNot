const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [50, "Username can be at most 50 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    reminders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reminder",
      },
    ],
    previousReminders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reminder",
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
