const mongoose = require("mongoose");

const URI = process.env.MoongoDB_URI;
const connectedAlert = () => {
  console.log("DB connected successfully");
};

const connectToDb = async () => {
  try {
    await mongoose.connect(URI);
    connectedAlert();
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectToDb;
