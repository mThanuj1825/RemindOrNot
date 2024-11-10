const express = require("express");
const {
  getAllReminders,
  getReminder,
  createReminder,
  updateReminder,
  deleteReminder,
} = require("../controllers/reminderController");
const { verifyUserAndGetToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(verifyUserAndGetToken);

router.get("/", getAllReminders);
router.get("/:reminderId", getReminder);
router.post("/", createReminder);
router.patch("/:reminderId", updateReminder);
router.delete("/:reminderId", deleteReminder);

module.exports = router;
