import dotenv from 'dotenv';
import path from 'path';

// Load .env from root
dotenv.config({ path: path.join(__dirname, '../../../.env') });

export const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/owemi',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  INTERSWITCH: {
    TOKEN_URL: process.env.INTERSWITCH_TOKEN_URL || 'https://passport-v2.k8.isw.la/passport/oauth/token',
    BASE_URL: process.env.INTERSWITCH_BASE_URL || 'https://api-marketplace-routing.k8.isw.la',
    CLIENT_KEY: process.env.INTERSWITCH_CLIENT_KEY,
    SERVER_KEY: process.env.INTERSWITCH_SERVER_KEY,
  },
  USE_MOCK_MODE: process.env.USE_MOCK_MODE === 'true',
};
