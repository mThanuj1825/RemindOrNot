const User = require("../models/User");

const getAllUsers = async (_, res) => {
  try {
    const users = await User.find().select(
      "-password -createdAt -updatedAt -__v",
    );

    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select(
      "-password -createdAt -updatedAt -__v",
    );

    if (user === null) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email } = req.body;

    let updatedUser = {};

    if (username) {
      updatedUser = { ...updatedUser, username };
    }
    if (email) {
      updatedUser = { ...updatedUser, email };
    }

    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = { getAllUsers, getUser, updateUser };
