const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("DATABASE IS SUCCESSFULLY", conn.connection.host);
  } catch (error) {
    console.log("DATA BASE IS FAILED");
  }
};

module.exports = connectDB;
