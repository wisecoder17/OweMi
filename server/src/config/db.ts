import mongoose from 'mongoose';
import { config } from './env';

/**
 * connectDB establishes a persistent connection to the MongoDB instance 
 * defined in your .env. This is essential for LIVE testing data persistence.
 */
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const uri = config.MONGODB_URI;

    if (!uri) {
      throw new Error('MONGODB_URI not found in environment variables.');
    }

    const conn = await mongoose.connect(uri);
    isConnected = !!(conn.connections && conn.connections[0] && conn.connections[0].readyState);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${(error as Error).message}`);
    // Do not exit in serverless environments, just rethrow
    throw error;
  }
};
