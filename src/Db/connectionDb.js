import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.DB_CONNECTION_URI
    );
    console.log("MongoDB Connected...", connectionInstance.connection.host);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectionDB;
