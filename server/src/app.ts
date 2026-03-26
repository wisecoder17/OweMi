import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/env';

import customerRoutes from './routes/customer.routes';
import debtRoutes from './routes/debt.routes';

const app: Application = express();

// Middlewares
app.use(cors({ origin: config.CLIENT_ORIGIN }));
app.use(express.json());

// Routes
app.use('/api/customer', customerRoutes);
app.use('/api/debts', debtRoutes);

// Base Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'OweMi Server is running' });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: any) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error(`[ERROR] ${req.method} ${req.url}:`, err);
  res.status(status).json({
    status: 'error',
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

export default app;
