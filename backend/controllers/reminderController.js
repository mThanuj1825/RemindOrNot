const User = require("../models/User");
const Reminder = require("../models/Reminder");

const getAllReminders = async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId)
      .lean()
      .populate("reminders", "title dates isCompleted")
      .populate("previousReminders", "title dates isCompleted")
      .exec();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json([...user.reminders, ...user.previousReminders]);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const getReminder = async (req, res) => {
  const userId = req.body.userId;

  try {
    const reminderId = req.params.reminderId;
    const user = await User.findById(userId)
      .lean()
      .populate("reminders")
      .exec();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const reminder = user.reminders.find(
      (reminder) => reminder._id.toString() === reminderId,
    );

    if (!reminder) {
      return res.status(404).json({
        message: "Reminder not found",
      });
    }

    return res.status(200).json(reminder);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const createReminder = async (req, res) => {
  const userId = req.body.userId;

  try {
    const { title, description, dates } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    if (!dates || !Array.isArray(dates)) {
      return res.status(400).json({
        message: "Date/s is/are required",
      });
    }

    let newReminder = { title, dates };

    if (description) {
      newReminder = { ...newReminder, description };
    }

    const createdReminder = await Reminder.create(newReminder);

    await User.findByIdAndUpdate(userId, {
      $push: {
        reminders: createdReminder._id,
      },
    });

    res.status(201).json({
      message: "Reminder created successfully",
      reminder: createdReminder,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const updateReminder = async (req, res) => {
  const userId = req.body.userId;

  try {
    const reminderId = req.params.reminderId;

    const user = await User.findById(userId).lean().exec();

    if (!user || !user.reminders.some((id) => id.toString() === reminderId)) {
      return res.status(403).json({
        message: "Reminder does not belong to user",
      });
    }

    const { title, description, dates } = req.body;

    let newReminder = {};

    if (title) {
      newReminder = { ...newReminder, title };
    }
    if (description) {
      newReminder = { ...newReminder, description };
    }
    if (dates) {
      newReminder = { ...newReminder, dates };
    }

    const updatedReminder = await Reminder.findByIdAndUpdate(
      reminderId,
      newReminder,
      {
        new: true,
      },
    );

    if (!updatedReminder) {
      return res.status(404).json({
        message: "Reminder not found",
      });
    }

    return res.status(200).json({
      message: "Reminder updated successfully",
      updatedReminder,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const deleteReminder = async (req, res) => {
  const userId = req.body.userId;

  try {
    const reminderId = req.params.reminderId;

    const user = await User.findById(userId).lean().exec();

    if (!user || !user.reminders.some((id) => id.toString() === reminderId)) {
      return res.status(403).json({
        message: "Reminder does not belong to user",
      });
    }

    const deletedReminder = await Reminder.findByIdAndDelete(reminderId);

    if (!deletedReminder) {
      return res.status(404).json({
        message: "Reminder not found",
      });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: {
        reminders: reminderId,
      },
    });

    return res.status(200).json({
      message: "Reminder deleted successfully",
      deletedReminder,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
  getAllReminders,
  getReminder,
  createReminder,
  updateReminder,
  deleteReminder,
};
