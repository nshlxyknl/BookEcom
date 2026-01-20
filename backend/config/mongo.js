const mongoose = require("mongoose");

mongoose.set("bufferCommands", false); 

const uri = process.env.MONGO_URI;

async function mango() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected (mongoose)");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = mango;
