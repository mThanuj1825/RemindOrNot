const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title can be at most 100 characters long"],
    },
    description: {
      type: String,
      maxlength: [500, "Description can be at most 500 characters long"],
    },
    dates: [
      {
        type: Date,
        required: true,
        validate: {
          validator: (v) => v instanceof Date,
          message: "Each date must be a valid date",
        },
      },
    ],
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports =
  mongoose.models.Reminder || mongoose.model("Reminder", reminderSchema);
