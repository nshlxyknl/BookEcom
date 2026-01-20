const User = require("../models/User");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        message: "Username already exists",
        suggestion: "Please choose a different username",
      });
    }

    const user = await User.create({ username, password, role });

    const token = jwt.sign(
      { userId: user.id , role: user.role},
      process.env.JWT_SECRET,
      { expiresIn: "1000h" }
    );

    res.status(201).json({ token, 
      user: {
        id: user.id,
        username,
        role: user.role,
      },
      message: "Registration successful",
       });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "no user",
        suggestions: [
          "Check if username is spelled correctly",
          "Make sure you have registered first",
        ],
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "password mismatch",
        suggestions: [
          "Check if password is correct",
          "Reset your password if you've forgotten it",
        ],
      });
    }

    const token = jwt.sign(
      { userId: user.id, role:user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1000h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username,
        role: user.role,
      },
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      details: error.message,
      suggestions: [
        "Try again in a few minutes",
        "Contact support if the problem persists",
      ],
    });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");

    res.json({
      users,
      count: users.length,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch users",
      details: error.message,
    });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({ 
      user,
      message: "Profile retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch profile",
      details: error.message,
    });
  }
};






