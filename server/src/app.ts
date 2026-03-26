import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/env';

import customerRoutes from './routes/customer.routes';

const app: Application = express();

// Middlewares
app.use(cors({ origin: config.CLIENT_ORIGIN }));
app.use(express.json());

// Routes
app.use('/api/customer', customerRoutes);

// Base Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'OweMi Server is running' });
});

// Placeholder for routes (Phases 3 and 7)
// app.use('/api/customer', customerRoutes);
// app.use('/api/debts', debtRoutes);

export default app;
