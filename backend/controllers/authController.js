const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).lean().exec();

    let token = null;

    if (user && (await bcryptjs.compare(password, user.password))) {
      token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      res.status(200).json({
        message: "Login successful",
        token,
        loggedUser: {
          username: user.username,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Error logging in",
      error: err.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    const createdUser = await User.create(newUser);

    res.status(201).json({
      message: "User creation successful",
      user: {
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "Error registering user",
      error: err.message,
    });
  }
};

module.exports = { signup, login };
