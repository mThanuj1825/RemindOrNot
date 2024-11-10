const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getUser);
router.patch("/:userId", updateUser);

module.exports = router;
