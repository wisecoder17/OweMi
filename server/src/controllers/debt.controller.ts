import { Request, Response } from 'express';
import { debtService } from '../services/debt.service';

/**
 * Debt Controller handles HTTP requests for ledger management.
 */

export const debtController = {
  /**
   * POST /api/debts
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { customerId, amount, item, dueDate } = req.body;
      const traderId = "60d0fe4f5311236168a109ca"; // MOCKED for MVP

      if (!customerId || !amount || !dueDate) {
        res.status(400).json({ message: "CustomerId, Amount, and DueDate are required." });
        return;
      }

      const debt = await debtService.createDebt(traderId, { customerId, amount, item, dueDate });
      res.status(201).json(debt);
    } catch (error) {
      console.error('Debt Create Controller Error:', (error as Error).message);
      res.status(500).json({ message: "Internal Server Error", error: (error as Error).message });
    }
  },

  /**
   * GET /api/debts
   */
  async list(req: Request, res: Response): Promise<void> {
    try {
      const traderId = "60d0fe4f5311236168a109ca"; // MOCKED
      const summary = await debtService.getLedgerSummary(traderId);
      res.status(200).json(summary);
    } catch (error) {
      console.error('Debt List Controller Error:', (error as Error).message);
      res.status(500).json({ message: "Internal Server Error", error: (error as Error).message });
    }
  },

  /**
   * PATCH /api/debts/:id/status
   */
  async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const traderId = "60d0fe4f5311236168a109ca"; // MOCKED

      if (!status || !['paid', 'overdue'].includes(status)) {
        res.status(400).json({ message: "Valid status (paid/overdue) is required." });
        return;
      }

      const debt = await debtService.updateDebtStatus(traderId, id!, status);
      res.status(200).json(debt);
    } catch (error) {
      console.error('Debt Update Controller Error:', (error as Error).message);
      res.status(500).json({ message: "Internal Server Error", error: (error as Error).message });
    }
  }
};
