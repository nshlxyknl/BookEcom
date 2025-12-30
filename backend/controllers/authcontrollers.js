const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * Authentication Controller
 * Handles user registration, login, and profile management
 */

/**
 * Register a new user
 * @route POST /api/auth/register
 * @public - Anyone can access this route
 */
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Security: Check for duplicate usernames
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        message: "Username already exists",
        suggestion: "Please choose a different username",
      });
    }

    // Create user - password will be hashed by mongoose pre-save hook
    const user = await User.create({ username, password, role });

    // Generate JWT token for immediate login
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

/**
 * Authenticate user and get token
 * @route POST /api/auth/login
 * @public - Anyone can access this route
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user by username
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

    // Verify password using the comparePassword method from User model
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

    // Generate JWT token on successful login
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

/**
 * Get all users in the system
 * @route GET /api/auth/users
 * @private - Only admins can access this route
 */
exports.getUsers = async (req, res) => {
  try {
    // Find all users but exclude password field
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

/**
 * Get current user's profile
 * @route GET /api/auth/me
 * @private - Authenticated users only
 */
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






