const jwt = require("jsonwebtoken");



const auth = (req, res, next) => {
  try {
   
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
        details:
          "You need to be logged in to do this. Please log in and try again.",
        suggestions: [
          "Check if you're logged in",
          "Try logging out and back in",
          "Ensure your session hasn't expired",
        ],
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    req.user = decoded;

    next();
  } catch (error) {
    let errorMessage = "Authentication failed";
    let errorDetails =
      "Your login session has expired or is invalid. Please log in again.";
    let suggestions = ["Log in again", "Check your connection"];

    if (error.name === "TokenExpiredError") {
      errorMessage = "Session expired";
      errorDetails = "Your login session has expired";
      suggestions = ["Please log in again to continue"];
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "Invalid token";
      errorDetails = "Your authentication token is invalid";
      suggestions = ["Try clearing your browser cache", "Log in again"];
    }

    res.status(401).json({
      message: errorMessage,
      details: errorDetails,
      suggestions,
      technicalDetails: error.message,
    });
  }
};

module.exports = auth;
