// src/config/db.js

import { connect } from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");
    const conn = await connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error in db.js: " + error.message);
    process.exit(1);
  }
};

export default connectDB;
