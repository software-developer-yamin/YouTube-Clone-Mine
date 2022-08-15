import mongoose from "mongoose";
import logger from "./logger";

export const connectToDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGODB_URI as string
    );
    logger.info(`Connected to ${connection.host}`);
  } catch (err) {
    logger.error(err);
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
    logger.info("Disconnected from database");
  } catch (err) {
    logger.error(err);
  }
};
