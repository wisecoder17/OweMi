import app from './app';
import { config } from './config/env';
import { connectDB } from './config/db';

const startServer = async () => {
  // Connect to DB (Only if not in certain testing modes, but for MVP we always do it)
  await connectDB();

  app.listen(config.PORT, () => {
    console.log(`Server running in ${config.USE_MOCK_MODE ? 'MOCK' : 'LIVE'} mode on port ${config.PORT}`);
  });
};

startServer();
