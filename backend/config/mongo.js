const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

async function mango() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
  }
}

module.exports = mango;
