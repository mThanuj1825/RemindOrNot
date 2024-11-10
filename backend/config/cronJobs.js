const cron = require("node-cron");
const Reminder = require("../models/Reminder");
const User = require("../models/User");

cron.schedule("*/5 * * * * *", async () => {
  try {
    const expiredReminders = await Reminder.find({
      dates: { $lt: new Date() },
      isCompleted: false,
    });

    if (expiredReminders.length > 0) {
      for (let reminder of expiredReminders) {
        await User.updateMany(
          { reminders: reminder._id },
          {
            $pull: { reminders: reminder._id },
            $push: { previousReminders: reminder._id },
          },
        );
        await Reminder.findByIdAndUpdate(reminder._id, {
          $set: { isCompleted: true },
        });
        console.log(
          `Moved reminder ${reminder._id} to users' previousReminders.`,
        );
      }

      console.log(
        `${expiredReminders.length} expired reminders moved to users' previousReminders.`,
      );
    }
  } catch (err) {
    console.error("Error handling expired reminders:", err);
  }
});
