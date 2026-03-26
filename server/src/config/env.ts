import dotenv from 'dotenv';
import path from 'path';

// Load .env from root
dotenv.config({ path: path.join(__dirname, '../../../.env') });

export const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/owemi',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  INTERSWITCH: {
    BASE_URL: process.env.INTERSWITCH_BASE_URL,
    CLIENT_ID: process.env.INTERSWITCH_CLIENT_ID,
    CLIENT_SECRET: process.env.INTERSWITCH_CLIENT_SECRET,
  },
  USE_MOCK_MODE: process.env.USE_MOCK_MODE === 'true',
};
