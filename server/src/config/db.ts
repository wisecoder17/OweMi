import mongoose from 'mongoose';
import { config } from './env';

export const connectDB = async () => {
  try {
    let uri = config.MONGODB_URI;

    // Optional: Auto-detect if we should use memory server for demo safety
    if (!uri || uri.includes('localhost') || config.USE_MOCK_MODE) {
      try {
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();
        console.log('Using In-Memory MongoDB for demo safety.');
      } catch (e) {
        console.log('Mongodb-memory-server not found, falling back to local/default URI.');
      }
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    // For MVP/Demo: Don't exit, just log it. 
    // Wait, let's keep it for now.
    process.exit(1);
  }
};
