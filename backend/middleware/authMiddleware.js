const jwt = require("jsonwebtoken");

const verifyUserAndGetToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authentication token required",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.userId;

    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = { verifyUserAndGetToken };
