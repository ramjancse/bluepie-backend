const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
const  mongoDBUrl = process.env.DB_CONNECTION_URL;
const connectDB = async () => {
  await mongoose.connect(mongoDBUrl);
  console.log("Database connected");
};



module.exports = connectDB;

// username: ramjancse
// password: X8Fd0O9W04dl15r9