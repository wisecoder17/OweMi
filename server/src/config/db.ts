import mongoose from 'mongoose';
import { config } from './env';

/**
 * connectDB establishes a persistent connection to the MongoDB instance 
 * defined in your .env. This is essential for LIVE testing data persistence.
 */
export const connectDB = async () => {
  try {
    const uri = config.MONGODB_URI;

    if (!uri) {
      throw new Error('MONGODB_URI not found in environment variables.');
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected (PERSISTENT): ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${(error as Error).message}`);
    // Shutdown server to avoid inconsistent states during live test
    process.exit(1);
  }
};
